import React from 'react'
import {
	ControlBar,
	GridLayout,
	LiveKitRoom,
	ParticipantTile,
	RoomAudioRenderer,
	VideoConference,
	useTracks,
} from '@livekit/components-react'
import {
	RemoteTrack,
	Room,
	RoomEvent,
	Track,
	VideoPresets,
} from 'livekit-client'
import { Card, Box } from '@mui/material'

type MeetingRoomProps = {
	token: string
	videoAllowed: boolean
	audioAllowed: boolean
}

export default function MeetingRoom({
	token,
	videoAllowed,
	audioAllowed,
}: MeetingRoomProps) {
	const navigate = useNavigate()
	const [room, setRoom] = useState<Room | null>(null)

	const connect = useCallback(async () => {
		const _room = new Room({
			adaptiveStream: true,
			dynacast: true,
			videoCaptureDefaults: {
				resolution: VideoPresets.h720.resolution,
			},
		})
		await _room.connect(import.meta.env.API_WEBRTC_SOCKET_URL, token)
		await _room.localParticipant.enableCameraAndMicrophone()
		setRoom(_room)
	}, [])

	useLayoutEffect(() => {
		connect()
	}, [])

	return (
		<Box sx={{ p: 3, maxWidth: '100vw' }}>
			<Card sx={{ width: 1, height: 1 }}>
				{room && (
					<LiveKitRoom
						onDisconnected={() => navigate('/')}
						room={room}
						video={videoAllowed}
						audio={audioAllowed}
						connectOptions={{ autoSubscribe: true }}
						token={undefined}
						serverUrl={undefined}
					>
						<VideoConference />
						<RoomAudioRenderer />
					</LiveKitRoom>
				)}
			</Card>
		</Box>
	)
}
