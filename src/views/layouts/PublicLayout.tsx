import { ReactNode } from 'react'
import Header from 'components/Header'
import Footer from './Footer'
import { styled } from 'styled-components'
import { Box, Container, CssBaseline } from '@mui/material'
import Noitification from '../components/NotificationBar'

const LayoutWapper = styled(Box)(
	() => `
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `
)

type PublicLayoutProps = { children?: ReactNode }

function PublicLayout(props: PublicLayoutProps) {
	return (
		<LayoutWapper>
			<Noitification />
			<Header />
			<Box flex={1} display="flex" alignItems="stretch">
				<Box flex={1}>
					<Box width="1" height="1">
						{props.children}
					</Box>
				</Box>
			</Box>
		</LayoutWapper>
	)
}
export default PublicLayout
