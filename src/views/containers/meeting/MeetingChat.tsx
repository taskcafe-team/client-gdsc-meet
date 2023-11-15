import ParticipantApi from 'api/http-rest/participant/participantApi'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { Room, VideoPresets } from 'livekit-client'
import React from 'react'
import { ChatMessageCardProps } from './ChatMessageCard'
import ChatBox from './ChatBox'

export default function MeetingChat() {
	return <ChatBox title="Waiting Chat" messages={[]} />
}
