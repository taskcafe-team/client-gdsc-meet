import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import { Room, VideoPresets } from 'livekit-client'
import { Loading } from 'views/routes/routes'
import { Stack } from '@mui/joy'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { RoomType } from 'api/webrtc/webRTCTypes'
import MeetingControlBar from './MeetingControlBar'
import { useMeetingState } from 'views/containers/meeting/MeetingContext'

export default function MeetingRoom() {
	const { roomConnecteds, registerRoom, meetingId } = useMeetingState()
	const meetingRoom = roomConnecteds.get(RoomType.MEETING)

	const navigate = useNavigate()
	const connectMeetingRoom = useCallback(async () => {
		try {
			if (meetingRoom) return
			const token = ParticipantApi.getMeetingApiToken({
				roomId: meetingId,
				roomType: RoomType.MEETING,
			})

			const resolution = VideoPresets.h540.resolution
			const room = new Room({
				adaptiveStream: true,
				dynacast: true,
				videoCaptureDefaults: { resolution },
			})
			await room.connect(import.meta.env.API_WEBRTC_SOCKET_URL, token!)
			if (registerRoom) registerRoom(room, RoomType.MEETING)
		} catch (error) {
			console.error('Failed to connect to room:', error)
			navigate('/')
		}
	}, [meetingRoom, registerRoom])

	useLayoutEffect(() => {
		if (!meetingRoom) {
			connectMeetingRoom()
		}
		return () => {
			meetingRoom?.room.disconnect()
		}
	}, [meetingRoom])

	return (
		<Stack width={1} height={1} direction="row" p={1} bgcolor="black">
			<Stack width={1} height={1}>
				{!meetingRoom ? (
					<Loading />
				) : (
					<Stack
						borderRadius={10}
						width={1}
						height={1}
						overflow="hidden"
						sx={{ '& button.lk-chat-toggle': { display: 'none' } }}
					>
						<LiveKitRoom
							style={{ width: '100%', height: '100%' }}
							data-lk-theme="default"
							room={meetingRoom.room}
							// video={false}
							// audio={false}
							onDisconnected={() => navigate('/')}
							connectOptions={{ autoSubscribe: false }}
							token={undefined}
							serverUrl={undefined}
						>
							<VideoConference />
							{/* <ControlBar controls={{ chat: false }} /> */}
						</LiveKitRoom>
					</Stack>
				)}
			</Stack>
			<Stack height={1} p={1}>
				<MeetingControlBar />
			</Stack>
		</Stack>
	)
}
