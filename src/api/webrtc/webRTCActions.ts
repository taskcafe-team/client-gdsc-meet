import {
	ParticipantRequestJoinDTO,
	ParticipantSendMessageDTO,
} from './webRTCTypes'
export type ActionMap = {
	[key in keyof SendMessageActionEnum]: any
}

export enum SendMessageActionEnum {
	ParticipantRequestJoin = 'participant_request_join',
	ParticipantSendMessage = 'participant_send_message',
}

export interface RegisterActionsType extends ActionMap {
	[SendMessageActionEnum.ParticipantRequestJoin]: ParticipantRequestJoinDTO
	[SendMessageActionEnum.ParticipantSendMessage]: ParticipantSendMessageDTO
}
