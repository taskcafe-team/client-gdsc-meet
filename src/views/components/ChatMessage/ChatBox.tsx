import {
	Box,
	Button,
	Container,
	IconButton,
	Input,
	Sheet,
	Stack,
} from '@mui/joy'
import React from 'react'
import MessageCard, { MessageContent } from './MessageCard'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Typography } from '@mui/material'

const fakeData: MessageContent[] = [
	{
		userId: '1',
		name: 'Minh',
		avatar: '',
		contents: [
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
		],
	},
	{
		userId: '2',
		name: 'Minh',
		avatar: '',
		contents: [
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
		],
	},
	{
		userId: '2',
		name: 'Minh',
		avatar: '',
		contents: [
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
		],
	},
	{
		userId: '2',
		name: 'Minh',
		avatar: '',
		contents: [
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
		],
	},
	{
		userId: '3',
		name: 'Minh',
		avatar: '',
		contents: [
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
			'Chao Thay, em co the nop bai tap muon hoc them vao ngay mai duoc',
		],
	},
]

interface ChatBoxProps {
	onSendMessage?: (message: string) => void
}

export default function ChatBox({ onSendMessage }: ChatBoxProps) {
	const userId = '3'
	const [messages, setMessages] = useState(fakeData)

	const [newMess, setNewMess] = useState('')

	const addMessage = (message: MessageContent) => {
		const lastMessage = messages[messages.length - 1]
		if (lastMessage.userId === message.userId) {
			lastMessage.contents.push(...message.contents)
			setMessages([...messages])
		} else setMessages([...messages, message])
	}

	const handleButtonSendMessageClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (onSendMessage) onSendMessage(newMess)
	}

	return (
		<Stack height={1} overflow="hidden">
			<Sheet variant="soft" sx={{ mb: 1, borderRadius: 10 }}>
				<Typography textAlign="center" variant="h6" fontWeight="bold">
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
					{messages.map((m) => (
						<MessageCard
							position={m.userId == userId ? 'right' : 'left'}
							messagesContent={m}
						/>
					))}
				</Box>
			</Stack>
			<Stack>
				<Input
					value={newMess}
					onChange={(e) => setNewMess(e.target.value)}
					placeholder="Input message here"
					sx={{ borderRadius: 10 }}
					endDecorator={
						<IconButton onClick={handleButtonSendMessageClick}>
							<SendRoundedIcon />
						</IconButton>
					}
				/>
			</Stack>
		</Stack>
	)
}
