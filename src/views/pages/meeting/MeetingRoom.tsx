import { Box, Sheet, Stack } from '@mui/joy'
import React from 'react'
import MeetingSidebar from './v2/MeetingSideBar'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'

export default function MeetingRoom() {
	const { getRoomConnected } = useMeeting()
	const meetingRoom = getRoomConnected('', RoomType.MEETING)
	const navigate = useNavigate()

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
				{meetingRoom && (
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
				)}
			</Box>
		</Box>
	)
}
