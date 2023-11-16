import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
import { MeetingInfo } from 'contexts/meeting'
import { Animate } from 'utils/mockAnimation'
import RouterPath from 'views/routes/routesContants'
import { format, differenceInHours, parseISO } from 'date-fns'
import Tag from 'components/Tag/Tag'
import { Chip } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IHistoryMeet {
	historys: Array<any>
}

const HistoryMeet: React.FC<IHistoryMeet> = ({ historys, ...rest }) => {
	const hasHistory = Boolean(historys.length)
	const [currentDate] = useState(new Date())
	const [items, setItems] = useState(historys.slice(0, 10))
	const [hasMore, setHasMore] = useState(true)

	const handleRemove = useCallback((id: string) => {
		return ''
	}, [])

	const handleJoinMeeting = useCallback(() => {}, [])
	

	return (
		<div className="HistoryMeet">
			<div className="HistoryMeet__body  p-10 flex gap-6 flex-wrap w-full max-h-[80vh]  overflow-y-scroll max-sm:max-h-none max-sm:overflow-y-auto">
				{hasHistory ? (
					historys.map((history, index) => {
						const startTime = parseISO(history.startTime)
						const endTime = parseISO(history.endTime as string)

						const formattedStart = format(startTime, 'HH:mm:ss')
						const formattedEnd = format(endTime, 'HH:mm:ss')
						const formattedDate = format(startTime, 'dd-MM-yyyy')
						const hoursDifference = differenceInHours(endTime, startTime)
						const shouldRenderOpenChip =
							parseISO(history.endTime as string) > currentDate
						console.log(index)
						return (
							<motion.div
								{...rest}
								{...Animate.getAnimationValues('opacity', index * 1000)}
								key={index}
								className="card group w-[49%] max-sm:w-full  h-[200px] border-2 border-solid border-gray-20 rounded-2xl overflow-hidden"
							>
								<div className="card__header flex items-center justify-between gap-4  bg-green-10 text-green-50 p-10 w-full text-22 font-bold">
									<div className="max-w-[80%]">{history.title}</div>
									{shouldRenderOpenChip ? (
										<Chip
											sx={{
												height: 'auto',
												color: '#5F54E5',
												background: 'white',
												cursor: 'pointer',
												'& > .MuiSvgIcon-root': {
													color: '#5F54E5', // Thay đổi màu của biểu tượng khi hover
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
									) : (
										<Chip
											sx={{
												height: 'auto',
												color: '#D70015',
												background: 'white',
												cursor: 'pointer',
												'& > .MuiSvgIcon-root': {
													color: '#D70015', // Thay đổi màu của biểu tượng khi hover
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
											onClick={() => handleRemove(history.id)}
										/>
									)}
								</div>
								<div className="card__body flex flex-col justify-between flex-1 px-20 py-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
									<div className="flex items-center gap-4">
										<AccessTime />
										<span>{formattedStart}</span>
										<span>{' - '}</span>
										<span>{formattedEnd}</span>
									</div>
									<div className="">
										<p className="line-clamp-2">{history.description}</p>
									</div>
									<div className="flex flex-col  gap-4 mt-auto absolute bottom-0 left-0 right-0 p-4 bg-gray-10 dark:bg-gray-80 dark:text-gray-70 text-gray-700 dark:bg-gray-800 ">
										<div className="flex gap-2 items-center">
											<DateRangeOutlined />
											{formattedDate}
										</div>
									</div>
								</div>
							</motion.div>
						)
					})
				) : (
					<motion.div
						{...Animate.getAnimationValues('opacity', 1000)}
						className="flex items-center justify-center flex-col m-14 h-[55vh] rounded-md  "
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
				)}
			</div>
		</div>
	)
}

HistoryMeet.propTypes = {
	historys: PropTypes.array.isRequired,
}

export default HistoryMeet
