import { Loading } from 'views/routes/routes'
import { Room, VideoPresets } from 'livekit-client'
import { Stack } from '@mui/joy'
import '@livekit/components-styles'

import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { meetingFetchGetInstant } from 'contexts/meeting'
import useToastily from 'hooks/useToastily'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { ParticipantRole } from 'api/http-rest/participant/participantDTOs'

const MeetingSideBar = lazy(() => import('./MeetingSideBar'))
const PreJoinRoom = lazy(() => import('./PreJoinRoom'))
const MeetingRoom = lazy(() => import('./MeetingRoom'))
const WaitingRoom = lazy(() => import('./WaitingRoom'))

enum MeetingRoomType {
	PREJOIN = 'prejoin',
	MEETING = 'meeting',
	WAITING = 'waiting',
}

export default function MeetingPage() {
	const { meetingId } = useParams()
	if (!meetingId) return <Navigate to="/" />

	const ditpatch = useAppDispatch()
	const navigate = useNavigate()
	const toast = useToastily()

	const [roomType, setRoomType] = useState(RoomType.DEFAULT)
	const [fetching, setFetching] = useState(true)

	const connectToMeeting = useCallback(async () => {}, [])

	useLayoutEffect(() => {
		setFetching(true)
		ditpatch(meetingFetchGetInstant(meetingId))
			.then((res) => {
				const r = res.payload?.['metadata']?.['status'] || null
				if (!r) return navigate('/')
			})
			.finally(() => setFetching(false))
	}, [])
	if (fetching) return <Loading />
	return (
		<Stack direction="row" width={1} height={1} p={1}>
			{roomType === RoomType.DEFAULT && <PreJoinRoom />}
			{roomType === RoomType.WAITING && <WaitingRoom />}
			{roomType === RoomType.MEETING && <MeetingRoom room={new Room()} />}
		</Stack>
	)
}

{
	//TODO: Remove
	/* <Stack direction="row" width={1} height={1} p={1} bgcolor={'#111'}>
<Stack width={1} height={1} justifyContent="center" alignItems="center">
  {roomType === RoomType.DEFAULT && <PreJoinRoom />}
  {roomType === RoomType.WAITING && <WaitingRoom />}
  {roomType === RoomType.MEETING && <MeetingRoom room={new Room()} />}
</Stack>
<Stack height={1}>MeetingSideBar</Stack>
</Stack> */
}
