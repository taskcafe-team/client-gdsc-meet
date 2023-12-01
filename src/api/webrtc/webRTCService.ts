import { DataPacket_Kind, Room } from 'livekit-client'
import { LivekitParticipantSendMessageDTO } from './webRTCDTO'

type ActionMap = {
	[key in keyof SendMessageActionEnum]: unknown
}

export enum SendMessageActionEnum {
	ParticipantRequestJoin = 'participant_request_join',
	ParticipantSendMessage = 'participant_send_message',
}

export interface RegisterActionsType extends ActionMap {
	[SendMessageActionEnum.ParticipantRequestJoin]: {
		roomId: string
		roomType: string
	}
	[SendMessageActionEnum.ParticipantSendMessage]: LivekitParticipantSendMessageDTO
}

export function createSendDataMessageAction<
	T extends keyof RegisterActionsType
>(type: T, payload: RegisterActionsType[T]) {
	return { type, payload }
}

export class WebRTCService {
	static sendDataMessage(
		room: Room,
		payload: { action: ReturnType<typeof createSendDataMessageAction> }
	) {
		const { action } = payload
		const encoder = new TextEncoder()
		const actionencoder = encoder.encode(JSON.stringify(action))

		return room.localParticipant.publishData(
			actionencoder,
			DataPacket_Kind.RELIABLE
		)
	}
}
