import { Avatar, Box, Card, Chip, Stack, Button, Typography } from '@mui/joy'

export interface MessageContent {
	userId: string
	name: string
	avatar: string
	contents: string[]
}

export interface MessageCardProps {
	position?: 'left' | 'right'
	messagesContent: MessageContent
}

export default function MessageCard({
	position = 'right',
	messagesContent,
}: MessageCardProps) {
	const direction = position === 'left' ? 'row' : 'row-reverse'
	// const textAlign = position === 'left' ? 'left' : 'right'

	return (
		<Stack direction={direction} sx={{ mb: 2 }} spacing={0.5}>
			<Box>
				<Avatar alt={messagesContent.name} />
			</Box>
			<Stack spacing={0.5}>
				<Stack direction={direction}>
					<Chip size="md" variant="soft" color="neutral">
						<Typography maxWidth={200} level="inherit" fontWeight="bold">
							{messagesContent.name}
						</Typography>
					</Chip>
				</Stack>
				<Card size="sm" sx={{ borderRadius: 15, py: 1 }}>
					{messagesContent.contents.map((c) => (
						<Typography maxWidth={200} level="inherit">
							{c}
						</Typography>
					))}
				</Card>
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
