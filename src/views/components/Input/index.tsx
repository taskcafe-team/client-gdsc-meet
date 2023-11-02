import React, { ReactNode } from 'react'

import { BiDialpad } from 'react-icons/bi'
interface IInput {
	id?: string
	value: any
	onChange?: any
	icon?: ReactNode
	type?: string
	placeholder?: string
	className?: string
	onBlur?: any
	disabled?: boolean
}

export const Input: React.FC<IInput> = ({
	className,
	placeholder,
	id,
	value,
	onChange,
	icon,
	type,
	onBlur,
	disabled,
	...rest
}) => {
	return (
		<div className={`flex items-center max-sm:w-full ${className}`}>
			{icon && <div className="mx-8">{icon}</div>}
			<input
				id={id}
				value={value}
				onChange={onChange}
				type={type ? type : 'text'}
				placeholder={placeholder}
				className="block outline-none px-6 py-10 w-full max-sm:w-full border-b-2 border-gray-20"
				onBlur={onBlur}
				disabled={disabled}
				{...rest}
			/>
		</div>
	)
}
