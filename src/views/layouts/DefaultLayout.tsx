import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { styled } from 'styled-components'
import { Box, CssBaseline } from '@mui/material'
import Noitification from '../components/NotificationBar'

const LayoutWapper = styled(Box)(
	() => `
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh !important;
  `
)

type DefaultLayoutProps = { children?: ReactNode }

function DefaultLayout(props: DefaultLayoutProps) {
	return (
		<LayoutWapper>
			<CssBaseline />
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
