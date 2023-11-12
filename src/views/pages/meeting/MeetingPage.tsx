import '@livekit/components-styles'

const PreJoinTab = lazy(() => import('./PreJoinTab'))

import MeetingApi from 'api/http-rest/meeting/meetingApi'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { Loading } from 'views/routes/routes'
import { meetingFetchGetInstant } from 'contexts/meeting'
import { Room, VideoPresets } from 'livekit-client'
import MeetingManagementBar from './MeetingManagementBar'
import { Container, Grid, Sheet, Stack } from '@mui/joy'
import MeetingSideBar from './MeetingSideBar'
import React from 'react'

export default function MeetingPage() {
	const loading = useAppSelector((s) => s.meeting.loading)
	const ditpatch = useAppDispatch()
	const navigate = useNavigate()
	const { meetingId } = useParams()
	const [roomConnect, setRoomConnect] = useState<Room | null>(null)

	const fetchMeeting = useCallback(async () => {
		if (!meetingId) return navigate('/')
		ditpatch(meetingFetchGetInstant(meetingId))
		const res = await MeetingApi.getMeeting(meetingId)
		if (!res.metadata.status.toString().match(/2\d\d/)) navigate('/')
	}, [])

	useLayoutEffect(() => {
		fetchMeeting()
	}, [])

	if (loading) return <Loading />
	return (
		<Stack direction="row" width={1} height={1} p={1} bgcolor={'#111'}>
			<Stack width={1} height={1} justifyContent="center" alignItems="center">
				<PreJoinTab onConnected={(r) => setRoomConnect(r)} />
			</Stack>
			<Stack height={1} justifyContent="center" alignItems="center">
				{(roomConnect && <MeetingSideBar room={roomConnect} />) || ''}
			</Stack>
		</Stack>
	)
}
