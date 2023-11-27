import '@livekit/components-styles'
import { Button, Card, CardContent, Sheet, Typography } from '@mui/joy'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import WaitingChatOfParticipantTab from './v2/meeting_control_tabs/WaitingChatOfParticipantTab'
import { ParticipantRequestJoinDto, RoomType } from 'api/webrtc/webRTCTypes'
import ParticipantApi, {
	RespondJoinStatus,
} from 'api/http-rest/participant/participantApi'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'

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
	const navigate = useNavigate()
	const {
		getRoomConnected,
		updateParticipantAccessStatus,
		participantAccessStatus,
	} = useMeeting()
	const waitingRoom = getRoomConnected('', RoomType.WAITING)

	const listenResposedJoinRequest = useCallback(
		(payload: ParticipantRequestJoinDto) => {
			if (payload.status === RespondJoinStatus.REJECTED) {
				updateParticipantAccessStatus('rejected')
			} else if (payload.status === RespondJoinStatus.ACCEPTED) {
				const token = payload.token
				if (!token) return navigate('/')
				ParticipantApi.setMeetingApiToken(token)
				updateParticipantAccessStatus('accepted')
			}
		},
		[]
	)

	useLayoutEffect(() => {
		if (!waitingRoom) return
		const listener = new WebRTCListenerFactory(waitingRoom.originalRoom)
		listener.on(
			SendMessageActionEnum.ParticipantRequestJoin,
			listenResposedJoinRequest
		)
		return () => {
			waitingRoom.disconnect()
			listener.removeAllListeners()
		}
	}, [waitingRoom])

	return (
		<Sheet
			variant="soft"
			sx={{
				p: 2,
				minWidth: 300,
				minHeight: 300,
				height: { xs: 300, md: 'auto' },
			}}
		>
			{participantAccessStatus === 'rejected' && <RejectJoin />}
			{participantAccessStatus === 'wait' && <WaitingJoin />}
		</Sheet>
	)
}
