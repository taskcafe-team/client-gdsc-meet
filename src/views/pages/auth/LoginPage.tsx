import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Stack, Typography } from '@mui/material'
import AuthWrapper from './AuthWrapper'
import LoginForm from './forms/LoginForm'
import { useAppDispatch, useAppSelector } from 'contexts'
import RouterPath from 'views/routes/routesContants'
import { authFetchGoogleLoginVerify } from 'contexts/auth'
import { ResponseLoginSuccess } from 'api/http-rest'
import { ApiResponse } from 'api/apiResponses'
import useToastily from 'hooks/useToastily'

export default function LoginPage() {
	const toast = useToastily()
	const dispatch = useAppDispatch()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const query = useLocation()

	useLayoutEffect(() => {
		const { search } = query
		if (search.match('google'))
			dispatch(authFetchGoogleLoginVerify(search))
				.then((res) => {
					const payload = res.payload as ApiResponse<ResponseLoginSuccess>
					if (payload.metadata.success) {
					} else throw new Error(payload.metadata.message)
				})
				.catch((err) =>
					toast({ content: err.message || 'Something wrong!', type: 'error' })
				)
	}, [])

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
