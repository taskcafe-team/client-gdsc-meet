import { Avatar, Box, Card, Chip, Stack, Button, Typography } from '@mui/joy'

export interface MessageContent {
	senderId: string
	name: string
	avatar: string
	contents: string[]
}

export interface ChatMessageCardProps {
	position?: 'left' | 'right'
	messageContent: MessageContent
}

export default function ChatMessageCard({
	position = 'right',
	messageContent,
}: ChatMessageCardProps) {
	const direction = position === 'left' ? 'row' : 'row-reverse'
	// const textAlign = position === 'left' ? 'left' : 'right'

	return (
		<Stack direction={direction} sx={{ mb: 2 }} spacing={0.5}>
			<Box>
				<Avatar alt={messageContent.name} />
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
						<Typography maxWidth={200} level="inherit">
							{c}
						</Typography>
					</Card>
				))}
				<Stack direction={direction} spacing={1}>
					<Button size="sm" sx={{ borderRadius: 50 }} variant="soft">
						accept
					</Button>
					<Button
						size="sm"
						sx={{ borderRadius: 50 }}
						color="warning"
						variant="soft"
					>
						reject
					</Button>
				</Stack>
			</Stack>
		</Stack>
	)
}
