import React from 'react'
import PropTypes from 'prop-types'

const BgL1 = ({ ...rest }) => {
	return (
		<svg
			width="918"
			height="950"
			viewBox="0 0 918 950"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className='object-cover'
		>
			<g filter="url(#filter0_d_283_532)">
				<path
					d="M250.969 57.6699C196.481 -15.3006 76.1243 59.7604 22.757 87.5083L22.7571 912.008L879.426 915.518C874.15 857.538 851.597 733.452 803.597 700.951C743.598 660.325 647.955 730.301 578.446 593.016C508.938 455.731 570.299 469.648 514.647 390.643C458.995 311.638 369.095 389.306 321.5 337.875C273.904 286.444 319.08 148.883 250.969 57.6699Z"
					fill="#473AED"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_283_532"
					x="0.756836"
					y="0.665527"
					width="916.67"
					height="948.853"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="8" dy="4" />
					<feGaussianBlur stdDeviation="15" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_283_532"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_283_532"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	)
}

BgL1.propTypes = {}

export default BgL1
