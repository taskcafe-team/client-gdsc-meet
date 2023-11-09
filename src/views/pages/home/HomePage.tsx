import React from 'react'
import {
	Box,
	Container,
	Divider,
	FormControl,
	IconButton,
	InputAdornment,
	OutlinedInput,
	styled,
} from '@mui/material'
import CallIcon from '@mui/icons-material/Call'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import RouterPath from 'views/routes/routesContants'
import online_meeting_illustration from 'assets/static/images/icons/online_meeting_illustration.svg'
import useToastily from 'hooks/useToastily'
import CreateMeetingFormDialog from './CreateMeetingFormDialog'
import {
	Button,
	Checkbox,
	Modal,
	ModalClose,
	Sheet,
	Typography,
} from '@mui/joy'
import {
	meetingFetchDeleteInstants,
	meetingFetchMyMeetings,
} from 'contexts/meeting'

const MainContent = styled(Box)(
	() => `
    width: 100%;
    display: flex;s
    flex: 1;
    flex-direction: column;
  `
)

const TopWrapper = styled(Box)(
	() => `
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
  `
)

export default function HomePage() {
	const [openCreateMeetingForm, setOpenCreateMeetingForm] = useState(false)
	const navigate = useNavigate()
	const toast = useToastily()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const meetingErr = useAppSelector((s) => s.meeting.error)
	const [friendLyId, setFriendlyId] = useState('')

	const validationLogin = useCallback(() => {
		return isLogin
	}, [isLogin])

	const handleSubmitJoinMeeting = (e) => {
		e.preventDefault()
		if (validationLogin()) navigate(RouterPath.getPreMeetingPath(friendLyId))
	}
	useLayoutEffect(() => {
		if (meetingErr) toast({ content: meetingErr.message, type: 'error' })
	}, [meetingErr])

	useLayoutEffect(() => {
		return () => setOpenCreateMeetingForm(false)
	}, [])

	return (
		<MainContent>
			<CreateMeetingFormDialog
				open={openCreateMeetingForm}
				setOpen={setOpenCreateMeetingForm}
			/>
			<TopWrapper>
				<Container maxWidth="sm">
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
							GDSC Meet - dịch vụ tổ chức cuộc họp kinh doanh với độ bảo mật
							cao.
						</Typography>
					</Box>
					<Container maxWidth="sm">
						<Box sx={{ textAlign: 'center', mt: 3, py: 2, px: { md: 4 } }}>
							<form onSubmit={handleSubmitJoinMeeting}>
								<FormControl variant="outlined" fullWidth>
									<OutlinedInput
										value={friendLyId}
										onChange={(e) => setFriendlyId(e.target.value)}
										type="text"
										required={true}
										placeholder="Input meeting code!"
										endAdornment={
											<InputAdornment position="end">
												<Button variant="solid" type="submit">
													Join Meeting
												</Button>
											</InputAdornment>
										}
										startAdornment={
											<InputAdornment position="start">
												<CallIcon />
											</InputAdornment>
										}
									/>
								</FormControl>
							</form>
							<Divider sx={{ my: 2 }}>OR</Divider>
							<Button
								variant="outlined"
								onClick={() => setOpenCreateMeetingForm(true)}
							>
								Create Meeting
							</Button>
						</Box>
					</Container>
					<Container maxWidth="sm">
						<ListMeeting />
					</Container>
				</Container>
			</TopWrapper>
		</MainContent>
	)
}

export function ListMeeting() {
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const meetings = useAppSelector((s) => s.meeting.meetings)
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
		const seletedArr = Object.keys(selectedIds)
		if (seletedArr.length > 0) dispatch(meetingFetchDeleteInstants(seletedArr))
	}

	const selectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked
		const _seletedIds: Record<string, boolean> = {}

		if (checked) meetings.forEach((m) => (_seletedIds[m.id] = true))
		setSelectedIds(_seletedIds)
	}

	if (meetings.length == 0 || !isLogin) return <></>
	return (
		<Box py={3}>
			<Divider />
			<Box>
				<Typography level="h3" sx={{ my: 2 }} textAlign="center">
					My Meetings
				</Typography>
			</Box>
			<Box pb={2} display="flex" alignItems="center" gap={1}>
				<Button
					onClick={() => {
						deleteSelected()
					}}
					disabled={Object.keys(selectedIds).length === 0}
					sx={{ textTransform: 'none', borderRadius: 10 }}
					variant="solid"
					color="danger"
				>
					Delete
				</Button>
				<Checkbox
					label="select all"
					variant="soft"
					onChange={selectAllChange}
				/>
			</Box>
			<Box display="flex" flexGrow="initial" flexWrap="wrap" gap={1}>
				{meetings.map((m, i) => {
					return (
						<Button
							key={i}
							variant="outlined"
							color="primary"
							sx={{ textTransform: 'none', borderRadius: 10 }}
						>
							<Checkbox
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

export function DeleteModal() {
	const [open, setOpen] = React.useState<boolean>(false)
	return (
		<React.Fragment>
			<Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
				Open modal
			</Button>
			<Modal
				aria-labelledby="modal-title"
				aria-describedby="modal-desc"
				open={open}
				onClose={() => setOpen(false)}
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			>
				<Sheet
					variant="outlined"
					sx={{
						maxWidth: 500,
						borderRadius: 'md',
						p: 3,
						boxShadow: 'lg',
					}}
				>
					<ModalClose variant="plain" sx={{ m: 1 }} />
					<Typography
						component="h2"
						id="modal-title"
						level="h4"
						textColor="inherit"
						fontWeight="lg"
						mb={1}
					>
						This is the modal title
					</Typography>
					<Typography id="modal-desc" textColor="text.tertiary">
						Make sure to use <code>aria-labelledby</code> on the modal dialog
						with an optional <code>aria-describedby</code> attribute.
					</Typography>
				</Sheet>
			</Modal>
		</React.Fragment>
	)
}
