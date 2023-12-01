import {
	ParticipantRequestJoinDto,
	ParticipantSendMessageDto,
} from './webRTCTypes'
export type ActionMap = {
	[key in keyof SendMessageActionEnum]: unknown
}

export enum SendMessageActionEnum {
	ParticipantSendMessage = 'participant_send_message',
	ParticipantRequestJoin = 'participant_request_join',
}

export interface RegisterActionsType extends ActionMap {
	[SendMessageActionEnum.ParticipantRequestJoin]: ParticipantRequestJoinDto
	[SendMessageActionEnum.ParticipantSendMessage]: ParticipantSendMessageDto
}
