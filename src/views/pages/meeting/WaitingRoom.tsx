import '@livekit/components-styles'
import { Button, Card, CardContent, Sheet, Typography } from '@mui/joy'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import WaitingChatOfParticipantTab from './v2/meeting_control_tabs/WaitingChatOfParticipantTab'
import { ParticipantRequestJoinDto, RoomType } from 'api/webrtc/webRTCTypes'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import { Loading } from 'views/routes/routes'
import { RoomApi } from 'api/http-rest/room/roomApi'

const RejectJoin = () => {
	const [countdown, setCountdown] = useState(10)
	const navigate = useNavigate()

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1)
		}, 1000)

		if (countdown === 0) {
			clearInterval(timer)
			navigate('/')
		}

		return () => {
			clearInterval(timer)
		}
	}, [countdown])

	return (
		<Card>
			<div>
				<Typography level="title-lg">Rejected</Typography>
				<Typography level="body-sm">
					Your request to join this meeting has been rejected
				</Typography>
			</div>
			<CardContent orientation="horizontal">
				<div>
					<Typography level="body-xs">Return to home page after</Typography>
					<Typography fontSize="lg" fontWeight="lg">
						{countdown}s
					</Typography>
				</div>
				<Button
					variant="solid"
					size="md"
					color="primary"
					onClick={() => navigate('/')}
					sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
				>
					Go Home
				</Button>
			</CardContent>
		</Card>
	)
}
const WaitingJoin = () => (
	<React.Fragment>
		<WaitingChatOfParticipantTab.Tab />
	</React.Fragment>
)

export default function WaitingRoom() {
	const { localParticipant, meetingId, roomList, setLocalParticipant } =
		useMeeting()
	const waitingRoom = roomList.get(RoomType.WAITING)
	if (!localParticipant) throw new Error('Local Participant Is Null')
	if (!waitingRoom) throw new Error('Waiting Room Is NulL')
	const roomState = waitingRoom.state

	const navigate = useNavigate()

	const listenResposedJoinRequest = useCallback(
		(payload: ParticipantRequestJoinDto) => {
			waitingRoom.disconnect()
			setLocalParticipant({ ...localParticipant, status: payload.status })
		},
		[]
	)

	const connectRoom = () => {
		const { roomId } = waitingRoom
		return RoomApi.getAccessToken(meetingId, roomId)
			.then((res) => waitingRoom.connect(res.data.token))
			.catch(() => navigate('/'))
	}

	useEffect(() => {
		connectRoom()
		const listener = new WebRTCListenerFactory(waitingRoom.originalRoom)
		listener.on(
			SendMessageActionEnum.ParticipantRequestJoin,
			listenResposedJoinRequest
		)
		return () => {
			waitingRoom.disconnect()
			listener.removeAllListeners()
		}
	}, [])

	return (
		<Sheet
			variant="soft"
			sx={{
				p: 2,
				minWidth: 300,
				minHeight: 150,
				height: { xs: 1, md: 510 },
				overflow: 'hidden',
			}}
		>
			{(roomState === 'disconnected' && <Loading />) ||
				(localParticipant.status === 'reject' && <RejectJoin />) ||
				(localParticipant.status === 'wait' && <WaitingJoin />)}
		</Sheet>
	)
}
