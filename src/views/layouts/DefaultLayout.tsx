import { ReactNode } from 'react'
import Header from './Header'
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

type DefaultLayoutProps = { children?: ReactNode }

function DefaultLayout(props: DefaultLayoutProps) {
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
			<Footer />
		</LayoutWapper>
	)
}
export default DefaultLayout
