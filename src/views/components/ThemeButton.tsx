import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'next-themes'
import { BiSun, BiMoon } from 'react-icons/bi'
import bgLight from 'assets/static/images/backgrouds/Land Switch - Light.svg'
import bgDark from 'assets/static/images/backgrouds/DarkbgButton.svg'

const ThemeButton: React.FC = () => {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	const handleModel = async () => {
		if (theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}

	return (
		<div
			className={`relative Header__item relative group px-2 py-1 transition-all rounded-md cursor-pointer min-w-[68px] max-w-[68px]`}
			onClick={() => handleModel()}
		>
			<div className="dark:hidden Header__item__icon flex justify-center items-center group text-black hover:text-white dark:text-while dark:hover:text-black rounded-md cursor-pointer transition-all">
				<img src={bgLight} alt="light" />
			</div>

			<div className="dark:flex hidden Header__item__icon group justify-center items-center transition-all rounded-md cursor-pointer">
				<img src={bgDark} alt="dark" />
			</div>

			<div
				className={`transition-all h-24 w-24 absolute top-[50%] translate-y-[-50%] rounded-full ${
					theme === 'light'
						? 'left-[8px] bg-white z-10 '
						: 'translate-x-[35px] bg-white z-10'
				}`}
			></div>
		</div>
	)
}

ThemeButton.propTypes = {}

export default ThemeButton
