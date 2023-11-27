import { RoomInfo } from 'views/containers/meeting/MeetingContext'
import {
	ChatMessageCardProps,
	MessageContent,
} from 'views/containers/meeting/components/ChatMessageCard'

export const getSenderInRoom = (id: string, room: RoomInfo) => {
	if (id === room.localParticipant.id)
		return { ...room.localParticipant, isLocal: true }
	else {
		const remoteParticipant = room.remoteParticipants.get(id)
		if (!remoteParticipant) return null
		else return { ...remoteParticipant, isLocal: false }
	}
}

export const messageCardFromSender = (
	sender: ReturnType<typeof getSenderInRoom>,
	content: string,
	actions?: {
		accept: (content: Omit<MessageContent, 'contents'>) => void
		reject: (content: Omit<MessageContent, 'contents'>) => void
	}
): ChatMessageCardProps => {
	if (!sender) throw new Error('Sender is null')
	const message: ChatMessageCardProps = {
		position: sender.isLocal ? 'right' : 'left',
		messageContent: {
			senderId: sender.id,
			name: sender.name || 'NO NAME',
			avatar: '',
			contents: [content],
		},
	}
	if (actions) message.action = actions
	return message
}
