import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export default function AuthCard({ children }: { children: ReactNode }) {
	return (
		<Box sx={{ maxWidth: { xs: 400 }, margin: { xs: 3 } }}>
			<Box>{children}</Box>
		</Box>
	)
}

AuthCard.propTypes = {
	children: PropTypes.node,
}
