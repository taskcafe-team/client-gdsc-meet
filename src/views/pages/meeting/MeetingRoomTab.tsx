import React from 'react'
import {
	ControlBar,
	GridLayout,
	LiveKitRoom,
	ParticipantTile,
	RoomAudioRenderer,
	VideoConference,
	formatChatMessageLinks,
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
import { Loading } from 'views/routes/routes'
import useToastily from 'hooks/useToastily'

type MeetingRoomTabProps = {
	token: string
	videoAllowed: boolean
	audioAllowed: boolean
}

export default function MeetingRoomTab({
	token,
	videoAllowed,
	audioAllowed,
}: MeetingRoomTabProps) {
	const navigate = useNavigate()
	const toast = useToastily()

	const [room, setRoom] = useState<Room | null>(null)

	const socket = () => {
		if (!room) return
	}

	const connect = useCallback(async () => {
		const _room = new Room({
			adaptiveStream: true,
			dynacast: true,
			videoCaptureDefaults: {
				resolution: VideoPresets.h720.resolution,
			},
		})
		await _room
			.connect(import.meta.env.API_WEBRTC_SOCKET_URL, token)
			.catch(() => {
				toast({ content: 'Connect Meeting Error', type: 'error' })
				navigate('/')
			})
		await _room.localParticipant.enableCameraAndMicrophone()
		setRoom(_room)
	}, [])

	useLayoutEffect(() => {
		connect()

		return () => {
			if (room) room.disconnect()
		}
	}, [])

	if (!room) return <Loading />
	return (
		<Box p={2}>
			{room && (
				<LiveKitRoom
					style={{ width: '100%', height: '100%' }}
					data-lk-theme="default"
					onDisconnected={() => navigate('/')}
					room={room}
					video={videoAllowed}
					audio={audioAllowed}
					connectOptions={{ autoSubscribe: true }}
					token={undefined}
					serverUrl={undefined}
				>
					<VideoConference chatMessageFormatter={formatChatMessageLinks} />
				</LiveKitRoom>
			)}
		</Box>
	)
}
