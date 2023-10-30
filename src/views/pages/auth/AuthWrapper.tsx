import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid } from '@mui/material'
import { Logo } from 'views/layouts/Header'

export default function AuthWrapper({ children }: { children: ReactNode }) {
	return (
		<Grid
			width={1}
			height={1}
			container
			direction="column"
			justifyContent="flex-end"
		>
			<Grid item xs={12}>
				<Box px="48px" py="12px" display="flex" alignItems="center">
					<Logo />
				</Box>
			</Grid>
			<Grid item xs={12} px={{ xs: '22px', md: '0' }}>
				<Grid
					item
					xs={12}
					container
					justifyContent="center"
					alignItems="center"
					sx={{ minHeight: { xs: '500px' } }}
				>
					<Grid item>
						<Box sx={{ maxWidth: { xs: 400 } }}>
							<Box>{children}</Box>
						</Box>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} sx={{ m: 3, mt: 1 }}></Grid>
		</Grid>
	)
}

AuthWrapper.propTypes = {
	children: PropTypes.node,
}
