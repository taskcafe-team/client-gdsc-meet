import { Box, Stack } from '@mui/joy'
import React from 'react'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { RoomType } from 'api/webrtc/webRTCTypes'
import {
	LiveKitRoom,
	VideoConference,
	useTracks,
	useIsMuted,
	useSpeakingParticipants,
} from '@livekit/components-react'
import { Loading } from 'views/routes/routes'
import { RoomApi } from 'api/http-rest/room/roomApi'
import { ParticipantRole } from 'api/http-rest/participant/participantDtos'
import { Track } from 'livekit-client'
import {
	getTrackReferenceId,
	isLocal,
	isMobileBrowser,
} from '@livekit/components-core'
import { useAppSelector } from 'contexts/hooks'

const MeetingSidebar = lazy(() => import('./v2/MeetingSideBar'))

export default function MeetingRoom() {
	const navigate = useNavigate()
	const user = useAppSelector(s=>s.meeting.meetings)
	const { localParticipant, meetingId, roomList } = useMeeting()
	const meetingRoom = roomList.get(RoomType.MEETING)
	const waitingRoom = roomList.get(RoomType.WAITING)

	
	if (!meetingRoom || !waitingRoom) throw new Error('MeetingRoom error')
	if (!localParticipant) throw new Error('Local participant is null')

	const connectRoom = () => {
		//Connect meeting room
		RoomApi.getAccessToken(meetingId, meetingRoom.roomId)
			.then((res) => {	
				meetingRoom.connect(res.data.token)
			})
			.catch(() => navigate('/'))
	}

	useLayoutEffect(() => {
		connectRoom()
		return () => {
			// Todo: bug join room
			meetingRoom.disconnect()
		}
	}, [])
	if (meetingRoom.state === 'disconnected') return <Loading />
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
