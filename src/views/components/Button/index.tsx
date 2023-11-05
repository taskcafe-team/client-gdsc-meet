import React, { ReactNode, ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	icon?: ReactNode
	title?: string
	loading?: boolean
	className?: string
}

const Button: React.FC<IButton> = ({
	children,
	className,
	loading = false,
	...rest
}) => {
	return (
		<button
			className={`flex items-center justify-center rounded-md gap-2
        hover:opacity-90
        px-10 py-8 font-bold text-20 cursor-pointer
        relative
        ${className ? className : ''}`}
			{...rest}
		>
			{children}
			<div className="absolute right-6">
				{loading ? (
					<svg
						className=" animate-spin h-16 w-16  mr-3 bg-white text-transparent rounded-md"
						viewBox="0 0 24 24"
					></svg>
				) : null}
			</div>
		</button>
	)
}

Button.propTypes = {}

export default Button
