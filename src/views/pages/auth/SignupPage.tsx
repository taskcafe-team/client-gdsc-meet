import { Grid, Stack, Typography, Box } from '@mui/material'
import React from 'react'
import RouterPath from 'views/routes/routesContants'
import AuthWrapper from './AuthWrapper'
import LoginForm from './forms/LoginForm'

export default function SignupPage() {
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
							<Link to={RouterPath.BASE_URL} style={{ textDecoration: 'none' }}>
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
