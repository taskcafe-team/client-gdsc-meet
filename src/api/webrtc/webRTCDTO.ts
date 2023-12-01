export class LivekitParticipantSendMessageDTO {
	senderId: string

	content: string

	constructor(senderId: string, content: string) {
		this.senderId = senderId
		this.content = content
	}
}
