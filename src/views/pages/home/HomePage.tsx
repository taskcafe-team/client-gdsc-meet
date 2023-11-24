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
import {
	MeetingInfo,
	meetingFetchDeleteInstants,
	meetingFetchMyMeetings,
} from 'contexts/meeting'
import RouterPath from 'views/routes/routesContants'
import MeetingInfoModal from './MeetingInfoModal'
import { CreateMeetingModal } from 'views/containers/home/CreateMeetingModal'

export function ListMeeting() {
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const meetings = useAppSelector((s) => s.meeting.meetings)

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
		const seletedArr = Object.keys(selectedIds)
		if (seletedArr.length > 0)
			dispatch(meetingFetchDeleteInstants(seletedArr))
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
		<Box sx={{ mb: 4 }}>
			<Divider sx={{ my: 2 }}>
				<Typography level="h3" sx={{ my: 2 }} textAlign="center">
					My Meetings
				</Typography>
			</Divider>
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

export default function HomePage() {
	const [openCreateMeetingForm, setOpenCreateMeetingForm] = useState(false)
	const toast = useToastily()
	const navigate = useNavigate()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const [meetingId, setMeetingId] = useState('')

	const validationLogin = useCallback(() => {
		if (!isLogin) toast({ content: 'Please login!', type: 'warning' })
		return isLogin
	}, [isLogin])

	const hanldeSubmitJoinMeeting = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault()
			if (validationLogin() && meetingId.length > 0)
				navigate(RouterPath.getPreMeetingPath(meetingId))
		},
		[meetingId]
	)

	return (
		<Box sx={{ my: 2, mx: 2 }}>
			{openCreateMeetingForm && (
				<CreateMeetingModal
					open={openCreateMeetingForm}
					setOpen={setOpenCreateMeetingForm}
				/>
			)}
			<Box maxWidth="sm" margin="auto">
				<Box textAlign="center">
					<img
						style={{ display: 'inline-block' }}
						alt="Oline Meeting Images"
						width="300px"
						src={online_meeting_illustration}
					/>
					<Typography level="h2" sx={{ my: 2 }}>
						Cuộc họp video chất lượng. Giờ đây miễn phí cho tất cả mọi người.
					</Typography>
					<Typography sx={{ mb: 4 }}>
						GDSC Meet - dịch vụ tổ chức cuộc họp kinh doanh với độ bảo mật cao.
					</Typography>
				</Box>
				<Box maxWidth="sm">
					<Box sx={{ textAlign: 'center', mt: 3 }}>
						<form onSubmit={hanldeSubmitJoinMeeting}>
							<Stack
								direction={{ xs: 'column', md: 'row' }}
								justifyContent="space-between"
								spacing={1}
							>
								<Input
									value={meetingId}
									onChange={(e) => setMeetingId(e.target.value.trim())}
									required
									fullWidth
									placeholder="Input meeting code!"
									startDecorator={<CallIcon />}
									endDecorator={<Button type="submit">Join</Button>}
								/>
								<Box display="flex" alignItems="center">
									<Button
										fullWidth
										size="sm"
										type="button"
										variant="outlined"
										onClick={() =>
											validationLogin() && setOpenCreateMeetingForm(true)
										}
									>
										Create
									</Button>
								</Box>
							</Stack>
						</form>
					</Box>
				</Box>
				<Box maxWidth="sm">
					<ListMeeting />
				</Box>
			</Box>
		</Box>
	)
}
