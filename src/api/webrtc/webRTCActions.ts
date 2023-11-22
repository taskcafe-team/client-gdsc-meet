import {
	ParticipantRequestJoinDto,
	ParticipantSendMessageDto,
} from './webRTCTypes'
export type ActionMap = {
	[key in keyof SendMessageActionEnum]: unknown
}

export enum SendMessageActionEnum {
	ParticipantRequestJoin = 'participant_request_join',
	ParticipantSendMessage = 'participant_send_message',
}

export interface RegisterActionsType extends ActionMap {
	[SendMessageActionEnum.ParticipantRequestJoin]: ParticipantRequestJoinDto
	[SendMessageActionEnum.ParticipantSendMessage]: ParticipantSendMessageDto
}
