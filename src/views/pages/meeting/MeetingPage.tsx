import { LocalUserChoices } from '@livekit/components-react'
import '@livekit/components-styles'
import { Box } from '@mui/material'

const PreJoinTab = lazy(() => import('./PreJoinTab'))
const MeetingRoomTab = lazy(() => import('./MeetingRoomTab'))

import MeetingApi from 'api/http-rest/meetingApi'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { Loading } from 'views/routes/routes'
import { meetingFetchGetInstant } from 'contexts/meeting'

export default function MeetingPage() {
	const loading = useAppSelector((s) => s.meeting.loading)
	const ditpatch = useAppDispatch()
	const navigate = useNavigate()

	const [videoAllowed, setVideoAllowed] = useState(true)
	const [audioAllowed, setAudioAllowed] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [token, setToken] = useState('')

	const { meetingId } = useParams() // router blocked meetingId null

	const fetchMeeting = useCallback(async () => {
		if (!meetingId) return navigate('/')
		ditpatch(meetingFetchGetInstant(meetingId))
		const res = await MeetingApi.getMeeting(meetingId)
		if (!res.metadata.status.toString().match(/2\d\d/)) navigate('/')
	}, [])

	const getAccessToken = useCallback(async () => {
		if (!meetingId) return navigate('/')
		const res = await MeetingApi.getAccessToken(meetingId)
		if (res.metadata.status == 200) setToken(res.data.token)
	}, [meetingId])

	const handlePreJoinSubmit = (values: LocalUserChoices) => {
		setVideoAllowed(values.videoEnabled)
		setAudioAllowed(values.audioEnabled)
		getAccessToken()
	}

	useLayoutEffect(() => {
		fetchMeeting()
	}, [])

	if (loading) return <Loading />
	return (
		<Box
			sx={{ backgroundColor: '#111' }}
			width={1}
			height={1}
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			{token ? (
				<MeetingRoomTab
					token={token}
					videoAllowed={videoAllowed}
					audioAllowed={audioAllowed}
				/>
			) : (
				<PreJoinTab handlePreJoinSubmit={handlePreJoinSubmit} />
			)}
		</Box>
	)
}
