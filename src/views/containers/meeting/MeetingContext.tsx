import { LocalParticipant, ParticipantEvent, Room, RoomEvent, VideoPresets } from 'livekit-client'
import { createContext } from 'react'
import {
	AccessPermissionsStatus,
	ParticipantUsecaseDto,
} from 'api/http-rest/participant/participantDtos'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { MeetingApi } from 'api/http-rest'
import { useAppSelector } from 'contexts/hooks'
import { getSessionStorage } from 'utils/sessionStorageUtils'
import SocketIOManager from 'contexts/keywords/socket'

export type ParticipantInfo = ParticipantUsecaseDto
type MeetingStatus = 'connected_yet' | 'scheduled' | 'inProgress' | 'completed'
type ConnectionState = 'connected' | 'disconnected'
export type RoomInfo = {
	roomId: string
	roomType: RoomType
	originalRoom: Room
	remoteParticipants: Map<string, ParticipantInfo>
	state: ConnectionState
	disconnect: () => Promise<void>
	connect: (token: string) => Promise<void>
}

type _LocalParticipant = ParticipantInfo & { status: AccessPermissionsStatus }
export type MeetingInfo = {
	meetingId: string
	meetingStatus: MeetingStatus
	localParticipant: _LocalParticipant | undefined
	roomList: Map<RoomType, RoomInfo>
	addRoom: (roomId: string, roomType: RoomType) => Promise<void>
	setLocalParticipant: React.Dispatch<
		React.SetStateAction<_LocalParticipant | undefined>
	>
	deleteRoom: (roomType: RoomType) => void
}

const initialState: MeetingInfo = {
	meetingId: '',
	meetingStatus: 'connected_yet',
	localParticipant: undefined,
	roomList: new Map(),
	addRoom: () => Promise.reject('Failed Connecting'),
	setLocalParticipant: () => {},
	deleteRoom: () => {},
}

export const MeetingContext = createContext<MeetingInfo>(initialState)
export const useMeeting = () => React.useContext(MeetingContext)

