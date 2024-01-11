import '@livekit/components-styles'
import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import { Box, Sheet, Stack } from '@mui/joy'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { generateName } from 'utils/personalNameUtils'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import WaitingRoom from './WaitingRoom'
import { MeetingApi } from 'api/http-rest'
import { RoomType } from 'api/webrtc/webRTCTypes'
import Header from 'components/Header'
import { Loading } from 'views/routes/routes'
import { setSessionStorage } from 'utils/sessionStorageUtils'
import SocketIOManager from 'contexts/keywords/socket'

export default function PreJoinRoom() {
	const navigate = useNavigate()
	const user = useAppSelector((s) => s.user)
	const dispatch = useAppDispatch()
	const { meetingId, localParticipant, setLocalParticipant, roomList } =
		useMeeting()
	const meetingRoom = roomList.get(RoomType.MEETING)
	const waitingRoom = roomList.get(RoomType.WAITING)
	console.log(localParticipant)

	const loaded = useMemo(() => Boolean(localParticipant), [localParticipant])
	const [partLoading, setPartLoading] = useState(false)
	const fullname = useMemo(() => {
		const name = (user.firstName ?? '') + ' ' + (user.lastName ?? '')
		return name.trim().length > 0 ? name.trim() : generateName()
	}, [user.firstName, user.lastName])

	const handleSubmitJoin = async (values: LocalUserChoices) => {
		if (partLoading || loaded) return
		setPartLoading(true)
		const username = values.username ?? fullname

		await ParticipantApi.getParticipantAccessToken(meetingId, username)
			.then(async ({ data }) => {
				// setSessionStorage(`HOST-${meetingId}`,data.participant)
				await ParticipantApi.savePartATToSessionStore(meetingId, data.token)
				await setLocalParticipant({ ...data.participant, status: data.status })
			})
			.catch((err) => {
				navigate('/')
			})
			.finally(() => setPartLoading(false))
	}
	if (!meetingRoom || !waitingRoom) return <Loading />
	return (
		<Box className="bg-gray-80 min-h-screen flex items-center justify-center">
			<Header />
			<Stack
				borderRadius="md"
				overflow="hidden"
				justifyContent="center"
				alignItems="stretch"
				direction={{ xs: 'column', md: 'row' }}
			>
				<Sheet
					variant="soft"
					sx={{
						width: { xs: 'auto', sm: 500 },
						'& .lk-prejoin input.lk-form-control': {
							'pointer-events': partLoading ? 'none' : 'auto',
						},
						'& .lk-prejoin button': {
							'pointer-events': partLoading ? 'none' : 'auto',
						},
					}}
				>
					<PreJoin
						onSubmit={handleSubmitJoin}
						data-lk-theme="default"
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						defaults={{ username: fullname || 'Hi you' }}
					/>
				</Sheet>
				{localParticipant && <WaitingRoom />}
			</Stack>
		</Box>
	)
}
