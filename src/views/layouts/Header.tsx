import { useNavigate } from 'react-router-dom'
import React from 'react'
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
	Tooltip,
	MenuItem,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import MenuIcon from '@mui/icons-material/Menu'
import GroupsIcon from '@mui/icons-material/Groups'

import { useAppDispatch, useAppSelector } from '../../contexts/hooks'
import RouterPath from '../routes/routesContants'
import { authLogout } from 'contexts/auth'
import { Button } from '@mui/joy'

const pages: string[] = []
const settings = ['Profile', 'Logout']

export const Logo = () => (
	<React.Fragment>
		<GroupsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
		<Typography
			href="/"
			variant="h6"
			noWrap
			component="a"
			sx={{
				mr: 2,
				display: { xs: 'none', md: 'flex' },
				fontFamily: 'monospace',
				fontWeight: 700,
				letterSpacing: '.3rem',
				color: 'inherit',
				textDecoration: 'none',
			}}
		>
			GDSC MEET
		</Typography>
	</React.Fragment>
)

function Header() {
	const navigate = useNavigate()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const user = useAppSelector((s) => s.user)
	const dispatch = useAppDispatch()

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>()
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>()

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorElNav(event.currentTarget)
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorElUser(event.currentTarget)
	const handleCloseNavMenu = () => setAnchorElNav(null)

	const handleLoginClick = () => navigate(RouterPath.LOGIN_URL)
	const handleClickUserMenu = (setting: string) => {
		setAnchorElUser(null)
		if (setting === 'Logout') dispatch(authLogout())
		if (setting === 'Profile') navigate(`/${RouterPath.PROFILE_URL}`)
	}

	return (
		<AppBar position="static" color="default" elevation={0}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Logo />
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							keepMounted
							transformOrigin={{ vertical: 'top', horizontal: 'left' }}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>
					<GroupsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						GDSC MEET
					</Typography>
					<Box sx={{ flexGrow: 0 }}>
						{isLogin ? (
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt={user.firstName || ''} src={user.avatar || ''} />
								</IconButton>
							</Tooltip>
						) : (
							<Button variant="outlined" onClick={handleLoginClick}>
								Login
							</Button>
						)}

						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							keepMounted
							anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
							transformOrigin={{ vertical: 'top', horizontal: 'right' }}
							open={Boolean(anchorElUser)}
							onClose={() => setAnchorElUser(null)}
						>
							{isLogin &&
								settings.map((setting) => (
									<MenuItem
										key={setting}
										onClick={(e) => handleClickUserMenu(setting)}
									>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default Header
