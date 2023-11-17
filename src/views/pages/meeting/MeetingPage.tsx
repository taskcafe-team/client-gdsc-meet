import 'assets/styles/meetingpage.css'
import { Loading } from 'views/routes/routes'
import { Room, VideoPresets } from 'livekit-client'
import { Stack } from '@mui/joy'
import '@livekit/components-styles'

import { useAppDispatch } from 'contexts/hooks'
import { meetingFetchGetInstant } from 'contexts/meeting'

import { RoomType } from 'api/webrtc/webRTCTypes'
import MeetingProvider, {
	MeetingContext,
} from 'views/containers/meeting/MeetingContext'

const MeetingSideBar = lazy(() => import('./MeetingSideBar'))
const PreJoinRoom = lazy(() => import('./PreJoinRoom'))
const MeetingRoom = lazy(() => import('./MeetingRoom'))

function MeetingPage() {
	const { meetingId, currentRoom } = useContext(MeetingContext)

	const ditpatch = useAppDispatch()
	const navigate = useNavigate()

	const [fetching, setFetching] = useState(true)

	useLayoutEffect(() => {
		setFetching(true)
		ditpatch(meetingFetchGetInstant(meetingId))
			.then((res) => {
				const r = Boolean(res.payload?.['success'] ?? false)
				if (!r) return navigate('/')
			})
			.finally(() => setFetching(false))
	}, [])

	if (fetching) return <Loading />
	return (
		<Stack direction="row" width={1} height={1} p={1}>
			{(currentRoom == RoomType.DEFAULT || currentRoom == RoomType.WAITING) && (
				<PreJoinRoom />
			)}
			{currentRoom == RoomType.MEETING && <MeetingRoom />}
		</Stack>
	)
}

export default function MeetingPageWapper() {
	return (
		<MeetingProvider>
			<MeetingPage />
		</MeetingProvider>
	)
}
