import { Avatar, Box, Card, Chip, Stack, Button, Typography } from '@mui/joy'

export type MessageContent = {
	senderId: string
	name: string
	avatar: string
	contents: string[]
}

export type ChatMessageCardProps = {
	position?: 'left' | 'right'
	messageContent: MessageContent
	action?: {
		accept: (content: Omit<MessageContent, 'contents'>) => void
		reject: (content: Omit<MessageContent, 'contents'>) => void
	}
}

export default function ChatMessageCard({
	position = 'right',
	messageContent,
	action,
}: ChatMessageCardProps) {
	const direction = position === 'left' ? 'row' : 'row-reverse'

	return (
		<Stack direction={direction} sx={{ mb: 2 }} spacing={0.5}>
			<Box>
				<Avatar
					variant="soft"
					color="danger"
					alt={messageContent.name}
					src={messageContent.avatar}
				/>
			</Box>
			<Stack spacing={0.5}>
				<Stack direction={direction}>
					<Chip size="md" variant="soft" color="neutral">
						<Typography maxWidth={200} level="inherit" fontWeight="bold">
							{messageContent.name}
						</Typography>
					</Chip>
				</Stack>
				{messageContent.contents.map((c, i) => (
					<Card key={i} size="sm" sx={{ borderRadius: 15, py: 0.3 }}>
						<Typography
							maxWidth={200}
							sx={{ wordBreak: 'break-word' }}
							level="inherit"
						>
							{c}
						</Typography>
					</Card>
				))}
				{action && (
					<Stack direction={direction} spacing={1}>
						<Button
							size="sm"
							sx={{ borderRadius: 50 }}
							variant="soft"
							onClick={() => action.accept(messageContent)}
						>
							accept
						</Button>
						<Button
							size="sm"
							sx={{ borderRadius: 50 }}
							color="warning"
							variant="soft"
							onClick={() => action.reject(messageContent)}
						>
							reject
						</Button>
					</Stack>
				)}
			</Stack>
		</Stack>
	)
}
