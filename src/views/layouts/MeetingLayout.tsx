import { Box, Stack } from '@mui/joy'
import React from 'react'

type MeetingLayoutProps = {
	children: React.ReactNode
}
export default function MeetingLayout({ children }: MeetingLayoutProps) {
	return (
		<Stack height={'100vh'} width={'100vw'} overflow="hidden">
			{children}
		</Stack>
	)
}
