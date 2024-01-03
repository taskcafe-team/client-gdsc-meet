import React from 'react'
import CallIcon from '@mui/icons-material/Call'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import online_meeting_illustration from 'assets/static/images/icons/online_meeting_illustration.svg'
import useToastily from 'hooks/useToastily'
import {
	Divider,
	Box,
	Button,
	Checkbox,
	Input,
	Stack,
	Typography,
} from '@mui/joy'
import { MeetingInfo, meetingFetchMyMeetings } from 'contexts/meeting'
import RouterPath from 'views/routes/routesContants'
import MeetingInfoModal from './MeetingInfoModal'
import { CreateMeetingModal } from 'views/containers/home/CreateMeetingModal'
import { MeetingApi } from 'api/http-rest'
import useIsMobile from 'hooks/useIsMobile'

const ListMeeting = (props) => {
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const meetings = useAppSelector((s) => s.meeting.meetings)
	const isMobile = useIsMobile()
	const [showMeeting, setShowMeeting] = useState<MeetingInfo | null>(null)

	const [fetching, setFetching] = useState(false)
	const dispatch = useAppDispatch()
	const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({})

	const changeSelected = (id: string, checked: boolean) => {
		setSelectedIds((pre) => {
			if (checked) pre[id] = true
			else delete pre[id]
			return { ...pre }
		})
	}

	useLayoutEffect(() => {
		if (isLogin) dispatch(meetingFetchMyMeetings())
	}, [isLogin])

	const deleteSelected = () => {
		setShowMeeting(null)
		setFetching(true)
		const ids = Object.keys(selectedIds)
		if (ids.length > 0)
			MeetingApi.deleteMeetings({ ids })
				.then(() => dispatch(meetingFetchMyMeetings()))
				.finally(() => setFetching(false))
	}

	const openMeetingInfo = (meeting: MeetingInfo) => {
		setShowMeeting(meeting)
	}

	const selectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked
		const _seletedIds: Record<string, boolean> = {}
		if (checked) meetings.forEach((m) => (_seletedIds[m.id] = true))
		setSelectedIds(_seletedIds)
	}

	if (!isLogin) return <></>
	return (
		<Box sx={{ mb: 4, width: isMobile ? '100%' : '60%' }}>
			<Typography
				className="dark:text-white"
				level="h2"
				sx={{ my: 2 }}
				textAlign="left"
			>
				My Meetings
			</Typography>
			{showMeeting && (
				<MeetingInfoModal
					meetingInfo={showMeeting}
					open={Boolean(showMeeting)}
					setOpen={() => setShowMeeting(null)}
				/>
			)}

			<Box mb={2} display="flex" alignItems="center" gap={1}>
				<Button
					loading={fetching}
					onClick={deleteSelected}
					disabled={Object.keys(selectedIds).length === 0}
					sx={{ textTransform: 'none', borderRadius: 10 }}
					variant="solid"
					color="danger"
				>
					Delete
				</Button>
				<Checkbox
					disabled={fetching}
					label="select all"
					variant="soft"
					onChange={selectAllChange}
					className="dark:text-white font-bold"
				/>
			</Box>
			<Box display="flex" flexGrow="initial" flexWrap="wrap" gap={1}>
				{meetings.map((m, i) => {
					return (
						<Button
							onClick={() => openMeetingInfo(m)}
							disabled={fetching}
							key={i}
							variant="outlined"
							color="primary"
							sx={{ textTransform: 'none', borderRadius: 10 }}
						>
							<Checkbox
								disabled={fetching}
								sx={{ mr: 1 }}
								onClick={(e) => e.stopPropagation()}
								checked={Boolean(selectedIds[m.id])}
								color="neutral"
								size="sm"
								variant="soft"
								onChange={(e) => changeSelected(m.id, e.target.checked)}
							/>
							<Typography
								textOverflow="ellipsis"
								maxWidth={120}
								minWidth={50}
								overflow="hidden"
								whiteSpace="nowrap"
								className="dark:text-white"
							>
								{m.title || 'None'}
							</Typography>
						</Button>
					)
				})}
			</Box>
		</Box>
	)
}

ListMeeting.propTypes = {}

export default ListMeeting
