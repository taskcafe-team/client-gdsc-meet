import { Box, IconButton, Input, Sheet, Stack } from '@mui/joy'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Typography } from '@mui/material'
import ChatMessageCard, { ChatMessageCardProps } from './ChatMessageCard'
import { Loading } from 'views/routes/routes'

type ChatBoxProps = {
	title: string
	messages: ChatMessageCardProps[]
	onSend?: (content: string) => Promise<void> | void
}
export default function ChatBox({ title, messages, onSend }: ChatBoxProps) {
	const [newMess, setNewMess] = useState('')
	const [sending, setSending] = useState(false)

	return (
		<Stack height={1} overflow="hidden">
			<Sheet variant="outlined" sx={{ mb: 1, borderRadius: 10 }}>
				<Typography
					textAlign="center"
					variant="h6"
					fontWeight="bold"
					color="Highlight"
				>
					{title}
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
				onSubmit={async (e) => {
					e.preventDefault()
					if (sending || newMess.trim().length == 0) return
					setSending(true)
					const content = newMess
					setNewMess('')
					if (onSend) await onSend(content)
					setSending(false)
				}}
			>
				<Stack direction="row" width={1}>
					<Input
						fullWidth
						value={newMess}
						onChange={(e) => setNewMess(e.target.value)}
						placeholder="Input message here"
						sx={{ borderRadius: 10, mr: 0.5 }}
					/>
					<IconButton disabled={sending} size="sm" type="submit" variant="soft">
						{(sending && <Loading />) || <SendRoundedIcon />}
					</IconButton>
				</Stack>
			</form>
		</Stack>
	)
}
