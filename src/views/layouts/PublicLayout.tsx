import { ReactNode } from 'react'
import { styled } from 'styled-components'
import { Box } from '@mui/material'
import Header from './Header_v2'

const LayoutWapper = styled(Box)(
	() => `
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `
)

type PublicLayoutProps = { children?: ReactNode; type?: 'full' | 'wrapper' }

function PublicLayout({ children, type }: PublicLayoutProps) {
	return (
		<LayoutWapper className="max-h-[100vh] overflow-hidden max-lg:overflow-auto">
			<Header />
			<Box flex={1} display="flex" alignItems="stretch">
				<Box flex={1}>
					<Box width="1" height="1">
						{children}
					</Box>
				</Box>
			</Box>
			{/* <Notification/> */}
		</LayoutWapper>
	)
}
export default PublicLayout
