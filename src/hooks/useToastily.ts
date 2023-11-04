import { useTheme } from 'next-themes'
import { toast, ToastOptions } from 'react-toastify'

interface ToastProps {
	content: string
	type?: 'success' | 'warning' | 'error'
}

const useToastily = () => {
	const { theme } = useTheme()
	const toastConfig: ToastOptions = {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: theme == 'light' ? 'light' : 'dark',
	}

	const showToast = ({ content, type = 'success' }: ToastProps) => {
		const toastType = toast[type] || toast.success
		toastType(content, toastConfig)
	}

	return showToast
}

export default useToastily
