import { Chat, LiveKitRoom } from '@livekit/components-react'
import { Box, Button, Drawer, Sheet } from '@mui/joy'
import ChatBox from 'components/ChatMessage/ChatBox'
import React from 'react'

export default function DrawerMeeting() {
	const [open, setOpen] = React.useState(false)

	return (
		<Box sx={{ display: 'flex' }}>
			<Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
				Open drawer
			</Button>
			<Drawer
				size="md"
				variant="plain"
				open={true}
				onClose={() => setOpen(false)}
				slotProps={{
					content: {
						sx: {
							width: 500,
							bgcolor: 'transparent',
							p: { md: 3, sm: 0 },
							boxShadow: 'none',
						},
					},
				}}
				anchor="right"
			>
				<Sheet sx={{ borderRadius: 'md', p: 2, height: 1 }}>
					<ChatBox />
				</Sheet>
			</Drawer>
		</Box>
	)
}
