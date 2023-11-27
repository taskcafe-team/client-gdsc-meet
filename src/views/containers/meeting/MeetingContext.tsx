import { LocalParticipant, Room, RoomEvent, VideoPresets } from 'livekit-client'
import { createContext } from 'react'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { ParticipantUsecaseDto } from 'api/http-rest/participant/participantDtos'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { MeetingApi } from 'api/http-rest'

type ParticipantAccessStatus = 'default' | 'wait' | 'accepted' | 'rejected'
type MeetingStatus = 'default' | 'scheduled' | 'inProgress' | 'completed'
export type RoomInfo = {
	roomId: string
	roomType: RoomType
	originalRoom: Room
	localParticipant: ParticipantUsecaseDto
	remoteParticipants: Map<string, ParticipantUsecaseDto>
	disconnect: () => Promise<void>
}

type MeetingState = {
	meetingId: string
	meetingStatus: MeetingStatus
	participantAccessStatus: ParticipantAccessStatus
	roomConnecteds: Map<string, RoomInfo>
	updateParticipantAccessStatus: (status: ParticipantAccessStatus) => void
	getRoomConnected: (roomId: string, roomType: RoomType) => RoomInfo | undefined
	fetchLoadMeeting: (
		_meetingId: string
	) => Promise<{ meetingId: string; meetingStatus: MeetingStatus }>
	connectRoom: (username: string) => Promise<void>
}

const initialState: MeetingState = {
	meetingId: '',
	meetingStatus: 'default',
	participantAccessStatus: 'default',
	roomConnecteds: new Map(),
	updateParticipantAccessStatus: () => {
		throw new Error('updateParticipantAccessStatus not implemented.')
	},
	getRoomConnected: () => {
		throw new Error('getRoomConnected not implemented.')
	},
	fetchLoadMeeting: function () {
		throw new Error('fetchLoadMeeting not implemented.')
	},
	connectRoom: function (): Promise<void> {
		throw new Error('connectRoom not implemented.')
	},
}

export const MeetingContext = createContext<MeetingState>(initialState)
export const useMeeting = () => React.useContext(MeetingContext)

