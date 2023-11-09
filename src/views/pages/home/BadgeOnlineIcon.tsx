import React from 'react'
import Badge, { badgeClasses } from '@mui/joy/Badge'

export default function BadgeOnlineIcon({ children }) {
	return (
		<Badge
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			badgeInset="14%"
			color="success"
			sx={{
				[`& .${badgeClasses.badge}`]: {
					'&::after': {
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						borderRadius: '50%',
						animation: 'ripple 1.2s infinite ease-in-out',
						border: '2px solid',
						borderColor: 'success.500',
						content: '""',
					},
				},
				'@keyframes ripple': {
					'0%': {
						transform: 'scale(1)',
						opacity: 1,
					},
					'100%': {
						transform: 'scale(2)',
						opacity: 0,
					},
				},
			}}
		>
			{children}
		</Badge>
	)
}
