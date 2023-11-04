import React, { useState } from 'react'
import {
	BiQuestionMark,
	BiMessageAltError,
	BiAlignRight,
	BiChevronLeft,
	BiFile,
} from 'react-icons/bi'
import { IoMdPerson, IoMdSettings } from 'react-icons/io'
import Logo from 'assets/static/images/icons/meet.svg'
import CurrentTime from './_components/CurrentTime'
import ThemeButton from 'components/ThemeButton' // Assuming ThemeButton is a separate component.

import { useSelector } from 'react-redux' // Import the appropriate Redux hook for your setup.
// Assuming you have a Redux store configuration.

// import Avatar from '@assets/images/bg-t1.png';
import { authDetail, authLoading } from 'contexts/auth/authSelector'
import { Link } from 'react-router-dom'
import { useTheme } from 'next-themes'

interface HeaderProps {
	type?: string
	className?: string
}

const Header: React.FC<HeaderProps> = ({ type, className, ...rest }) => {
	const [triggerToggle, setTriggerToggle] = useState(false)
	const { theme } = useTheme()

	// Replace the following Redux selectors with your actual selectors from Redux.
	const isLogin = useSelector(authLoading)
	const UDetail = useSelector(authDetail)

	return (
		<header
			className={`px-[53px] py-[16px] flex  items-center justify-between ${className} max-sm:py-[10px] max-sm:px-[10px]`}
			{...rest}
		>
			{/*  Desktop  */}
			<Link to="/">
				<div className="flex items-center gap-2">
					<img
						src={Logo}
						alt="DTUMeet"
						className="w-[75px] h-[75px] object-fill  max-lg:w-[45px] max-lg:h-[45px]"
					/>
					<h1 className="text-gray-70  opacity-100 text-[45px] max-lg:text-24 font-bold">
						GDSC Meet
					</h1>
				</div>
			</Link>
			<nav className="flex items-center gap-10 max-lg:hidden">
				<CurrentTime />
				<div className="text-gray-70 font-roboto text-24  font-normal">
					<ThemeButton />
				</div>
				<div className="text-gray-70 font-roboto text-24 font-normal dark:text-white transition">
					<a href="/Question">
						<BiFile />
					</a>
				</div>

				<div className="text-gray-70 font-roboto text-24  font-normal dark:text-white transition">
					{isLogin ? (
						<a href="/profile">
							{/* <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={UDetail?.avatar ? UDetail?.avatar : Avatar} alt="Bordered avatar" /> */}
						</a>
					) : (
						<a href="/auth/login">
							<IoMdPerson />
						</a>
					)}
				</div>
			</nav>
			{/* Mobile */}
			<div
				className="text-cltext hidden max-lg:block"
				onClick={() => setTriggerToggle(!triggerToggle)}
			>
				<BiAlignRight className="text-34 text-gray-70 " />
			</div>
			<div
				onClick={() => setTriggerToggle(!triggerToggle)}
				className={`text-gray-80 dark:text-white w-full opacity-90 fixed left-0 right-0 top-0 bottom-0 z-[100] transition-opacity ${
					triggerToggle === true ? 'opacity-1 block' : 'opacity-0 hidden'
				}`}
			></div>
			<nav
				className={`w-[230px] h-[100vh]  z-[101]
          	fixed  right-0 top-0 bottom-0 z-100
        rounded-md
        flex flex-col 
        p-10
        gap-10
        transition-transform
		drop-shadow-md
        ${theme === 'light' ? 'bg-white' : 'bg-[#000]'}
        ${triggerToggle === true ? 'translate-x-[0%]' : 'translate-x-[120%]'}
        `}
				onClick={() => setTriggerToggle(!triggerToggle)}
			>
				<div className="flex items-center rounded-lg gap-4">
					<div
						className="text-white  bg-lprimary rounded-md text-20 flex items-center justify-center"
						onClick={() => setTriggerToggle(!triggerToggle)}
					>
						<BiChevronLeft className="text-32 font-bold" />
					</div>
					<h1 className="text-gray-70 dark:text-while text-28 opacity-100 text-[30px] max-w-lg:text-[15px] font-bold">
						Gdsc meet
					</h1>
				</div>
				<div className="flex flex-col p-4 gap-6">
					<div className=" flex gap-4">
						<Link to="/signIn" className="flex gap-3 items-center">
							<div className="w-[30px] max-w-[30px]">
								<img
									src={Logo}
									alt="DTUMeet"
									className="w-[25px] h-[25px] object-fill  max-w-lg:w-[45px] max-w-lg:h-[45px]"
								/>
							</div>
							<p className="text-gray-70  text-24  dark:text-gray-20 transition font-bold">
								Go home
							</p>
						</Link>
					</div>
					<div className=" flex gap-6">
						<Link to="/signIn" className="flex gap-3 items-center">
							<IoMdPerson className="text-22 w-[30px] max-w-[30px]" />
							<p className="text-gray-70  text-24  dark:text-gray-20 transition font-bold">
								Login now
							</p>
						</Link>
					</div>
					<div className=" flex gap-6">
						<Link to="/signIn" className="flex gap-3 items-center">
							<IoMdPerson className="text-22 w-[30px] max-w-[30px]" />
							<p className="text-gray-70  text-24  dark:text-gray-20 transition font-bold">
								Resiter
							</p>
						</Link>
					</div>
					<div className=" flex gap-6">
						<Link to="/signIn" className="flex gap-3 items-center">
							<BiFile className="text-22 w-[30px] max-w-[30px]" />
							<p className="text-gray-70  text-24  dark:text-gray-20 transition font-bold">
								File
							</p>
						</Link>
					</div>
					<div className=" flex gap-6">
						<ThemeButton />
						<div className="">
							<p className="text-gray-70  text-24  dark:text-gray-20 transition font-bold">
								{theme}
							</p>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}

Header.propTypes = {} // Remove PropTypes as they are not used in a TypeScript component.

export default Header
