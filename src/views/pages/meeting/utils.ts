import { ParticipantUsecaseDto } from 'api/http-rest/participant/participantDtos'
import {
	MeetingInfo,
	ParticipantInfo,
} from 'views/containers/meeting/MeetingContext'
import {
	ChatMessageCardProps,
	MessageContent,
} from 'views/containers/meeting/components/ChatMessageCard'

export const getSenderInMeeting = (
	senderId: string,
	localPart: ParticipantInfo,
	remoteParts: Map<string, ParticipantUsecaseDto>
) => {
	if (senderId === localPart.id) return { ...localPart, isLocal: true }
	else {
		const remotePart = remoteParts.get(senderId)
		if (!remotePart) return null
		else return { ...remotePart, isLocal: false }
	}
}

export const convertMessageCardFromSender = (
	sender: ReturnType<typeof getSenderInMeeting>,
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
