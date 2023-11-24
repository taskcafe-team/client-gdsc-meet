import { ReactNode, useMemo } from 'react'
import Header from 'components/Header'
import { styled } from 'styled-components'
import { Box } from '@mui/material'

const LayoutWrapper = styled(Box)(
	() => `
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `
)

export type PublicLayoutProps = {
	children?: ReactNode
	type?: 'full' | 'wrapper'
	hidden?: 'hidden' | 'full'
}

function PublicLayout({ children, type, hidden }: PublicLayoutProps) {
	const typeHidden = useMemo(
		() => (hidden === 'full' ? 'overflow-auto' : 'overflow-hidden'),
		[hidden]
	)

	return (
		<div className={`max-h-[100vh] ${typeHidden} max-2xl:overflow-auto`}>
			<Header type={type} />
			<div>{children}</div>
		</div>
	)
}

export default PublicLayout