export default function MeetingProvider({ children }: React.PropsWithChildren) {
	const [meetingId, setMeetingId] = useState('')
	const [meetingStatus, setMeetingStatus] = useState<MeetingStatus>('default')
	const [participantAccessStatus, setParticipantAccessStatus] =
		useState<ParticipantAccessStatus>('default')
	const [roomConnecteds, setRoomConnecteds] = useState<Map<string, RoomInfo>>(
		new Map()
	)

	const updateParticipantAccessStatus = (status: ParticipantAccessStatus) => {
		setParticipantAccessStatus(status)
	}

	const getRoomConnected = (
		roomId: string,
		roomType: RoomType
	): RoomInfo | undefined => {
		const roomname = `${roomType}:${meetingId}` //TODO: change to `${roomType}:${roomId}`
		return roomConnecteds.get(roomname)
	}

	const fetchLoadMeeting = async (_meetingId: string) => {
		await MeetingApi.getMeeting(_meetingId).then((res) => {
			const meeting = res.data

			setMeetingId(meeting.id)
			if (new Date(meeting.startTime).getTime() > new Date().getTime())
				setMeetingStatus('scheduled')
			else if (!meeting.endTime) setMeetingStatus('inProgress')
			else if (new Date(meeting.endTime).getTime() < new Date().getTime())
				setMeetingStatus('completed')
			else setMeetingStatus('default')
		})
		return { meetingId, meetingStatus }
	}

	//roomname is `${roomType}:${roomId}`
	const roomListener = (room: Room, roomname: string) => {
		// Listen to room events
		room.on(RoomEvent.ParticipantConnected, (p) => {
			setRoomConnecteds((prev) => {
				const updatedState = new Map(prev)
				const roomConnected = updatedState.get(roomname)
				if (!roomConnected) return updatedState

				const meta = JSON.parse(p.metadata ?? '')
				roomConnected.remoteParticipants.set(p.identity, meta)
				return updatedState
			})
		})

		room.on(RoomEvent.ParticipantDisconnected, (p) => {
			setRoomConnecteds((prev) => {
				const updatedState = new Map(prev)
				const roomConnected = updatedState.get(roomname)
				if (!roomConnected) return updatedState
				roomConnected.remoteParticipants.delete(p.identity)
				return updatedState
			})
		})

		room.on(RoomEvent.ParticipantMetadataChanged, (metadata, p) => {
			setRoomConnecteds((prev) => {
				const updatedState = new Map(prev)
				const roomConnected = updatedState.get(roomname)
				if (!roomConnected) return updatedState
				if (p instanceof LocalParticipant)
					roomConnected.localParticipant = JSON.parse(metadata ?? '')
				else {
					roomConnected.remoteParticipants.set(
						p.identity,
						JSON.parse(p.metadata ?? '')
					)
				}
				return updatedState
			})
		})

		room.on(RoomEvent.ParticipantNameChanged, (name, p) => {
			setRoomConnecteds((prev) => {
				const updatedState = new Map(prev)
				const roomConnected = updatedState.get(roomname)
				if (!roomConnected) return updatedState
				if (p instanceof LocalParticipant)
					roomConnected.localParticipant = JSON.parse(p.metadata ?? '')
				else {
					roomConnected.remoteParticipants.set(
						p.identity,
						JSON.parse(p.metadata ?? '')
					)
				}
				return updatedState
			})
		})
	}

	const connectRoom = async (username: string) => {
		if (meetingId === '')
			throw new Error('meetingId is empty, please load meeting first.')
		const response = await ParticipantApi.getAccessToken(meetingId, username)
		const tokens = response.data.tokens

		const connectsPromise = tokens.map(async (t) => {
			ParticipantApi.setMeetingApiToken(t) //Set token in session storage

			const resolution = VideoPresets.h540.resolution
			const room = new Room({
				adaptiveStream: true,
				dynacast: true,
				videoCaptureDefaults: { resolution },
			})

			await room.connect(import.meta.env.API_WEBRTC_SOCKET_URL, t.roomToken)
			const roomname = `${t.roomType}:${t.roomId}`
			const localParticipant = JSON.parse(room.localParticipant.metadata ?? '')
			const remoteParticipants = new Map<string, ParticipantUsecaseDto>()
			room.participants.forEach((p) =>
				remoteParticipants.set(p.identity, JSON.parse(p.metadata ?? ''))
			)
			setRoomConnecteds((prev) => {
				const updatedState = new Map(prev)
				updatedState.set(roomname, {
					roomId: t.roomId,
					roomType: t.roomType,
					localParticipant,
					remoteParticipants,
					disconnect: room.disconnect,
					originalRoom: room,
				})
				return updatedState
			})
			roomListener(room, roomname)
		})
		await Promise.all(connectsPromise)

		const _participantAccessStatus =
			tokens.length > 1
				? 'accepted'
				: tokens[0].roomType === RoomType.WAITING
				? 'wait'
				: 'accepted'
		setParticipantAccessStatus(_participantAccessStatus)
	}

	useLayoutEffect(() => {
		return () => {
			roomConnecteds.forEach((roomConnected) => roomConnected.disconnect())
			setRoomConnecteds(new Map())
			setMeetingId('')
			setMeetingStatus('default')
			setParticipantAccessStatus('default')
		}
	}, [])

	return (
		<MeetingContext.Provider
			value={{
				meetingId,
				meetingStatus,
				participantAccessStatus,
				updateParticipantAccessStatus,
				fetchLoadMeeting,
				connectRoom,
				roomConnecteds,
				getRoomConnected,
			}}
		>
			{children}
		</MeetingContext.Provider>
	)
}
