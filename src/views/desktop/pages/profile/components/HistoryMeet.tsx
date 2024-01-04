import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ImageErr from 'assets/static/images/backgrouds/Error TV 1.svg'
import {
	AccessTime,
	Close,
	DateRangeOutlined,
	DoNotDisturb,
	JoinFull,
	MeetingRoom,
	Person,
} from '@mui/icons-material'
import {
	MeetingInfo,
	meetingFetchDeleteInstants,
	meetingFetchMyMeetings,
} from 'contexts/meeting'
import { Animate } from 'utils/mockAnimation'
import RouterPath from 'views/routes/routesContants'
import { format, differenceInHours, parseISO } from 'date-fns'
import Tag from 'components/Tag/Tag'
import { Chip } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import {
	MeetingType,
	ResponseMeetingDto,
} from 'api/http-rest/meeting/meetingApiType'
import { Box } from '@mui/joy'

interface IHistoryMeet {
	historys: Array<any>
}

const filterOptions = ['default', MeetingType.PRIVATE, MeetingType.PUBLIC]

const HistoryMeet: React.FC<IHistoryMeet> = ({ ...rest }) => {
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const meetings = useAppSelector((state) => state.meeting.meetings)
	const dispatch = useAppDispatch()

	useLayoutEffect(() => {
		if (isLogin) dispatch(meetingFetchMyMeetings())
	}, [isLogin])

	const [data, setData] = useState<ResponseMeetingDto[]>([]) // Data is not used, consider removing
	const [activeFilter, setActiveFilter] = useState(filterOptions[0])

	const handleRemove = useCallback((id: string) => {
		// Assuming this function will be expanded later
		return [
			{
				key: filterOptions[0],
				label: 'History',
				onClick: async () => {
					await setData(meetings)
					await setActiveFilter(filterOptions[0])
				},
				active: Boolean(filterOptions[0] === activeFilter),
			},
			{
				key: filterOptions[1],
				label: 'Public',
				onClick: async () => {
					await setData(
						meetings.filter((item) =>
							item.type == filterOptions[1] ? item : null
						)
					)
					await setActiveFilter(filterOptions[1])
				},
				active: Boolean(filterOptions[1] === activeFilter),
			},
			{
				key: filterOptions[2],
				label: filterOptions[2],
				onClick: async () => {
					await setData(
						meetings.filter((item) =>
							item.type == filterOptions[2] ? item : null
						)
					)
					await setActiveFilter(filterOptions[2])
				},
				active: Boolean(filterOptions[1] === activeFilter),
			},
		]
	}, [])

	useLayoutEffect(() => {
		dispatch(meetingFetchMyMeetings())
	}, [dispatch])

	const filters = useMemo(() => {
		return filterOptions.map((filterOption) => ({
			label: filterOption,
			onClick: () => setActiveFilter(filterOption),
		}))
	}, [])

	return (
		<div className="HistoryMeet">
			<Box
				className="HistoryMeet__body p-10 flex gap-6 flex-wrap w-full max-h-[80vh] overflow-y-auto"
				sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
			>
				{meetings.length != 0 ? (
					meetings.map((meeting, index) => (
						<Meeting history={meeting} key={`Meeting_${index}`} />
					))
				) : (
					<NoHistoryMessage />
				)}
			</Box>
		</div>
	)
}
const Meeting = ({ history, ...rest }) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const currentDate = new Date()
	const startTime = parseISO(history.startTime)
	const endTime = history.endTime ? parseISO(history.endTime) : null
	const formattedStart = format(startTime, 'HH:mm:ss')
	const formattedEnd = endTime ? format(endTime, 'HH:mm:ss') : ''
	const formattedDate = format(startTime, 'dd-MM-yyyy')
	const hoursDifference = endTime ? differenceInHours(endTime, startTime) : null
	const shouldRenderOpenChip =
		!endTime || parseISO(history.endTime.trim()) > currentDate

	const handleJoinMeeting = useCallback((meetingId: string) => {
		return navigate(`/${RouterPath.getPreMeetingPath(meetingId)}`)
	}, [])

	const handleRemoveMeeting = useCallback((meetingId: string) => {
		return dispatch(meetingFetchDeleteInstants([meetingId])).then(() =>
			dispatch(meetingFetchMyMeetings())
		)
	}, [])

	return (
		<motion.div
			{...rest}
			{...Animate.getAnimationValues('opacity', 1000)}
			className="card group w-[49%] max-sm:w-full  h-[200px] border-2 border-solid border-gray-20 rounded-2xl overflow-hidden"
		>
			<div className="card__header flex items-center justify-between gap-4  bg-green-10 text-green-50 p-10 w-full text-22 font-bold">
				<div className="max-w-[80%]">{history.title}</div>
				<div className="flex items-center gap-8 justify-end ">
					<div
						className=""
						onClick={() => handleJoinMeeting(history?.id || '')}
					>
						<Chip
							sx={{
								height: 'auto',
								color: '#2870EA',
								background: 'white',
								cursor: 'pointer',
								'& > .MuiSvgIcon-root': {
									color: '#2870EA',
								},
								'& .MuiChip-label': {
									display: 'block',
									fontSize: '14px',
									whiteSpace: 'normal',
									transition: 'all',
								},
								'&:hover': {
									background: 'rgba(255, 255, 255, 1)',
									color: '#20B845',
									transition: 'all',
									'& > .MuiSvgIcon-root': {
										color: '#20B845',
									},
								},
							}}
							label="Open"
							icon={<MeetingRoom className="text-12" />}
						/>
					</div>
					<div
						className=""
						onClick={() => handleRemoveMeeting(history?.id || '')}
					>
						<Chip
							sx={{
								height: 'auto',
								color: '#D70015',
								background: 'white',
								cursor: 'pointer',
								'& > .MuiSvgIcon-root': {
									color: '#D70015',
								},
								'& .MuiChip-label': {
									display: 'block',
									whiteSpace: 'normal',
									transition: 'all',
									fontSize: '14px',
								},
								'&:hover': {
									background: 'rgba(255, 255, 255, 1)',
									color: '#20B845',
									transition: 'all',
									'& > .MuiSvgIcon-root': {
										color: '#20B845',
									},
								},
							}}
							label="Close"
							icon={<DoNotDisturb />}
						/>
					</div>
				</div>
			</div>
			{/* ... other parts of your component */}
			<div className="card__body flex flex-col justify-between flex-1 px-20 py-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
				<div className="">
					<p className="line-clamp-2">
						{' '}
						{`- ${history.description ? history.description : 'No content'}`}
					</p>
				</div>
				<div className="flex flex-row justify-between gap-4 mt-auto absolute bottom-0 left-0 right-0 p-6 bg-gray-10 dark:bg-gray-80 dark:text-gray-70 text-gray-700 dark:bg-gray-800 ">
					<div className="flex gap-2 items-center">
						<DateRangeOutlined />
						{formattedDate}
					</div>
					<div className="flex items-center gap-4">
						<AccessTime />
						<span>{formattedStart}</span>
						<span>{endTime && ' - '}</span>
						<span>{formattedEnd}</span>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
const NoHistoryMessage = React.memo(() => (
	<motion.div
		{...Animate.getAnimationValues('opacity', 1000)}
		className="flex overflow-hidden  items-center justify-center flex-col m-14 w-full h-[55vh] rounded-md"
	>
		<img src={ImageErr} alt="" />
		<Link
			to={'/'}
			className="text-16 text-center block my-14 rounded-sm border-b-2 text-gray-70  w-full dark:text-white"
		>
			No history available.
			<span className="text-primary font-bold "> Meeting now</span>
		</Link>
	</motion.div>
))
HistoryMeet.propTypes = {
	historys: PropTypes.array.isRequired,
}

export default HistoryMeet
