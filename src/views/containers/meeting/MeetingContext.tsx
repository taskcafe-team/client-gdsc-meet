import { ParticipantUsecaseDTO } from 'api/http-rest/participant/participantDTOs'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { Room, RoomEvent } from 'livekit-client'
import { createContext } from 'react'

type RoomInfo = {
	room: Room
	roomId: string
	roomType: RoomType
	localParticipantId: string
	participants: Map<string, ParticipantUsecaseDTO>
}
type MeetingState = {
	registerRoom?: (room: Room, roomType: RoomType) => void
	setState?: React.Dispatch<
		React.SetStateAction<Omit<MeetingState, 'setState' | 'registerRoom'>>
	>
	meetingId: string
	currentRoom: RoomType
	roomConnections: Map<RoomType, RoomInfo>
}
const initialState: Omit<MeetingState, 'setState'> = {
	meetingId: '',
	currentRoom: RoomType.DEFAULT,
	roomConnections: new Map(),
}

export const MeetingContext = createContext<MeetingState>(initialState)
export default function MeetingProvider({ children }: React.PropsWithChildren) {
	const { meetingId } = useParams()
	if (!meetingId) return <Navigate to="/" />
	const [initState, setInitState] = useState<Omit<MeetingState, 'setState'>>({
		meetingId,
		currentRoom: RoomType.DEFAULT,
		roomConnections: new Map(),
	})

	const registerRoom = useCallback((room: Room, roomType: RoomType) => {
		const localParticipantId = room.localParticipant.identity
		const localParticipant = JSON.parse(room.localParticipant.metadata ?? '')
		const participants = new Map<string, ParticipantUsecaseDTO>()
		participants.set(localParticipantId, localParticipant)
		room.participants.forEach((p) => {
			participants.set(p.identity, JSON.parse(p.metadata ?? ''))
		})

		// Listen to room events
		room.on(RoomEvent.ParticipantConnected, (p) => {
			setInitState((prevState) => {
				const updatedState = { ...prevState }
				const roomConnection = updatedState.roomConnections.get(roomType)
				if (roomConnection) {
					roomConnection.participants.set(
						p.identity,
						JSON.parse(p.metadata ?? '')
					)
				}
				return updatedState
			})
		})

		room.on(RoomEvent.ParticipantDisconnected, (p) => {
			setInitState((prevState) => {
				const updatedState = { ...prevState }
				const roomConnection = updatedState.roomConnections.get(roomType)
				if (roomConnection) {
					roomConnection.participants.delete(p.identity)
				}
				return updatedState
			})
		})

		room.on(RoomEvent.ParticipantMetadataChanged, (metadata, p) => {
			setInitState((prevState) => {
				const updatedState = { ...prevState }
				const roomConnection = updatedState.roomConnections.get(roomType)
				if (roomConnection) {
					roomConnection.participants.set(
						p.identity,
						JSON.parse(JSON.stringify(p))
					)
				}
				return updatedState
			})
		})

		room.on(RoomEvent.ParticipantNameChanged, (name, p) => {
			setInitState((prevState) => {
				const updatedState = { ...prevState }
				const roomConnection = updatedState.roomConnections.get(roomType)
				if (roomConnection) {
					roomConnection.participants.set(
						p.identity,
						JSON.parse(JSON.stringify(p))
					)
				}
				return updatedState
			})
		})

		setInitState((prevState) => {
			const updatedState = { ...prevState }
			updatedState.roomConnections.set(roomType, {
				room,
				roomId: meetingId,
				roomType,
				localParticipantId,
				participants,
			})

			return updatedState
		})
	}, [])

	useLayoutEffect(() => {
		return () => {
			setInitState((prevState) => {
				prevState.roomConnections.forEach((roomInfo) =>
					roomInfo.room.disconnect()
				)
				prevState.roomConnections.clear()
				return {
					meetingId,
					currentRoom: RoomType.DEFAULT,
					roomConnections: new Map(),
				}
			})
		}
	}, [])

	return (
		<MeetingContext.Provider
			value={{ ...initState, setState: setInitState, registerRoom }}
		>
			{children}
		</MeetingContext.Provider>
	)
}
