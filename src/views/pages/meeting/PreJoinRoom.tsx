import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import { Sheet, Stack, Container, CircularProgress } from '@mui/joy'
import { useAppSelector } from 'contexts/hooks'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { ParticipantRole } from 'api/http-rest/participant/participantDTOs'
import useToastily from 'hooks/useToastily'
import WaitingChatBox from 'views/containers/meeting/WaitingChatBox'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { MeetingContext } from 'views/containers/meeting/MeetingContext'
import { Room, VideoPresets } from 'livekit-client'

const Loading = () => (
	<Stack justifyContent="center" alignItems="center" width={1} height={1}>
		<CircularProgress />
	</Stack>
)

export default function PreJoinRoom() {
	const toast = useToastily()
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [loadingRoom, setLoadingRoom] = useState(true)

	const { currentRoom, meetingId, setState, registerRoom } =
		useContext(MeetingContext)
	const user = useAppSelector((s) => s.user)
	const fullname = `${user.firstName + ' ' + user.lastName}`.trim()

	const fetchGetTokenAndSaveSessionStore = useCallback(async () => {
		const res = await ParticipantApi.getAccessToken(meetingId)
		if (!res.success) return null
		const { tokens, participant } = res.data
		tokens.forEach((t) => ParticipantApi.setMeetingApiToken(t))
		let roomtype = RoomType.WAITING
		if (participant.role === ParticipantRole.HOST) roomtype = RoomType.MEETING
		else roomtype = tokens[0].roomType ?? RoomType.WAITING
		return roomtype
	}, [])

	const submitJoinRoom = useCallback(
		async (values: Omit<LocalUserChoices, 'e2ee' | 'sharedPassphrase'>) => {
			if (loading) return
			setLoading(true)
			const roomtype = await fetchGetTokenAndSaveSessionStore()
			if (!roomtype)
				return toast({ content: 'Join Meeting Error', type: 'error' })
			setState?.((pre) => ({ ...pre, currentRoom: roomtype }))
		},
		[]
	)

	const connectToChatRoom = useCallback(async () => {
		if (currentRoom != RoomType.WAITING) return
		setLoadingRoom(true)
		const token = ParticipantApi.getMeetingApiToken({
			roomId: meetingId,
			roomType: RoomType.WAITING,
		})
		if (!token || token.length === 0) return navigate('/')

		const room = new Room({
			adaptiveStream: true,
			dynacast: true,
			videoCaptureDefaults: {
				resolution: VideoPresets.h540.resolution,
			},
		})

		await room.connect(import.meta.env.API_WEBRTC_SOCKET_URL, token)
		if (registerRoom) registerRoom(room, RoomType.WAITING)
		setLoadingRoom(false)
	}, [currentRoom])

	useLayoutEffect(() => {
		connectToChatRoom()
		return () => {}
	}, [currentRoom])

	return (
		<Stack width={1} height={1} justifyContent="center" alignItems="center">
			<Stack
				overflow="hidden"
				borderRadius="lg"
				justifyContent="center"
				alignItems="stretch"
				direction={{ xs: 'column', md: 'row' }}
				height={{ xs: 'auto', md: 450 }}
			>
				<Sheet variant="soft" sx={{ width: { xs: 'auto', md: 500 } }}>
					<PreJoin
						onSubmit={submitJoinRoom}
						data-lk-theme="default"
						style={{
							color: 'white',
							objectFit: 'cover',
							width: '100%',
							height: '100%',
						}}
						defaults={{
							username: fullname,
							videoEnabled: true,
							audioEnabled: true,
						}}
					/>
				</Sheet>
				{currentRoom == RoomType.WAITING && (
					<Sheet
						variant="soft"
						sx={{ p: 2, minWidth: 275, height: { xs: 300, md: 'auto' } }}
					>
						{loadingRoom ? <Loading /> : <WaitingChatBox />}
					</Sheet>
				)}
			</Stack>
		</Stack>
	)
}
