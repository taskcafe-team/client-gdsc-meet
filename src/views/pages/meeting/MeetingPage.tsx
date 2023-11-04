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
	const [token, setToken] = useState('')

	const { friendlyId } = useParams() // router blocked friendlyId null

	const fetchMeeting = useCallback(async () => {
		if (!friendlyId) return
		ditpatch(meetingFetchGetInstant(friendlyId))
		const res = await MeetingApi.getMeeting(friendlyId)
		if (!res.metadata.status.toString().match(/2\d\d/)) navigate('/')
	}, [])

	const getAccessToken = useCallback(async () => {
		if (!friendlyId) return
		const res = await MeetingApi.getAccessToken(friendlyId)
		if (res.metadata.status == 200) setToken(res.data.token)
	}, [friendlyId])

	const btnJoinMeetingClick = (isLoading, setIsLoading) => {
		setIsLoading(true)
		getAccessToken().then(() => setIsLoading(false))
	}

	useLayoutEffect(() => {
		fetchMeeting()
	}, [])

	if (loading) return <Loading />
	return (
		<Box display="flex" justifyContent="center" alignItems="center" p={5}>
			{token ? <MeetingRoom token={token} /> : ''}
			{!token ? <PreJoin btnJoinMeetingClick={btnJoinMeetingClick} /> : ''}
		</Box>
	)
}
