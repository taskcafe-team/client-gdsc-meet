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

type MeetingRoomProps = {
	room: Room
	videoAllowed?: boolean
	audioAllowed?: boolean
}

export default function MeetingRoom({
	room,
	videoAllowed = false,
	audioAllowed = false,
}: MeetingRoomProps) {
	const navigate = useNavigate()

	return (
		<Box p={2}>
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
		</Box>
	)
}
