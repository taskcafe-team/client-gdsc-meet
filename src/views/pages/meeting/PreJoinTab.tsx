import 'assets/styles/meetingpage.css'
import {
	LiveKitRoom,
	LocalUserChoices,
	PreJoin,
} from '@livekit/components-react'
import { Box } from '@mui/material'
import { useAppSelector } from 'contexts/hooks'
import { Room, VideoPresets } from 'livekit-client'
import useToastily from 'hooks/useToastily'
import MeetingApi from 'api/http-rest/meeting/meetingApi'

import MeetingManagementBar from './MeetingManagementBar'
import { setLocalStorageItem } from 'utils/localStorageUtils'

type PreJoinTabProps = {
	// videoAllowed: boolean
	// audioAllowed: boolean
	// btnJoinMeetingClick: React.MouseEventHandler<HTMLButtonElement>
	// isLoading: boolean
	// handlePreJoinSubmit?: (values: LocalUserChoices) => void
	onConnected?: (room: Room) => void
}

export default function PreJoinTab(props: PreJoinTabProps) {
	const navagate = useNavigate()
	const user = useAppSelector((s) => s.user)
	const toast = useToastily()
	const { meetingId } = useParams()
	const fullname = `${user.firstName + ' ' + user.lastName}`.trim()

	const [fetchingToken, setFetchingToken] = useState(false)
	const [connectingRoom, setConnectingRoom] = useState(false)

	const connectToRoom = useCallback(async (_token: string) => {
		setConnectingRoom(true)
		const _room = new Room({
			adaptiveStream: true,
			dynacast: true,
			videoCaptureDefaults: {
				resolution: VideoPresets.h540.resolution,
			},
		})

		await _room
			.connect(import.meta.env.API_WEBRTC_SOCKET_URL, _token)
			.then((res) => console.log(res))
			.catch(() => toast({ content: 'Connect Meeting Error', type: 'error' }))
			.finally(() => setConnectingRoom(false))
		await _room.localParticipant.enableCameraAndMicrophone()
		return _room
	}, [])

	const getRoomToken = useCallback(async (_meetingId: string) => {
		setFetchingToken(true)
		const _roomtoken = await MeetingApi.getAccessToken(_meetingId)
		if (!('data' in _roomtoken)) return null
		return _roomtoken.data
	}, [])

	const hanldeSubmitJoin = useCallback(async () => {
		if (fetchingToken || connectingRoom) return
		if (!meetingId) return navagate('/')

		const res = await getRoomToken(meetingId)
		if (!res) return toast({ content: 'Get token error', type: 'error' })
		setLocalStorageItem({ key: 'meeting-api-token', value: res.token })

		const _room = await connectToRoom(res.token)
		if (props.onConnected) props.onConnected(_room)
	}, [])

	return (
		<Box
			margin={2}
			border={1}
			overflow="hidden"
			borderRadius={4}
			borderColor="white"
			sx={{
				width: { sm: 'auto', md: '500px' },
				maxWidth: '500px',
				textAlign: 'center',
			}}
		>
			<PreJoin
				onSubmit={hanldeSubmitJoin}
				data-lk-theme="default"
				style={{ color: 'white', objectFit: 'cover' }}
				defaults={{
					username: fullname,
					videoEnabled: true,
					audioEnabled: true,
				}}
			/>
		</Box>
	)
}