interface MeetingProviderProps {
	children?: React.ReactNode
	meetingId: string
}
export default function MeetingProvider({
	children,
	meetingId,
}: MeetingProviderProps) {
	const navigate = useNavigate()
	const [meetingStatus, setMeetingStatus] =
		useState<MeetingStatus>('connected_yet')
	const [localParticipant, setLocalParticipant] = useState<_LocalParticipant>()
	const [roomList, setRoomList] = useState<Map<RoomType, RoomInfo>>(new Map())
	const getRoleRef:any = useRef(getSessionStorage(`HOST-${meetingId}`));
	useEffect(() => {
		getRoleRef.current = getSessionStorage(`HOST-${meetingId}`);
	  }, [meetingId]);

	const roomListener = (room: Room, roomType: RoomType) => {
		
		const isOpen = Boolean(getRoleRef && getRoleRef?.current?.role == 'HOST')

		// console.log(isOpen);
		
		// room.localParticipant.on(
		// 	ParticipantEvent.IsSpeakingChanged,
		// 	(speaking: boolean) => {
		// 		speaking
		// 			? startSpeechRecognition(async (e) => {
		// 					console.log(e)

		// 					// SocketIOManager.getSocket.emit('send_data', e)
		// 					// SocketIOManager.getSocket.on('send_data_success', (re)=>{
		// 					// 	console.log(re);

		// 					// })
		// 			  })
		// 			: stopSpeechRecognition()
		// 	}
		// )
		
		room.on(RoomEvent.ParticipantConnected, (p) => {
			setRoomList((prev) => {
				const updatedState = new Map(prev)
				const roomConnected = updatedState.get(roomType)
				if (!roomConnected) return updatedState
				const meta = JSON.parse(p.metadata ?? '')
				roomConnected.remoteParticipants.set(p.identity, meta)
				return updatedState
			})
		})

		room.on(RoomEvent.ParticipantDisconnected, (p) => {
			setRoomList((prev) => {
				const updatedState = new Map(prev)
				const roomConnected = updatedState.get(roomType)
				if (!roomConnected) return updatedState
				roomConnected.remoteParticipants.delete(p.identity)
				return updatedState
			})
		})

		room.on(RoomEvent.ParticipantMetadataChanged, (metadata, p) => {
			setRoomList((prev) => {
				const updatedState = new Map(prev)
				const roomConnected = updatedState.get(roomType)
				if (!roomConnected) return updatedState
				if (p instanceof LocalParticipant)
					setLocalParticipant((lprev) => {
						return { ...lprev, ...JSON.parse(metadata ?? '') }
					})
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
			setRoomList((prev) => {
				const updatedState = new Map(prev)
				const roomConnected = updatedState.get(roomType)
				if (!roomConnected) return updatedState
				if (p instanceof LocalParticipant)
					setLocalParticipant((lprev) => {
						return { ...lprev, ...JSON.parse(p.metadata ?? '') }
					})
				else {
					roomConnected.remoteParticipants.set(
						p.identity,
						JSON.parse(p.metadata ?? '')
					)
				}
				return updatedState
			})
		})

		const remoteParticipant = room.participants
		setRoomList((prev) => {
			const updatedState = new Map(prev)
			const roomConnected = updatedState.get(roomType)
			if (!roomConnected) return updatedState
			remoteParticipant.forEach((p) => {
				const meta = JSON.parse(p.metadata ?? '')
				roomConnected.remoteParticipants.set(p.identity, meta)
			})
			return updatedState
		})
	}

	const connect = async (roomType: RoomType, token: string) => {
		const room = roomList.get(roomType)
		if (!room) return
		const webrtcURL = import.meta.env.API_WEBRTC_SOCKET_URL
		await room.originalRoom.connect(webrtcURL, token)
		await roomListener(room.originalRoom, roomType)
		await setRoomList((prev) => {
			const updatedState = new Map(prev)
			const _room = updatedState.get(roomType)
			if (!_room) return updatedState
			_room.state = 'connected'
			return updatedState
		})
	}

	const disconnect = async (roomType: RoomType) => {
		const room = roomList.get(roomType)
		if (!room) return
		await room.originalRoom.disconnect()
		await setRoomList((prev) => {
			const updatedState = new Map(prev)
			const roomConnected = updatedState.get(roomType)
			if (!roomConnected) return updatedState
			roomConnected.state = 'disconnected'
			return updatedState
		})
	}

	const addRoom = async (roomId: string, roomType: RoomType) => {
		const resolution =
			roomType === RoomType.MEETING
				? VideoPresets.h540.resolution
				: VideoPresets.h90.resolution
		const originalRoom = new Room({
			videoCaptureDefaults: { resolution },
			adaptiveStream: true,
			dynacast: true,
		})

		const webrtcURL = import.meta.env.API_WEBRTC_SOCKET_URL
		const room: RoomInfo = {
			roomId,
			roomType,
			originalRoom,
			remoteParticipants: new Map(),
			state: 'disconnected',
			connect: (token: string) =>
				originalRoom
					.connect(webrtcURL, token)
					.then(() => roomListener(originalRoom, roomType))
					.then(() =>
						setRoomList((prev) => {
							const updatedState = new Map(prev)
							const _room = updatedState.get(roomType)
							if (!_room) return updatedState
							_room.state = 'connected'
							return updatedState
						})
					),
			disconnect: () => originalRoom.disconnect(),
		}

		setRoomList((prev) => {
			const updatedState = new Map(prev)
			updatedState.set(roomType, room)
			return updatedState
		})
	}

	const deleteRoom = async (roomType: RoomType) => {
		const room = roomList.get(roomType)
		if (!room) return
		await room.disconnect()
		setRoomList((prev) => {
			const updatedState = new Map(prev)
			updatedState.delete(roomType)
			return updatedState
		})
	}

	const connectMeeting = async () => {
		return MeetingApi.getMeeting(meetingId).then(async ({ data }) => {
			const { startTime, endTime } = data
			if (new Date(startTime).getTime() > new Date().getTime())
				setMeetingStatus('scheduled')
			else if (!endTime) setMeetingStatus('inProgress')
			else if (new Date(endTime).getTime() < new Date().getTime())
				setMeetingStatus('completed')
			else setMeetingStatus('connected_yet')
		})
	}

	const fetchGetRooms = () => {
		return MeetingApi.getMeetingRooms(meetingId).then((res) => {
			const { waitingRoom, meetingRoom } = res.data
			addRoom(waitingRoom.id, RoomType.WAITING)
			addRoom(meetingRoom.id, RoomType.MEETING)
		})
	}

	useEffect(() => {
		connectMeeting()
			.then(() => fetchGetRooms())
			.catch(() => navigate('/'))
		return () => {
			setMeetingStatus('connected_yet')
			roomList.forEach((room) => room.disconnect())
			setRoomList(new Map())
		}
	}, [])

	return (
		<MeetingContext.Provider
			value={{
				addRoom,
				roomList,
				meetingId,
				deleteRoom,
				meetingStatus,
				localParticipant,
				setLocalParticipant,
			}}
		>
			{children}
		</MeetingContext.Provider>
	)
}