import { ParticipantUsecaseDto } from 'api/http-rest/participant/participantDtos'
import { RoomType } from 'api/webrtc/webRTCTypes'
import { LocalParticipant, Room, RoomEvent } from 'livekit-client'
import { createContext } from 'react'

type RoomInfo = {
	room: Room
	roomId: string
	roomType: RoomType
	localParticipant: ParticipantUsecaseDto
	remoteParticipants: Map<string, ParticipantUsecaseDto>
}
type MeetingState = {
	registerRoom?: (room: Room, roomType: RoomType) => void
	setMeetingState?: React.Dispatch<
		React.SetStateAction<Omit<MeetingState, 'setMeetingState' | 'registerRoom'>>
	>
	meetingId: string
	currentRoom: RoomType
	roomConnecteds: Map<RoomType, RoomInfo>
}
const initialState: Omit<MeetingState, 'setMeetingState'> = {
	meetingId: '',
	currentRoom: RoomType.DEFAULT,
	roomConnecteds: new Map(),
}

export const MeetingContext = createContext<MeetingState>(initialState)
export const useMeetingState = () => React.useContext(MeetingContext)

export default function MeetingProvider({ children }: React.PropsWithChildren) {
	const { meetingId } = useParams()
	if (!meetingId) return <Navigate to="/" />
	const [initState, setInitState] = useState<
		Omit<MeetingState, 'setMeetingState'>
	>({
		meetingId,
		currentRoom: RoomType.DEFAULT,
		roomConnecteds: new Map(),
	})

	const registerRoom = useCallback((room: Room, roomType: RoomType) => {
		const localParticipant = JSON.parse(room.localParticipant.metadata ?? '')
		const remoteParticipants = new Map<string, ParticipantUsecaseDto>()

		room.participants.forEach((p) => {
			remoteParticipants.set(p.identity, JSON.parse(p.metadata ?? ''))
		})

		// Listen to room events
		room.on(RoomEvent.ParticipantConnected, (p) => {
			setInitState((prevState) => {
				const updatedState = { ...prevState }
				const roomConnected = updatedState.roomConnecteds.get(roomType)
				if (roomConnected) {
					roomConnected.remoteParticipants.set(
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
				const roomConnected = updatedState.roomConnecteds.get(roomType)
				if (roomConnected) roomConnected.remoteParticipants.delete(p.identity)
				return updatedState
			})
		})

		room.on(RoomEvent.ParticipantMetadataChanged, (metadata, p) => {
			setInitState((prevState) => {
				const updatedState = { ...prevState }
				const roomConnected = updatedState.roomConnecteds.get(roomType)
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
			setInitState((prevState) => {
				const updatedState = { ...prevState }
				const roomConnected = updatedState.roomConnecteds.get(roomType)
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

		setInitState((prevState) => {
			const updatedState = { ...prevState }
			updatedState.roomConnecteds.set(roomType, {
				room,
				roomId: meetingId,
				roomType,
				localParticipant,
				remoteParticipants,
			})

			return updatedState
		})
	}, [])

	useLayoutEffect(() => {
		return () => {
			initState.roomConnecteds.forEach((roomConnected) => {
				roomConnected.room.disconnect()
			})
		}
	}, [])

	return (
		<MeetingContext.Provider
			value={{ ...initState, setMeetingState: setInitState, registerRoom }}
		>
			{children}
		</MeetingContext.Provider>
	)
}
