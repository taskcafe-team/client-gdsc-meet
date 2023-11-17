import React from 'react'
import {
	LiveKitRoom,
	VideoConference,
	formatChatMessageLinks,
} from '@livekit/components-react'
import { Room, VideoPresets } from 'livekit-client'
import { Loading } from 'views/routes/routes'
import { Stack } from '@mui/joy'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { RoomType } from 'api/webrtc/webRTCTypes'
import MeetingSideBar from './MeetingSideBar'
import {
	ParticipantRole,
	ParticipantUsecaseDTO,
} from 'api/http-rest/participant/participantDTOs'
import { MeetingContext } from 'views/containers/meeting/MeetingContext'

export default function MeetingRoom() {
	const { meetingId, roomConnections, registerRoom } =
		useContext(MeetingContext)

	const meetingRoom = useMemo(() => {
		const room = roomConnections.get(RoomType.MEETING)
		const localParticipantId = room?.localParticipantId ?? ''
		const participants = room?.participants
		const localParticipant = participants?.get(localParticipantId)

		if (!room || !participants || !localParticipant) return null
		return {
			roomType: RoomType.MEETING,
			room: room.room,
			localParticipantId,
			localParticipant,
			participants,
		}
	}, [roomConnections.get(RoomType.MEETING)])

	const navigate = useNavigate()

	const connectMeetingRoom = useCallback(async () => {
		try {
			const token = ParticipantApi.getMeetingApiToken({
				roomId: meetingId,
				roomType: RoomType.MEETING,
			})

			const room = new Room({
				adaptiveStream: true,
				dynacast: true,
				videoCaptureDefaults: {
					resolution: VideoPresets.h540.resolution,
				},
			})
			await room.connect(import.meta.env.API_WEBRTC_SOCKET_URL, token!)
			await room.localParticipant.enableCameraAndMicrophone()
			if (registerRoom) registerRoom(room, RoomType.MEETING)
		} catch (error) {
			console.error('Failed to connect to room:', error)
			navigate('/')
		}
	}, [])

	useLayoutEffect(() => {
		if (!meetingRoom) connectMeetingRoom()
		return () => {
			meetingRoom?.room.disconnect()
		}
	}, [meetingRoom])

	if (!meetingRoom) return <Loading />
	return (
		<Stack width={1} height={1} direction="row">
			<Stack width={1} height={1}>
				<Stack borderRadius={10} width={1} height={1} overflow="hidden">
					<LiveKitRoom
						style={{ width: '100%', height: '100%' }}
						data-lk-theme="default"
						room={meetingRoom.room}
						onDisconnected={() => navigate('/')}
						video={true}
						audio={true}
						connectOptions={{ autoSubscribe: true }}
						token={undefined}
						serverUrl={undefined}
					>
						<VideoConference chatMessageFormatter={formatChatMessageLinks} />
					</LiveKitRoom>
				</Stack>
			</Stack>
			<Stack height={1}>
				<MeetingSideBar />
			</Stack>
		</Stack>
	)
}
