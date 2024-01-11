import React from 'react'
import CallIcon from '@mui/icons-material/Call'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import online_meeting_illustration from 'assets/static/images/icons/online_meeting_illustration.svg'
import useToastily from 'hooks/useToastily'
import CreateMeetingFormDialog from './CreateMeetingFormDialog'
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
import Bg from 'assets/static/images/backgrouds/bg.png'
import Bgtop from 'assets/static/images/backgrouds/HomeLightTl1.svg'
import BgBottom from 'assets/static/images/backgrouds/HomeLightBr.svg'
import BgDarktop from 'assets/static/images/backgrouds/HomeDarkTl1.svg'
import BgDarkBottom from 'assets/static/images/backgrouds/HomeDarkBr.svg'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { BiDialpad, BiMeteor } from 'react-icons/bi'
import ListMeeting from 'views/containers/home/ListMeeting'
import SocketIOManager from 'contexts/keywords/socket'

export const DEFAUFT = 'Defauft'

export default function HomePage() {
	const [openCreateMeetingForm, setOpenCreateMeetingForm] = useState(false)
	const toast = useToastily()
	const navigate = useNavigate()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const { theme } = useTheme()
	const [meetingId, setMeetingId] = useState('')
	const [opinion, setOpinion] = useState(DEFAUFT)
	const user = useAppSelector(s=>s.user.id)
	console.log(user);
	
	const validationLogin = useCallback(() => {
		if (!isLogin) toast({ content: 'Please login!', type: 'warning' })
		return isLogin
	}, [isLogin])

	const hanldeSubmitJoinMeeting = useCallback(() => {
		if (validationLogin() && meetingId)
			navigate(RouterPath.getPreMeetingPath(meetingId))
	}, [meetingId])

	

	return (
		<Box>
			<CreateMeetingFormDialog
				opinion={opinion}
				open={openCreateMeetingForm}
				setOpen={setOpenCreateMeetingForm}
			/>
			<main
				className={`Home h-[100vh] w-full bg-lprimary backdrop-blur-30 relative  max-2xl:overflow-auto max-2xl:overflow-x-hidden  max-lg:bg-none ${
					theme === 'light' ? 'max-lg: bg-while' : 'max-lg:bg-black'
				}`}
			>
				<motion.ul
					className="container max-lg:hidden"
					variants={container}
					initial="hidden"
					animate="visible"
				>
					<motion.li className="item" variants={item}>
						<motion.div
							whileHover={{ scale: 0.6 }}
							whileTap={{
								opacity: 0.8,

								borderRadius: '100%',
							}}
						>
							<img
								src={Bg}
								alt="background"
								className="select-none max-lg:hidden h-[100vh] object-fill opacity-30 absolute left-0 top-0 z-1 max-lg:object-cover"
							></img>
						</motion.div>
					</motion.li>
				</motion.ul>
				<img
					src={theme === 'light' ? Bgtop : BgDarktop}
					alt="background"
					className="select-none max-lg:hidden h-[130vh] max-2xl:w-[123vw] max-2xl:h-[160vh]  max-2xl:max-w-[200%]  object-contain object-left-top absolute left-[-17%] top-[-5%] z-2"
				></img>

				<img
					src={theme === 'light' ? BgBottom : BgDarkBottom}
					alt="background"
					className="select-none max-2xl:hidden h-[100vh] w-[40%] object-contain object-right-bottom absolute bottom-[-6%] right-[-4%] z-2"
				></img>
				<div className=" mt-[10vh] max-sm:mt-[5vh] transition-opacity contianer absolute z-100 top-0 left-0 w-[60%] max-2xl:w-[80%] max-lg:w-full  z-3 ">
					<div className="py-[16px] px-[53px] max-sm:py-[20px] max-sm:px-[20px] max-lg:flex max-lg:justify-center max-lg:items-center max-lg:flex-col">
						<motion.div
							initial={{ opacity: 0, translateY: '20%' }}
							animate={{ opacity: 1, translateY: '0%' }}
							transition={{
								type: 'keyframes',
								stiffness: 260,
								damping: 60,
							}}
						>
							<Typography
								level="h1"
								className="mb-4 select-none max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px] dark:text-white "
							>
								Meetings and video calling for everyone.
							</Typography>
							<p className="select-none max-w-[800px] max-lg:max-w-[600px] max-sm:hidden px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
								GDSC Meet is a versatile video conferencing and meeting service
								that offers secure and high-quality video calling and
								collaboration features, catering to users across a wide range of
								devices and platforms for a seamless communication experience.
							</p>
							<img
								src={online_meeting_illustration}
								alt=""
								className="w-[20vh] hidden max-sm:block mx-auto"
							/>
							<div className="Home__function flex items-center gap-12 my-26 max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center">
								<Button
									className="max-md:w-full !p-10 !text-[20px] text-white bg-lprimary"
									onClick={() =>
										validationLogin() &&
										setOpenCreateMeetingForm(!openCreateMeetingForm)
									}
								>
									<BiMeteor width={30} height={30} fontSize={20} />
									New meeting
								</Button>
								<p>or</p>
								<div className="Connect  transition-colors border-none max-sm:flex-col max-sm:w-full max-sm:items-start flex items-center gap-2  border dark:border-none  px-2 py-2 rounded-md">
									<div className="Connect__Group flex items-center max-sm:w-full bg-lprimary dark:bg-gray-80  rounded-md ">
										<div className="p-6">
											<BiDialpad className="block text-20 text-white" />
										</div>
										<input
											value={meetingId}
											onChange={(e) => setMeetingId(e.target.value)}
											type="text"
											maxLength={12}
											placeholder="xxx-xxx-xxx"
											className="block  outline-none px-8 py-12 rounded-md max-sm:w-full bg-gray-100 dark:bg-gray-60 bg-gray-10"
										/>
									</div>
									<Button
										className="!p-10 !text-[20px] max-sm:w-full    bg-lprimary  text-white"
										onClick={hanldeSubmitJoinMeeting}
									>
										Join Now
									</Button>
								</div>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, translateY: '20%' }}
							animate={{ opacity: 1, translateY: '0%' }}
							transition={{
								type: 'keyframes',
								stiffness: 260,
								damping: 80,
							}}
						>
							<ListMeeting />
						</motion.div>
					</div>
				</div>
			</main>
		</Box>
	)
}

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
}
const item = {
	hidden: { y: '-100%', opacity: 0, scale: 0 },
	visible: {
		y: '-20%',
		x: '+10%',
		opacity: 1,
		scale: 1,
	},
}
