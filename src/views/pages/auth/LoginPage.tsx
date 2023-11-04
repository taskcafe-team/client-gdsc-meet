import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Stack, Typography } from '@mui/material'
import AuthWrapper from './AuthWrapper'
import LoginForm from './forms/LoginForm'
import { useAppDispatch, useAppSelector } from 'contexts'
import RouterPath from 'views/routes/routesContants'
import { authFetchGoogleLoginVerify } from 'contexts/auth'

export default function LoginPage() {
	const dispatch = useAppDispatch()
	const query = useLocation()
	const loginGoogle = useCallback(async () => {
		const { search } = query
		if (search) dispatch(authFetchGoogleLoginVerify(search))
	}, [])

	useEffect(() => {
		loginGoogle()
	}, [])

	const isLogin = useAppSelector((s) => s.auth.isLogin)

	if (isLogin) return <Navigate to="/" />
	return (
		<AuthWrapper>
			<Box width={1} height={1}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="baseline"
						>
							<Typography variant="h4" fontWeight="bold">
								Login
							</Typography>
							<Link
								to={RouterPath.SINGUP_URL}
								style={{ textDecoration: 'none' }}
							>
								<Typography variant="body1" color="primary">
									Don&apos;t have an account?
								</Typography>
							</Link>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<LoginForm />
					</Grid>
				</Grid>
			</Box>
		</AuthWrapper>
	)
}
