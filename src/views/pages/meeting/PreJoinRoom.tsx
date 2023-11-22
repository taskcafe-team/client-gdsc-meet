import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import { Sheet, Stack } from '@mui/joy'
import { useAppSelector } from 'contexts/hooks'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import useToastily from 'hooks/useToastily'
import WaitingChatTab from 'views/containers/meeting/tabs/WaitingChatTab'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { MeetingContext } from 'views/containers/meeting/MeetingContext'
import { Room, VideoPresets } from 'livekit-client'
import { generateName } from 'utils/personalNameUtils'
import { Loading } from 'views/routes/routes'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'

export default function PreJoinRoom() {
	const toast = useToastily()
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)

	const { currentRoom, meetingId, setMeetingState, registerRoom } =
		useContext(MeetingContext)
	const user = useAppSelector((s) => s.user)
	const fullname = useMemo(() => {
		const name = (user.firstName ?? '') + ' ' + (user.lastName ?? '')
		return name.trim().length > 0 ? name.trim() : generateName()
	}, [user.firstName, user.lastName])

	const fetchGetTokenAndSaveSessionStore = useCallback(
		async (customName: string) => {
			const res = await ParticipantApi.getAccessToken(
				meetingId,
				customName.trim()
			)
			const { success } = res.metadata
			if (!success) return null
			const { tokens, participant } = res.data
			tokens.forEach((t) => ParticipantApi.setMeetingApiToken(t))
			let roomtype = RoomType.WAITING
			if (participant.role === ParticipantRole.HOST) roomtype = RoomType.MEETING
			else roomtype = tokens[0].roomType ?? RoomType.WAITING
			return roomtype
		},
		[meetingId]
	)

	const submitJoinRoom = useCallback(
		async (values: Omit<LocalUserChoices, 'e2ee' | 'sharedPassphrase'>) => {
			if (loading) return
			setLoading(true)
			const roomtype = await fetchGetTokenAndSaveSessionStore(values.username)
			if (!roomtype)
				return toast({ content: 'Join Meeting Error', type: 'error' })
			setMeetingState?.((pre) => ({ ...pre, currentRoom: roomtype }))
		},
		[fetchGetTokenAndSaveSessionStore, loading, setMeetingState, toast]
	)

	const connectToChatRoom = useCallback(async () => {
		if (currentRoom != RoomType.WAITING) return
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

		await room
			.connect(import.meta.env.API_WEBRTC_SOCKET_URL, token)
			.catch(() => {
				toast({ content: 'Join Meeting Error', type: 'error' })
				navigate('/')
			})
		if (registerRoom) registerRoom(room, RoomType.WAITING)
	}, [currentRoom, meetingId, navigate, registerRoom])

	useLayoutEffect(() => {
		connectToChatRoom()
		return () => {}
	}, [connectToChatRoom, currentRoom])

	return (
		<Stack
			width={1}
			height={1}
			p={1}
			justifyContent="center"
			alignItems="center"
		>
			<Stack borderRadius="lg" overflow="hidden">
				<Stack
					justifyContent="center"
					alignItems="stretch"
					direction={{ xs: 'column', md: 'row' }}
					height={{ xs: 'auto' }}
				>
					<Sheet
						variant="soft"
						sx={{
							width: { xs: 'auto', sm: 500 },
							'& .lk-prejoin input.lk-form-control': {
								'pointer-events': loading ? 'none' : 'auto',
							},
							'& .lk-prejoin button': {
								'pointer-events': loading ? 'none' : 'auto',
							},
						}}
					>
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
							sx={{
								p: 2,
								minWidth: 300,
								minHeight: 300,
								height: { xs: 300, md: 'auto' },
							}}
						>
							<WaitingChatTab />
						</Sheet>
					)}
				</Stack>
			</Stack>
		</Stack>
	)
}
