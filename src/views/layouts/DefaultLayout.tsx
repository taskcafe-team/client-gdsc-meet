import { ReactNode } from 'react'
import Footer from './Footer'
import { styled } from 'styled-components'
import { Box } from '@mui/material'
import Header from 'views/components/Header'

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
