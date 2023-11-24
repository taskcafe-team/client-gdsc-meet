import React, { useState } from 'react'
import {
	BiQuestionMark,
	BiMessageAltError,
	BiAlignRight,
	BiChevronLeft,
	BiFile,
	BiLogOut,
	BiCloset,
} from 'react-icons/bi'
import { saveAs } from 'file-saver'
import {
	IoIosClose,
	IoMdPerson,
	IoMdPersonAdd,
	IoMdSettings,
} from 'react-icons/io'
import Logo from 'assets/static/images/icons/meet.svg'
import CurrentTime from './_components/CurrentTime'
// Assuming ThemeButton is a separate component.

import { useDispatch, useSelector } from 'react-redux' // Import the appropriate Redux hook for your setup.
// Assuming you have a Redux store configuration.

import Avatar from 'assets/static/images/backgrouds/Saly-1.svg'
import { authDetail, authLoading } from 'contexts/auth/authSelector'
import { Link } from 'react-router-dom'
import { useTheme } from 'next-themes'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { authLogout } from 'contexts/auth'
import RouterPath from 'views/routes/routesContants'
import { BlindsClosedTwoTone, CloudDownloadOutlined, Person } from '@mui/icons-material'
import Button from 'components/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

interface HeaderProps {
	type?: 'full' | 'wrapper'
	className?: string
	handleFileChange: any
	file?:any
}

const Header: React.FC<HeaderProps> = ({
	type = 'full',
	className,
	handleFileChange,
	file,
	...rest
}) => {
	const [triggerToggle, setTriggerToggle] = useState(false)
	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	// Replace the following Redux selectors with your actual selectors from Redux.
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const UDetail = useAppSelector((s) => s.user)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}
	const withSize = useMemo(() => {
		return type == 'wrapper' ? 'w-[65%] max-2xl:w-full' : null
	}, [type])

	const logout = () => {
		dispatch(authLogout())
	}

	const downloadToPDF = () => {
		if (file) {
			const blob = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
			saveAs(blob, 'document.docx');
		}
	  };
	return (
		<header
			className={`fixed max-2xl:bg-white dark:max-2xl:bg-gray-80 z-50 top-0 left-0 right-0 bg-transparent px-[53px] py-[16px] flex  items-center justify-between ${className} max-sm:py-[10px] max-sm:px-[10px] ${withSize} `}
			{...rest}
		>
			{/*  Desktop  */}
			<Link to="/">
				<div className="flex items-center gap-2">
					<img
						src={Logo}
						alt="DTUMeet"
						className="w-[55px] h-[55px] object-fill  max-lg:w-[45px] max-lg:h-[45px]"
					/>
					<h1 className="text-gray-70  opacity-100 text-24  font-bold">
						GDSC Meet
					</h1>
				</div>
			</Link>
			<nav className="flex items-center gap-10 max-lg:hidden">
				<div className="flex gap-4 flex-row-reverse">
					<Button
						className="block border-none  rounded-sm p-2 mr-2 cursor-pointer"
						onClick={handleButtonClick}
					>
						<CloudUploadIcon
							fontSize="large"
							className="text-primary text-40"
						/>
					</Button>

					<Button
						className="block border-none  rounded-sm p-2 mr-2 cursor-pointer"
						onClick={downloadToPDF}
					>
						<CloudDownloadOutlined
							fontSize="large"
							className="text-primary text-40"
						/>
					</Button>
					<input
						ref={fileInputRef}
						className="hidden"
						type="file"
						accept=".docx"
						onChange={handleFileChange}
					/>
				</div>
				<CurrentTime />
			</nav>
			{/* Mobile */}
			<div className=" hidden max-lg:flex gap-4 items-center">
				{isLogin && (
					<img
						className="w-30 h-30 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
						src={UDetail?.avatar ? UDetail?.avatar : Avatar}
						alt="Bordered avatar"
					/>
				)}
				<div
					className="text-cltext hidden max-lg:block"
					onClick={() => setTriggerToggle(!triggerToggle)}
				>
					<BiAlignRight className="text-34 text-gray-70 " />
				</div>
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
				<div className="flex items-center justify-between rounded-lg gap-4">
					<div
						className="text-gray-70 dark:text-while rounded-md text-48 flex items-center justify-center"
						onClick={() => setTriggerToggle(!triggerToggle)}
					>
						<IoIosClose className="text-48 font-bold" />
					</div>
					<h2 className="text-gray-70 dark:text-while text-28 opacity-100   font-bold">
						Menu
					</h2>
				</div>
				{isLogin ? (
					<div className="flex flex-col p-4 gap-6">
						<div className=" flex gap-6">
							<Link
								to={RouterPath.PROFILE_URL}
								className="flex gap-3 items-center text-gray-70 dark:text-gray-20"
							>
								<IoMdPerson className="text-18 w-[30px] max-w-[30px]" />
								<p className=" text-18 transition font-bold">Profile</p>
							</Link>
						</div>
						<div className=" flex gap-6">
							<Link
								to={`/file`}
								className="flex gap-3 items-center text-gray-70 dark:text-gray-20"
							>
								<BiFile className="text-22 w-[30px] max-w-[30px]" />
								<p className=" text-18 transition font-bold">File</p>
							</Link>
						</div>
						<div className=" flex gap-6">
							<div
								onClick={logout}
								className="flex gap-3 items-center text-gray-70 dark:text-gray-20"
							>
								<BiLogOut className="text-22 w-[30px] max-w-[30px]" />
								<p className=" text-18 transition font-bold">Logout</p>
							</div>
						</div>
					</div>
				) : (
					<div className="flex flex-col p-4 gap-6">
						<div className=" flex gap-6">
							<Link
								to={RouterPath.LOGIN_URL}
								className="flex gap-3 items-center text-gray-70 dark:text-gray-20"
							>
								<IoMdPerson className="text-18 w-[30px] max-w-[30px]" />
								<p className=" text-18 transition font-bold">Login now</p>
							</Link>
						</div>
						<div className=" flex gap-6">
							<Link
								to={RouterPath.SINGUP_URL}
								className="flex gap-3 items-center text-gray-70 dark:text-gray-20"
							>
								<IoMdPersonAdd className="text-22 w-[30px] max-w-[30px]" />
								<p className=" text-18 transition font-bold">Resiter</p>
							</Link>
						</div>
						<div className=" flex gap-6">
							<Link
								to={`/file`}
								className="flex gap-3 items-center text-gray-70 dark:text-gray-20"
							>
								<BiFile className="text-22 w-[30px] max-w-[30px]" />
								<p className=" text-18 transition font-bold">File</p>
							</Link>
						</div>
					</div>
				)}
			</nav>
		</header>
	)
}

Header.propTypes = {} // Remove PropTypes as they are not used in a TypeScript component.

export default Header
