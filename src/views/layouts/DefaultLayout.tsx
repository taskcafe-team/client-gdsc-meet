import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'
import { Box } from '@mui/material'
import Noitification from '../components/NotificationBar'

const LayoutWapper = styled(Box)(
	() => `
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh !important;
  `
)

function DefaultLayout(props: { children?: ReactNode }) {
	return (
		<LayoutWapper>
			<Noitification />
			<Header />
			<Box flex={1}>
				<Box sx={{ flex: 1, display: 'flex', alignItems: 'stretch' }}>
					{props.children}
				</Box>
			</Box>
			<Footer />
		</LayoutWapper>
	)
}
export default DefaultLayout
