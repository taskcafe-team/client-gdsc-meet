import React from 'react'
import PropTypes from 'prop-types'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Chip,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/joy'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { noitificationKeywordClose } from 'contexts/notificationKeyword/notificationKeywordAction'

type IDisabled = 'disabled' | 'loading' | 'enabled'
class StateNotificationKeyword {
	static readonly disabled: IDisabled = 'disabled'
	static readonly loading: IDisabled = 'loading'
	static readonly enabled: IDisabled = 'enabled'
}
const NotificationKeyWord = (props) => {
	const dispatch = useAppDispatch()
	const title = useAppSelector((s) => s.noitificationKeyword.title)
	const extract = useAppSelector((s) => s.noitificationKeyword.extract)
	const loading = useAppSelector((s) => s.noitificationKeyword.loading)
	const visible = useAppSelector((s) => s.noitificationKeyword.visible)
	const isDisabled = useMemo(() => {
		if (Boolean(visible)) {
			return StateNotificationKeyword.disabled
		} else if (Boolean(loading)) {
			return StateNotificationKeyword.loading
		} else {
			return StateNotificationKeyword.enabled
		}
	}, [title, extract, loading, visible])

	const handleCloseNotification = useCallback(async () => {
		await dispatch(noitificationKeywordClose())
	}, [])

	if (isDisabled == StateNotificationKeyword.disabled) {
		return <></>
	}
	
	if (isDisabled == StateNotificationKeyword.loading) {
		return (
			<Button loading variant="solid">
				Solid
			</Button>
		)
	}

	return (
		<Card
		>
			<CardContent>
				<Stack
					flexDirection="row"
					sx={{
						width: '100%',
					}}
					justifyContent="space-between"
					alignItems="center"
				>
					<Chip
						sx={{
							padding: 1,
							width: '80%',
						}}
					>
						<Typography level="body-lg" fontWeight="bold">
							{title && title}
						</Typography>
					</Chip>

					<Tooltip
						placement="top-end"
						variant="outlined"
						arrow
						title="Delete"
						sx={{
							width: '10%',
						}}
					>
						<IconButton
							onClick={handleCloseNotification}
							variant="outlined"
							color="neutral"
						>
							<HighlightOffIcon />
						</IconButton>
					</Tooltip>
				</Stack>
				<Box
					sx={{
						maxHeight: '300px',
						overflowY: 'auto',
						'&::-webkit-scrollbar': { display: 'none' },
					}}
				>
					<Typography level="body-sm">{extract && extract}</Typography>
				</Box>
			</CardContent>
		</Card>
	)
}

NotificationKeyWord.propTypes = {}

export default React.memo(NotificationKeyWord)
