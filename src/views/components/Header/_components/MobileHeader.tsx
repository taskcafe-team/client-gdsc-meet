import React, { useRef } from 'react'
import { BiCog, BiMenuAltRight, BiQuestionMark, BiX } from 'react-icons/bi'
import ThemeBox from './ThemeBox'
import UserBox from './UserBox'

const MOBILE_HEADER_WIDTH = '300px'
const MOBILE_HEADER_BG_COLOR = 'bg-white'
const MOBILE_HEADER_TEXT_COLOR = 'text-gray-500'

const MobileHeader = () => {
	const refHeader = useRef<null | HTMLParagraphElement>(null)

	const handleToggle = () => {
		const current = refHeader.current
		current?.classList.toggle('header--active')
	}

	const renderHeaderItem = (label: string, icon: JSX.Element) => (
		<div
			className="Header__item flex items-center px-4 py-2 hover:text-white gap-2 group hover:bg-black dark:hover:bg-white transition-all rounded-md cursor-pointer"
			onClick={handleToggle}
		>
			<span className="min-w-[65px]">{label}</span>
			{icon}
		</div>
	)

	return (
		<div className="hidden max-sm:block">
			<nav
				ref={refHeader}
				className={`Header__mobile hidden header--active shadow max-sm:flex flex-col dark:bg-black p-8 fixed right-0 top-0 bottom-0 z-888 ${MOBILE_HEADER_BG_COLOR} w-[${MOBILE_HEADER_WIDTH}] h-[100vh]`}
			>
				<BiX
					onClick={handleToggle}
					width={30}
					height={30}
					className="mx-4 my-2 block text-6xl text-gray-500"
				/>
				<div className="Header__user flex flex-col items-start border-black px-1 h-max">
					<div className="flex items-center px-4 py-2">
						<span className="min-w-[50px]">Model</span>
						<ThemeBox />
					</div>
					<div className="flex items-center px-4 py-2" onClick={handleToggle}>
						<span className="min-w-[65px]">User</span>
						<UserBox />
					</div>
				</div>
				<hr />
				<div className="Header__tool flex flex-col items-start px-1">
					{renderHeaderItem(
						'Question',
						<BiQuestionMark className="dark:text-white dark:group-hover:text-black text-black group-hover:text-white block transition-all" />
					)}
					{renderHeaderItem(
						'Config',
						<BiCog className="dark:text-white dark:group-hover:text-black text-black group-hover:text-white block transition-all" />
					)}
				</div>
			</nav>
			<div>
				<BiMenuAltRight
					width={30}
					onClick={handleToggle}
					className="dark:text-white dark:group-hover:text-black text-black group-hover:text-white block transition-all"
				/>
			</div>
		</div>
	)
}

export default MobileHeader
