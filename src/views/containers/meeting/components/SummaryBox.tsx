import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Chat, FavoriteBorder } from '@mui/icons-material'
import {
	ListItem,
	Stack,
	List,
	Typography,
	IconButton,
	ListSubheader,
	ListItemButton,
	Grid,
	Avatar,
	Tooltip,
	Sheet,
	Box,
	Card,
	Chip,
	Button,
	CardContent,
	CardActions,
} from '@mui/joy'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import WikiMediaApi from 'api/http-rest/mediawiki/mediawikiApi'
import { WikiMediaSummaryResult } from 'api/http-rest/mediawiki/mediawikiType'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import moment from 'moment'
import {
	noitificationKeywordFetch,
	noitificationKeywordOpen,
} from 'contexts/notificationKeyword/notificationKeywordAction'
import { Animate } from 'utils/mockAnimation'
import { keywordFetch } from 'contexts/keywords'

interface ISummaryBox {
	title: string
}
export const KeywordFlag: React.FC<{
	active: boolean
	title: string
	content: string
	onClick?: () => void
}> = React.memo(({ active, content, title, ...rest }) => {
	return (
		<ListItem
			{...rest}
			sx={{
				padding: 1,
			}}
		>
			<Tooltip title={content} placement="right">
				<Avatar
					size="sm"
					sx={{
						cursor: 'pointer',
						color: active ? 'white' : '',
						backgroundColor: active ? '#2870EA' : '',
						transition: 'all 0.2s ',
					}}
				>
					{title}
				</Avatar>
			</Tooltip>
		</ListItem>
	)
})

const Keyword: React.FC<{
	title: string
}> = React.memo(({ title, ...rest }) => {
	const dispatch = useAppDispatch()
	const [flag, setFlag] = useState<boolean>(false)
	const handleFetchSumary = useCallback(async () => {
		await dispatch(noitificationKeywordOpen())
		if (flag == true) return
		await dispatch(
			noitificationKeywordFetch({
				keyword: title,
			})
		)
		setFlag(true)
	}, [])
	return (
		<ListItem {...rest} onClick={handleFetchSumary}>
			<Tooltip
				placement="top-end"
				variant="outlined"
				arrow
				title={
					flag ? (
						<Chip color="success">Complese</Chip>
					) : (
						<Chip color="neutral">Cick view now...</Chip>
					)
				}
			>
				<ListItemButton sx={{ padding: '4px' }} variant="plain" color="neutral">
					<Stack>
						<Box color={flag ? 'ActiveCaption' : 'GrayText'}>{title}</Box>
					</Stack>
				</ListItemButton>
			</Tooltip>
		</ListItem>
	)
})

const SummaryBox = ({ title }: ISummaryBox) => {
	const [selectedItem, setSelectedItem] = useState<number | null>(0)
	const leftSheetRef = useRef<HTMLDivElement | null>(null)
	const mapKeyworks = useAppSelector((s) => s.keyword.value)
	const dispatch = useAppDispatch()

	const handleAvatarClick = (index: number) => {
		setSelectedItem(index)

		// Scroll the left sheet to the corresponding item
		if (leftSheetRef.current) {
			const itemElement = leftSheetRef.current.children[index] as HTMLDivElement
			if (itemElement) {
				itemElement.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}

	return (
		<Stack height={1} width={1} overflow="hidden" spacing={1}>
			<Stack direction="row" spacing={1} alignItems="center">
				<IconButton size="sm" variant="outlined">
					<ChromeReaderModeIcon />
				</IconButton>
				<Typography level="title-lg">{title}</Typography>
			</Stack>
			<Grid container spacing={1}>
				<Grid xs={9}>
					<Sheet
						sx={{
							maxHeight: '89vh',
							overflowY: 'auto',
							'&::-webkit-scrollbar': { display: 'none' },
						}}
						ref={leftSheetRef}
					>
						{mapKeyworks &&
							mapKeyworks.map((item, index) => {
								return (
									<motion.div
										{...Animate.getAnimationValues('opacity', 200)}
										key={`${item.startAt}__${index}__${item.keywords}`}
									>
										<Card
											key={index}
											sx={{
												marginBottom: '4px',
											}}
										>
											<ListItem nested>
												<ListSubheader
													sx={{
														padding: '8px',
														borderRadius: '2px',
														color: selectedItem == index ? 'white' : '',
														backgroundColor:
															selectedItem == index ? '#2870EA' : '',
														transition: 'all 0.2s ',
														fontWeight: 'bold',
													}}
												>
													{item.startAt
														? moment(new Date(item.startAt)).format('HH:mm:ss')
														: ''}
												</ListSubheader>
												<List>
													{item.keywords &&
														item.keywords.map((value) => {
															return (
																<Keyword
																	title={value.toString()}
																	key={`${value}_${index}`}
																/>
															)
														})}
												</List>
											</ListItem>
										</Card>
									</motion.div>
								)
							})}
					</Sheet>
				</Grid>
				<Grid xs={3} justifyContent={'start'}>
					<Sheet
						variant="outlined"
						sx={{
							minHeight: '89vh',
							maxHeight: '89vh',
							overflowY: 'auto',
							'&::-webkit-scrollbar': { display: 'none' },
						}}
					>
						<List
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								paddingBottom: '40px',
							}}
						>
							{mapKeyworks &&
								mapKeyworks.map((item, index) => {
									return (
										<KeywordFlag
											onClick={() => handleAvatarClick(index)}
											active={Boolean(selectedItem == index)}
											title={`${index + 1}`}
											key={index}
											content={
												item.startAt
													? moment(new Date(item.startAt)).format('HH:mm:ss')
													: ''
											}
										/>
									)
								})}
						</List>
					</Sheet>
				</Grid>
			</Grid>
			<Stack direction="row" spacing={1} alignItems="center"></Stack>
		</Stack>
	)
}

export default SummaryBox
