import React from 'react'
import AuthWrapper from './AuthWrapper'
import { Box, Grid, Stack, Typography } from '@mui/material'
import LoginForm from './forms/LoginForm'
import { useAppSelector } from 'contexts'
import { Navigation } from '@mui/icons-material'
import { HOME_URL } from 'views/routes/routesContants'

export default function LoginPage() {
	const isLogin = useAppSelector((s) => s.auth.isLogin)

	if (isLogin) return <Navigation to={HOME_URL} />
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
							<Typography variant="h4" style={{ fontWeight: 'bold' }}>
								Login
							</Typography>
							<Typography
								variant="body1"
								sx={{ textDecoration: 'none' }}
								color="primary"
							>
								Don&apos;t have an account?
							</Typography>
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
