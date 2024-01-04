import * as React from 'react'
import {
	Box,
	Button,
	Dropdown,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
} from '@mui/joy'
import Typography from '@mui/joy/Typography'
import Avatar from '@mui/joy/Avatar'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import RouterPath from 'views/routes/routesContants'
import { authLogout } from 'contexts/auth'
import Logo from 'assets/static/images/icons/meet.svg'
import GroupsIcon from '@mui/icons-material/Groups'
import { useTheme } from 'next-themes'

export default function Header() {
	const dispatch = useAppDispatch()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const user = useAppSelector((s) => s.user)
	const [triggerToggle, setTriggerToggle] = useState(false)
	const { theme } = useTheme()
	const fullname = useMemo(() => {
		const f = user.firstName ?? ''
		const l = user.lastName ?? ''
		const n = (f + ' ' + l).trim()
		return n.length > 0 ? n : 'unknown'
	}, [user])

	const navigate = useNavigate()
	const handleLoginClick = () => navigate(RouterPath.LOGIN_URL)

	const handleClickUserMenu = (setting: string) => {
		if (setting === 'logout') dispatch(authLogout())
		if (setting === 'profile') navigate(`/${RouterPath.PROFILE_URL}`)
	}

	return (
		<Box
			mx="auto"
			maxWidth="lg"
			className=""
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
				top: 0,
				px: 1.5,
				py: 1,
				borderBottom: '1px solid',
				borderColor: 'divider',
				position: 'sticky',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					gap: 1.5,
				}}
			>
				<Box onClick={() => navigate('/')}>
					<img
						src={Logo}
						alt="DTUMeet"
						className="w-[35px] h-[35px] object-fill  max-lg:w-[45px] max-lg:h-[45px] "
					/>
				</Box>
				<Typography component="h1" fontWeight="xl">
					GDSC MEET
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				{!isLogin ? (
					<Button variant="outlined" onClick={handleLoginClick}>
						Login
					</Button>
				) : (
					<Dropdown>
						<MenuButton
							slots={{ root: IconButton }}
							slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
							sx={{
								borderRadius: 40,
								gap: 1,
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Avatar variant="outlined" size="sm" src={user.avatar ?? ''} />
							<Box sx={{ minWidth: 0, flex: 1 }}>
								<Typography level="title-sm">{fullname}</Typography>
								<Typography level="body-xs">{user.email}</Typography>
							</Box>
						</MenuButton>
						<Menu>
							<MenuItem onClick={() => handleClickUserMenu('profile')}>
								Profile
							</MenuItem>
							<MenuItem onClick={() => handleClickUserMenu('logout')}>
								Logout
							</MenuItem>
						</Menu>
					</Dropdown>
				)}
			</Box>
		</Box>
	)
}
