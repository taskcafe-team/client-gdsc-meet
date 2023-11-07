import React from 'react'
import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import { Box } from '@mui/material'
import { useAppSelector } from 'contexts/hooks'
import 'assets/styles/meetingpage.css'

type PreJoinTabProps = {
	// videoAllowed: boolean
	// audioAllowed: boolean
	// btnJoinMeetingClick: React.MouseEventHandler<HTMLButtonElement>
	// isLoading: boolean
	handlePreJoinSubmit?: (values: LocalUserChoices) => void
}

export default function PreJoinTab(props: PreJoinTabProps) {
	const user = useAppSelector((s) => s.user)
	const fullname = useMemo(
		() => `${user.firstName + ' ' + user.lastName}`.trim(),
		[user]
	)
	return (
		<Box
			margin={2}
			border={1}
			overflow="hidden"
			borderRadius={4}
			borderColor="white"
			sx={{
				width: { sm: 'auto', md: '500px' },
				maxWidth: '500px',
				textAlign: 'center',
			}}
		>
			<PreJoin
				onSubmit={props.handlePreJoinSubmit}
				data-lk-theme="default"
				style={{ color: 'white' }}
				defaults={{
					username: fullname,
					videoEnabled: true,
					audioEnabled: true,
				}}
			/>
		</Box>
	)
}
