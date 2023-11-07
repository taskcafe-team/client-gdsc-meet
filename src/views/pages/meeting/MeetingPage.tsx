import React from 'react'
import { Box } from '@mui/material'
import '@livekit/components-styles'

const PreJoin = lazy(() => import('./PreJoin'))
const MeetingRoom = lazy(() => import('./MeetingRoom'))

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

	const { friendlyId } = useParams() // router blocked friendlyId null

	const fetchMeeting = useCallback(async () => {
		if (!friendlyId) return navigate('/')
		ditpatch(meetingFetchGetInstant(friendlyId))
		const res = await MeetingApi.getMeeting(friendlyId)
		if (!res.metadata.status.toString().match(/2\d\d/)) navigate('/')
	}, [])

	const getAccessToken = useCallback(async () => {
		if (!friendlyId) return navigate('/')
		const res = await MeetingApi.getAccessToken(friendlyId)
		if (res.metadata.status == 200) setToken(res.data.token)
	}, [friendlyId])

	const btnJoinMeetingClick = () => {
		setIsLoading(true)
		getAccessToken().finally(() => setIsLoading(false))
	}

	useLayoutEffect(() => {
		fetchMeeting()
	}, [])

	if (loading) return <Loading />
	return (
		<Box
			width={1}
			height={1}
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			{token ? (
				<MeetingRoom
					token={token}
					videoAllowed={videoAllowed}
					audioAllowed={audioAllowed}
				/>
			) : (
				''
			)}
			{!token ? (
				<PreJoin
					videoAllowed={videoAllowed}
					audioAllowed={audioAllowed}
					setAudioAllowed={setAudioAllowed}
					setVideoAllowed={setVideoAllowed}
					btnJoinMeetingClick={btnJoinMeetingClick}
					isLoading={isLoading}
				/>
			) : (
				''
			)}
		</Box>
	)
}
