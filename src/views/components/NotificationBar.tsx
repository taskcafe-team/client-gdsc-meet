import { useAppSelector } from 'contexts'
import React, { useLayoutEffect } from 'react'
import { ToastContainer, ToastOptions, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastProps {
	content: string
	type?: 'info' | 'success' | 'warning' | 'error'
}

const toastConfig: ToastOptions = {
	position: 'bottom-left',
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	style: { width: '230px' },
}

const showToast = ({ content, type = 'success' }: ToastProps) => {
	const toastType = toast[type] || toast.success
	toastType(content, toastConfig)
}

export default function NotificationBar() {
	const noitifiactionState = useAppSelector((s) => s.noitificatioin)
	useLayoutEffect(() => {
		if (!noitifiactionState.timestamp) return
		const code = noitifiactionState.code
		let type: ToastProps['type'] = 'info'

		if (`${code}` !== '200') type = 'error'
		if (`${code}` === '200') type = 'success'

		showToast({ content: noitifiactionState.message, type })
	}, [noitifiactionState])

	return (
		<React.Fragment>
			<ToastContainer />
		</React.Fragment>
	)
}
