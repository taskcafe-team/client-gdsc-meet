import {
	Box,
	CircularProgress,
	IconButton,
	Input,
	Sheet,
	Stack,
} from '@mui/joy'
import React from 'react'
import ChatMessageCard, { ChatMessageCardProps } from './ChatMessageCard'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Typography } from '@mui/material'
import ParticipantApi from 'api/http-rest/participant/participantApi'

interface ChatBoxProps {
	// onSendMessage?: (message: string) => void
	messages: ChatMessageCardProps[]
}

export default function ChatBox({ messages }: ChatBoxProps) {
	const { meetingId } = useParams()
	if (!meetingId) return <Navigate to="/" />

	const [sending, setSending] = useState(false)
	const [newMess, setNewMess] = useState('')

	const sendMessage = useCallback(async () => {
		if (newMess.length === 0) return
		setSending(true)
		await ParticipantApi.sendMessage(meetingId, {
			message: newMess,
		}).finally(() => {
			setNewMess('')
			setSending(false)
		})
	}, [newMess])

	return (
		<Stack height={1} overflow="hidden">
			<Sheet variant="outlined" sx={{ mb: 1, borderRadius: 10 }}>
				<Typography
					textAlign="center"
					variant="h6"
					fontWeight="bold"
					color="Highlight"
				>
					Waiting Chat
				</Typography>
			</Sheet>
			<Stack flex={1} overflow="hidden">
				<Box
					height={1}
					sx={{
						overflowY: 'auto',
						'&::-webkit-scrollbar': { display: 'none' },
					}}
				>
					{messages.map((m, i) => (
						<ChatMessageCard key={i} {...m} />
					))}
				</Box>
			</Stack>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					sendMessage()
				}}
			>
				<Stack direction="row">
					<Input
						value={newMess}
						onChange={(e) => setNewMess(e.target.value)}
						placeholder="Input message here"
						sx={{ borderRadius: 10, mr: 0.5 }}
					/>
					<IconButton disabled={sending} size="sm" type="submit" variant="soft">
						{(sending && <CircularProgress />) || <SendRoundedIcon />}
					</IconButton>
				</Stack>
			</form>
		</Stack>
	)
}
