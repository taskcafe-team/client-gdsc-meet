import { Stack } from '@mui/joy'
import React from 'react'

export default function MeetingLayout({ children }: React.PropsWithChildren) {
	return (
		<Stack width="100vw" height="100vh">
			{children}
		</Stack>
	)
}
