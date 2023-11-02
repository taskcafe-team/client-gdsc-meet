import React, { useEffect, useState, useCallback, useMemo } from 'react'
import moment from 'moment'

const CurrentTime: React.FC = (props) => {
	const [currentTime, setCurrentTime] = useState(moment())

	const updateCurrentTime = useCallback(() => {
		setCurrentTime(moment())
	}, [])

	useEffect(() => {
		const interval = setInterval(updateCurrentTime, 1000)

		return () => clearInterval(interval)
	}, [updateCurrentTime])

	const formattedTime = useMemo(
		() => currentTime.format('HH:mm ddd, DD MMM'),
		[currentTime]
	)

	return (
		<div className="text-gray-70 font-roboto text-24 font-normal dark:text-white transition">
			{formattedTime}
		</div>
	)
}

export default CurrentTime
