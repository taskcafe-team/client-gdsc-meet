import '@livekit/components-styles'
import { LocalUserChoices, PreJoin } from '@livekit/components-react'
import { Sheet, Stack } from '@mui/joy'
import { useAppSelector } from 'contexts/hooks'
import { useMeeting } from 'views/containers/meeting/MeetingContext'
import { generateName } from 'utils/personalNameUtils'
import { removeLocalStorageItem } from 'utils/localStorageUtils'
import WaitingRoom from './WaitingRoom'

export default function PreJoinRoom() {
	const navigate = useNavigate()
	const user = useAppSelector((s) => s.user)
	const { connectRoom } = useMeeting()

	const [connecting, setConnecting] = useState(false)
	const [connected, setConnected] = useState(false)
	const [showWaitingRoom, setShowWaitingRoom] = useState(false)
	const fullname = useMemo(() => {
		const name = (user.firstName ?? '') + ' ' + (user.lastName ?? '')
		return name.trim().length > 0 ? name.trim() : generateName()
	}, [user.firstName, user.lastName])

	const handleSubmitJoin = async (values: LocalUserChoices) => {
		if (connecting) return
		setConnecting(true)

		const username = values.username ?? fullname
		await connectRoom(username)
			.then(() => setShowWaitingRoom(true))
			.then(() => setConnected(true))
			.catch(() => navigate('/'))
			.finally(() => setConnecting(false))
	}

	useCallback(() => {
		return () => {
			removeLocalStorageItem('lk-user-choices')
		}
	}, [])

	return (
		<Stack
			width={1}
			height={1}
			p={1}
			justifyContent="center"
			alignItems="center"
		>
			<Stack
				borderRadius="md"
				overflow="hidden"
				justifyContent="center"
				alignItems="stretch"
				direction={{ xs: 'column', md: 'row' }}
				height={{ xs: 'auto' }}
			>
				<Sheet
					variant="soft"
					sx={{
						width: { xs: 'auto', sm: 500 },
						'& .lk-prejoin input.lk-form-control': {
							'pointer-events': connected || connecting ? 'none' : 'auto',
						},
						'& .lk-prejoin button': {
							'pointer-events': connected || connecting ? 'none' : 'auto',
						},
					}}
				>
					<PreJoin
						onSubmit={handleSubmitJoin}
						data-lk-theme="default"
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						defaults={{ username: fullname }}
					/>
				</Sheet>
				{showWaitingRoom && <WaitingRoom />}
			</Stack>
		</Stack>
	)
}
