import React from 'react'

type PropsType = {
	children:
		| string
		| number
		| boolean
		| React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
		| Iterable<React.ReactNode>
		| React.ReactPortal
		| null
		| undefined
}

const VerticalLayout = (props: PropsType) => {
	return <React.Fragment>{props.children}</React.Fragment>
}
export default VerticalLayout
