import { Box, Stack } from '@mui/joy'
import React from 'react'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import { Loading } from 'views/routes/routes'
import { RoomApi } from 'api/http-rest/room/roomApi'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'

const MeetingSidebar = lazy(() => import('./v2/MeetingSideBar'))

export default function MeetingRoom() {
	const navigate = useNavigate()
	const { localParticipant, meetingId, roomList } = useMeeting()
	const meetingRoom = roomList.get(RoomType.MEETING)
	const waitingRoom = roomList.get(RoomType.WAITING)
	if (!meetingRoom || !waitingRoom) throw new Error('MeetingRoom error')
	if (!localParticipant) throw new Error('Local participant is null')

	const connectRoom = () => {
		//Connect meeting room
		RoomApi.getAccessToken(meetingId, meetingRoom.roomId)
			.then((res) => meetingRoom.connect(res.data.token))
			.catch(() => navigate('/'))

		//Connect waiting room
		// RoomApi.getAccessToken(meetingId, waitingRoom.roomId)
		// 	.then((res) => meetingRoom.connect(res.data.token))
		// 	.catch(() => navigate('/'))
	}

	useEffect(() => {
		connectRoom()
		return () => {
			meetingRoom.disconnect()
			// waitingRoom.disconnect()
		}
	}, [])

	if (
		meetingRoom.state === 'disconnected'
		// waitingRoom.state === 'disconnected'
	)
		return <Loading />
	return (
		<Box sx={{ display: 'flex', minHeight: '100dvh' }} bgcolor={'black'}>
			<MeetingSidebar />
			<Box
				width={1}
				height={1}
				component="main"
				className="MainContent"
				sx={{ flex: 1 }}
			>
				<Stack
					width={1}
					height={1}
					overflow="hidden"
					sx={{ '& button.lk-chat-toggle': { display: 'none' } }}
				>
					<LiveKitRoom
						style={{ width: '100%', height: '100%' }}
						data-lk-theme="default"
						room={meetingRoom.originalRoom}
						onDisconnected={() => navigate('/')}
						connectOptions={{ autoSubscribe: false }}
						token={undefined}
						serverUrl={undefined}
					>
						<VideoConference />
					</LiveKitRoom>
				</Stack>
			</Box>
		</Box>
	)
}
