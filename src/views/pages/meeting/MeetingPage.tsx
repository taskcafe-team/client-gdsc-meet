import { Loading } from 'views/routes/routes'
import MeetingProvider, {
	useMeeting,
} from 'views/containers/meeting/MeetingContext'

const PreJoinRoom = lazy(() => import('./PreJoinRoom'))
const MeetingRoom = lazy(() => import('./MeetingRoom'))

function MeetingPage() {
	const navigate = useNavigate()
	const { meetingId } = useParams()
	const { meetingStatus, participantAccessStatus, fetchLoadMeeting } =
		useMeeting()
	const [fetching, setFetching] = useState(true)

	useLayoutEffect(() => {
		if (meetingId)
			fetchLoadMeeting(meetingId)
				.finally(() => setFetching(false))
				.catch(() => navigate('/'))
	}, [meetingId])

	if (!meetingId) return <Navigate to="/" />
	if (fetching) return <Loading />
	else if (meetingStatus === 'scheduled') return <Navigate to="/" />
	else if (meetingStatus === 'completed') return <Navigate to="/" />
	else if (meetingStatus === 'inProgress') {
		if (participantAccessStatus === 'accepted') return <MeetingRoom />
		else return <PreJoinRoom />
	} else return <PreJoinRoom />
}

export default function MeetingPageWapper() {
	return (
		<MeetingProvider>
			<MeetingPage />
		</MeetingProvider>
	)
}
