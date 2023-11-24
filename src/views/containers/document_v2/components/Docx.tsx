import PropTypes from 'prop-types'

interface IDocx {
	src: string
}

const DocX = ({ src, ...rest }: IDocx) => {
	return (
		<iframe
			className="w-full mt-[12vh]"
			src={src}
			{...rest}
			style={{ minHeight: '87vh', width: '100%', border: 0 }}
		/>
	)
}


export default DocX
