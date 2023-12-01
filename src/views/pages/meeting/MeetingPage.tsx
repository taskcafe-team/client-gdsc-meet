import { Loading } from 'views/routes/routes'
import MeetingProvider, {
	useMeeting,
} from 'views/containers/meeting/MeetingContext'

const PreJoinRoom = lazy(() => import('./PreJoinRoom'))
const MeetingRoom = lazy(() => import('./MeetingRoom'))

function MeetingPage() {
	const { meetingStatus, localParticipant } = useMeeting()

	if (meetingStatus === 'connected_yet') return <Loading />
	else if (meetingStatus === 'scheduled') return <Navigate to="/" />
	else if (meetingStatus === 'completed') return <Navigate to="/" />
	else if (meetingStatus === 'inProgress') {
		if (localParticipant && localParticipant.status === 'accept')
			return <MeetingRoom />
		else return <PreJoinRoom />
	} else return <PreJoinRoom />
}

export default function MeetingPageWapper() {
	const { meetingId } = useParams()
	if (!meetingId) throw new Error('Meeting id is not defined')
	return (
		<MeetingProvider meetingId={meetingId}>
			<MeetingPage />
		</MeetingProvider>
	)
}
