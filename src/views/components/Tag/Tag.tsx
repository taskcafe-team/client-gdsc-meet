import React, { useState } from 'react'
type ITag = {
	label: string
	active?: boolean
}

export default function Tag({ label, active, ...rest }) {
	return (
		<div className="Tag" {...rest}>
			<div
				className={`Tabinfo-room__item w-max transition-all flex justify-center gap-2 h-[40px] ml-4 text-xs items-center font-bold leading-sm uppercase px-10 py-1 rounded-full cursor-pointer ${
					active ? 'bg-lprimary text-white' : 'bg-green-10 text-green-50'
				}`}
			>
				<p className="text-xl">{label}</p>
			</div>
		</div>
	)
}
