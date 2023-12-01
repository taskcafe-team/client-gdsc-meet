import { RoomType } from 'api/webrtc/webRTCTypes'

export enum MeetingType {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}

export type ResponseMeetingDto = {
	id: string
	title: string | null
	startTime: string
	endTime: string | null
	description: string | null
	type: MeetingType
}

export type RequestCreateMeetingBody = {
	title?: string | null
	description?: string | null
	startDate?: string | null
	endDate?: string | null
	type?: MeetingType | null
}

export type ResponseAccessToken = {
	roomId: string
	roomType: RoomType
	roomToken: string
}

export type RequestUpdateMeetingBody = RequestCreateMeetingBody & {
	meetingId: string
}

export type ResponseGetMeetingRoom = {
	waitingRoom: { id: string; roomType: RoomType }
	meetingRoom: { id: string; roomType: RoomType }
}
