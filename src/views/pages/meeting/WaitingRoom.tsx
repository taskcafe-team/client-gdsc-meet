import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import { Box } from '@mui/joy'
import { useAppSelector } from 'contexts/hooks'
import React from 'react'

type PreJoinRoomProps = {
	onSubmit?: (
		values: Omit<LocalUserChoices, 'e2ee' | 'sharedPassphrase'>
	) => Promise<void>
}

export default function WaitingRoom({ onSubmit }: PreJoinRoomProps) {
	const user = useAppSelector((s) => s.user)
	const fullname = `${user.firstName + ' ' + user.lastName}`.trim()

	const [loading, setLoading] = useState(false)
	const hanldeSubmitJoin = useCallback(
		async (values: Omit<LocalUserChoices, 'e2ee' | 'sharedPassphrase'>) => {
			setLoading(true)
			if (onSubmit) await onSubmit(values)
			setLoading(false)
		},
		[]
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
				onSubmit={hanldeSubmitJoin}
				data-lk-theme="default"
				style={{ color: 'white', objectFit: 'cover' }}
				defaults={{
					username: fullname,
					videoEnabled: true,
					audioEnabled: true,
				}}
			/>
		</Box>
	)
}
