import 'assets/styles/meetingpage.css'
import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import { Box, Sheet, Stack, Container } from '@mui/joy'
import { useAppSelector } from 'contexts/hooks'
import ParticipantApi from 'api/http-rest/participant/participantApi'
import { ParticipantRole } from 'api/http-rest/participant/participantDTOs'
import useToastily from 'hooks/useToastily'
import ChatBox from 'views/containers/meeting/ChatBox'
import { ParticipantSendMessageDTO, RoomType } from 'api/webrtc/webRTCTypes'
import { Room, VideoPresets } from 'livekit-client'
import { ChatMessageCardProps } from 'views/containers/meeting/ChatMessageCard'
import { WebRTCListenerFactory } from 'api/webrtc/webRTCListenerFactory'
import { SendMessageActionEnum } from 'api/webrtc/webRTCActions'
import WaitingChatBox from 'views/containers/meeting/WaitingChatBox'

type PreJoinRoomProps = {
	onSubmit?: (values: {
		userChoice: Omit<LocalUserChoices, 'e2ee' | 'sharedPassphrase'>
		redirectTo: RoomType
	}) => Promise<void>
}

export default function PreJoinRoom({ onSubmit }: PreJoinRoomProps) {
	const { meetingId } = useParams()
	if (!meetingId) return <Navigate to="/" />

	const user = useAppSelector((s) => s.user)
	const fullname = `${user.firstName + ' ' + user.lastName}`.trim()

	const toast = useToastily()
	const [loading, setLoading] = useState(false)
	const [roomType, setRoomType] = useState<RoomType | null>(null)

	const joinRoom = useCallback(
		async (values: Omit<LocalUserChoices, 'e2ee' | 'sharedPassphrase'>) => {
			const res = await ParticipantApi.getAccessToken(meetingId)
			const { participant, tokens } = res?.data
			if (!participant || !tokens)
				return toast({ content: 'Join Meeting Error', type: 'error' })
			tokens.forEach((t) => ParticipantApi.setMeetingApiToken(t))
			let _roomType = RoomType.WAITING
			if (participant.role === ParticipantRole.HOST)
				_roomType = RoomType.MEETING
			else _roomType = tokens[0].roomType ?? RoomType.WAITING
			setRoomType(_roomType)
		},
		[]
	)

	const hanldeSubmitJoin = useCallback(
		async (values: Omit<LocalUserChoices, 'e2ee' | 'sharedPassphrase'>) => {
			if (loading) return
			setLoading(true)
			joinRoom(values)
			if (onSubmit)
				await onSubmit({
					userChoice: values,
					redirectTo: roomType ?? RoomType.WAITING,
				})
			setLoading(false)
		},
		[]
	)

	return (
		<Stack width={1} height={1} justifyContent="center" alignItems="center">
			<Stack
				overflow="hidden"
				borderRadius="lg"
				justifyContent="center"
				alignItems="stretch"
				direction={{
					xs: 'column',
					md: 'row',
				}}
				height={{
					xs: 'auto',
					md: 450,
				}}
			>
				<Sheet
					variant="soft"
					sx={{
						width: { xs: 'auto', md: 500 },
					}}
				>
					<PreJoin
						onSubmit={hanldeSubmitJoin}
						data-lk-theme="default"
						style={{
							color: 'white',
							objectFit: 'cover',
							width: '100%',
							height: '100%',
						}}
						defaults={{
							username: fullname,
							videoEnabled: true,
							audioEnabled: true,
						}}
					/>
				</Sheet>
				{roomType === RoomType.WAITING && (
					<Sheet
						variant="soft"
						sx={{
							p: 2,
							height: { xs: 300, md: 'auto' },
						}}
					>
						<WaitingChatBox />
					</Sheet>
				)}
			</Stack>
		</Stack>
	)
}
