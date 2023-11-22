import { Loading } from 'views/routes/routes'
import { Stack } from '@mui/joy'
import '@livekit/components-styles'

import { useAppDispatch } from 'contexts/hooks'
import { meetingFetchGetInstant } from 'contexts/meeting'

import { RoomType } from 'api/webrtc/webRTCTypes'
import MeetingProvider, {
	useMeetingState,
} from 'views/containers/meeting/MeetingContext'
import { ApiResponse } from 'api/http-rest/apiResponses'

const PreJoinRoom = lazy(() => import('./PreJoinRoom'))
const MeetingRoom = lazy(() => import('./MeetingRoom'))

function MeetingPage() {
	const { meetingId, currentRoom } = useMeetingState()

	const ditpatch = useAppDispatch()
	const navigate = useNavigate()

	const [fetching, setFetching] = useState(true)

	useLayoutEffect(() => {
		setFetching(true)
		ditpatch(meetingFetchGetInstant(meetingId))
			.then((res) => {
				const p = res.payload as ApiResponse
				if (!p.metadata.success) return navigate('/')
			})
			.catch((err) => console.error(err))
			.finally(() => setFetching(false))
	}, [])

	if (fetching) return <Loading />
	return (
		<Stack direction="row" width={1} height={1}>
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
