import React from 'react'
import {
	Box,
	Container,
	Divider,
	FormControl,
	InputAdornment,
	OutlinedInput,
	Typography,
	styled,
} from '@mui/material'
import CallIcon from '@mui/icons-material/Call'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { noitificationSet } from 'contexts/notification'
import RouterPath from 'views/routes/routesContants'
import Button from 'components/Button'
import online_meeting_illustration from 'assets/static/images/icons/online_meeting_illustration.svg'
import Bg from 'assets/static/images/backgrouds/bg.png'
import Bgtop from 'assets/static/images/backgrouds/HomeLightTl1.svg'
import BgBottom from 'assets/static/images/backgrouds/HomeLightBr.svg'
import BgDarktop from 'assets/static/images/backgrouds/HomeDarkTl1.svg'
import BgDarkBottom from 'assets/static/images/backgrouds/HomeDarkBr.svg'
import MeetingApi, {
	ResponseSuccessDataCreateMeeting,
} from 'api/http-rest/meetingApi'
import { useTheme } from 'next-themes'
import { BiDialpad, BiMeteor } from 'react-icons/bi'
import { listRoom } from 'utils/mockNameRoom'
import { IoMdClose } from 'react-icons/io'

export default function HomePage() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const { theme } = useTheme()
	const [friendLyId, setFriendlyId] = useState('')

	const validationLogin = useCallback(() => {
		if (!isLogin)
			dispatch(noitificationSet({ code: ``, message: 'Please Login' }))

		return isLogin
	}, [dispatch, isLogin])

	const createMeeting = useCallback(async () => {
		if (validationLogin()) {
			const res =
				await MeetingApi.createMeeting<ResponseSuccessDataCreateMeeting>()

			if (res.metadata.status === 200) {
				const data = res.data
				navigate(RouterPath.getPreMeetingPath(data.friendlyId))
			}
		}
	}, [navigate, validationLogin])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validationLogin()) navigate(RouterPath.getPreMeetingPath(friendLyId))
	}

	return (
		<main
			className={`Home h-[100vh] w-full bg-lprimary backdrop-blur-30 relative overflow-hidden max-lg:overflow-auto  max-lg:bg-none ${
				theme === 'light' ? 'max-lg: bg-while' : 'max-lg:bg-black'
			}`}
		>
			<img
				src={Bg}
				alt="background"
				className="max-lg:hidden h-[100vh] object-center opacity-30 absolute left-0 top-0 z-1 max-lg:object-cover"
			></img>

			<img
				src={theme === 'light' ? Bgtop : BgDarktop}
				alt="background"
				className="max-lg:hidden h-[120vh]  max-lg:w-[120%] max-lg:object-right object-center absolute left-[-17%] top-[-3%] z-2"
			></img>

			<img
				src={theme === 'light' ? BgBottom : BgDarkBottom}
				alt="background"
				className="max-lg:hidden h-[100vh] w-[40%] object-center absolute bottom-[-6%] right-[-4%] z-2"
			></img>
			<div className=" mt-[10vh] transition-opacity contianer absolute z-100 top-0 left-0 w-[60%] max-lg:w-full z-3 ">
				<div className="py-[16px] px-[53px] max-sm:py-[20px] max-sm:px-[20px] max-lg:flex max-lg:justify-center max-lg:items-center max-lg:flex-col">
					{/* <Image src={BGMobile} alt="GDSC mobile" className="h-[30vh] hidden max-lg:block"></Image> */}
					<h1 className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]">
						Meetings and video calling for everyone.
					</h1>
					<p className="max-w-[800px] px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
						DTU Meet is a versatile video conferencing and meeting service that
						offers secure and high-quality video calling and collaboration
						features, catering to users across a wide range of devices and
						platforms for a seamless communication experience.
					</p>
					<div className="Home__function flex items-center gap-12 my-26 max-sm:w-full max-sm:flex-col max-sm:items-center max-sm:justify-center">
						<Button
							className="max-md:w-full text-white bg-lprimary"
							onClick={createMeeting}
						>
							<BiMeteor width={30} height={30} fontSize={20} />
							New meeting
						</Button>
						<p>or</p>
						<div className="Connect  transition-colors border-none max-sm:flex-col max-sm:w-full max-sm:items-start flex items-center gap-2  border dark:border-none  px-2 py-2 rounded-md">
							<div 
							className="Connect__Group flex items-center max-sm:w-full bg-lprimary dark:bg-gray-80  rounded-md "
							>
								<div className="p-6">
									<BiDialpad className="block text-20 text-white" />
								</div>
								<input
									//   value={nameRoom}
									//   onChange={(e) => setNameRoom(e.target.value)}
									type="text"
									placeholder="input tokent"
									className="block  outline-none px-8 py-12 rounded-md max-sm:w-full bg-gray-100 dark:bg-gray-60 bg-gray-10"
								/>
							</div>
							<Button className="max-sm:w-full  bg-lprimary  text-white">
								Join Now
							</Button>
						</div>
					</div>
					{/* <hr className="w-[70%] bg-[#C8C8C8] my-[30px] max-sm:w-full" /> */}
					<h2 className="text-gray-500 text-[20px] font-normal max-sm:text-[18px]">
							<span className="text-gray-80 dark:text-white text-46 mr-2 ">
								Meeting opinions
							</span>
						</h2>
					<div className="rounded-md dark:bg-[#3b3b3b] max-w-[650px] mt-10 p-10 ">
						
						<div className="Tabinfo-room__body flex flex-wrap gap-6 border-gray-300 dark:border-none  p-4 border shadow-sm max-h-[25vh] max-w-[650px] overflow-hidden scroll-auto">
						<div className="Tabinfo-room__item w-[122px] flex  overflow-hidden justify-center gap-2 h-[40px]  ml-4 text-xs  items-center font-bold leading-sm uppercase px-3 py-1 bg-lprimary text-white rounded-full cursor-pointer"><p className="text-xl">Defauft</p></div>
							{listRoom &&
								listRoom.map((item) => (
									<div className="Tabinfo-room__item w-[122px] flex  overflow-hidden justify-center gap-2 h-[40px]  ml-4 text-xs  items-center font-bold leading-sm uppercase px-3 py-1 bg-green-10 text-green-50 rounded-full cursor-pointer">
										<p className="text-xl">{item.lable}</p>
										{/* {submitState.room && <IoMdClose className="text-4xl " />} */}
									</div>
								))}
						</div>
					</div>

				</div>
			</div>
		</main>
	)
}
