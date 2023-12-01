import { IconButton, Input, Stack, Typography } from '@mui/joy'
import ChatMessageCard, { ChatMessageCardProps } from './ChatMessageCard'
import { Chat } from '@mui/icons-material'

type ChatBoxProps = {
	title: string
	messages: ChatMessageCardProps[]
	onSend?: (content: string) => Promise<void> | void
}
export default function ChatBox({ title, messages, onSend }: ChatBoxProps) {
	const [newMess, setNewMess] = useState('')
	const [sending, setSending] = useState(false)

	return (
		<Stack height={1} width={1} overflow="hidden" spacing={1}>
			<Stack direction="row" spacing={1} alignItems="center">
				<IconButton size="sm" variant="outlined">
					<Chat />
				</IconButton>
				<Typography level="title-lg">{title}</Typography>
			</Stack>
			<Stack
				flex={1}
				overflow={'auto'}
				sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
			>
				{messages.map((m, i) => (
					<ChatMessageCard key={i} {...m} />
				))}
			</Stack>
			<Stack sx={{ mt: 'auto' }}>
				<form
					style={{ width: '100%' }}
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
							sx={{ borderRadius: 'sm' }}
							value={newMess}
							onChange={(e) => setNewMess(e.target.value)}
							placeholder="Input message here"
						/>
					</Stack>
				</form>
			</Stack>
		</Stack>
	)
}

// <IconButton
// 	disabled={sending}
// 	type="submit"
// 	variant="soft"
// 	children={(sending && <Loading />) || <SendRoundedIcon />}
// />
