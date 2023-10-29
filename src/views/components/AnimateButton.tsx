import * as React from 'react'

// third-party
import { motion } from 'framer-motion'

interface AnimateButtonProps {
	children: React.ReactNode
	type: 'slide' | 'scale' | 'rotate'
}

export default function AnimateButton({ children, type }: AnimateButtonProps) {
	switch (type) {
		case 'rotate':
		case 'slide':
		case 'scale':
		default:
			return (
				<motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
					{children}
				</motion.div>
			)
	}
}

AnimateButton.defaultProps = {
	type: 'scale',
}
