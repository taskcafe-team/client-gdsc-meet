/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		colors: {
			primary: {
				10: '#FFEFE5',
				40: '#FFC198',
				70: '#FF8332',
				200: '#D95500',
				300: '#B34600',
				DEFAULT: '#1B4AEF',
			},
			white: '#FFFFFF',
			borderElement: '#D1D1D6',
			black: '#000',
			gray: {
				80: '#1C1C1E',
				70: '#5f6368',
				60: '#3A3A3C',
				40: '#636366',
				30: '#AEAEB2',
				20: '#D1D1D6',
				10: '#F2F2F7',
			},
			yellow: {
				50: '#FFE680',
				10: '#FFF0B3',
				DEFAULT: '#FFD326',
			},
			green: {
				50: '#30DA5B',
				10: '#CEFDD5',
				DEFAULT: '#20B845',
			},
			red: {
				50: '#FF6961',
				10: '#FFAAA6',
				DEFAULT: '#D70015',
			},
			purple: {
				50: '#DA8EFF',
				10: '#E6CDFD',
				DEFAULT: '#8943AB',
			},
			blue: '#3872DD',
		}, // colors

		fontSize: {
			10: ['10px', { lineHeight: '1.5' }],
			12: ['12px', { lineHeight: '1.5' }],
			14: ['14px', { lineHeight: '1.5' }],
			16: ['16px', { lineHeight: '1.5' }],
			18: ['18px', { lineHeight: '29px' }],
			20: ['20px', { lineHeight: '1.5' }],
			22: ['22px', { lineHeight: '36px' }],
			24: ['24px', { lineHeight: '1.5' }],
			28: ['28px', { lineHeight: '45px' }],
			32: ['32px', { lineHeight: '52px' }],
			34: ['34px', { lineHeight: '1.5' }],
			36: ['36px', { lineHeight: '1.5' }],
			40: ['40px', { lineHeight: '1.5' }],
			42: ['42px', { lineHeight: '1.5' }],
			46: ['46px', { lineHeight: '1.5' }],
			48: ['48px', { lineHeight: '1.5' }],
		}, // fontSize

		boxShadow: {
			'02030': '0px 20px 30px rgba(0, 0, 0, 0.1)',
			2420: '2px 4px 20px rgba(0, 0, 0, 0.2)',
		}, // boxShadow

		spacing: {
			0: '0px',
			2: '2px',
			4: '4px',
			6: '6px',
			8: '8px',
			10: '10px',
			12: '12px',
			14: '14px',
			16: '16px',
			18: '18px',
			20: '20px',
			22: '22px',
			24: '24px',
			26: '26px',
			28: '28px',
			30: '30px',
			32: '32px',
			34: '34px',
			36: '36px',
			38: '38px',
			40: '40px',
			42: '42px',
			44: '44px',
			46: '46px',
			48: '48px',
			50: '50px',
			52: '52px',
			54: '54px',
			56: '56px',
			58: '58px',
			60: '60px',
			62: '62px',
			64: '64px',
			66: '66px',
			68: '68px',
			70: '70px',
			72: '72px',
			74: '74px',
			76: '76px',
			78: '78px',
			80: '80px',
		}, // spacing
		fontWeight: {
			regular: 400,
			semibold: 600,
			bold: 700,
			normal: 'normal',
		},
		fontFamily: {
			'nunito-sans': ['Nunito Sans', 'Roboto', 'Helvetica Neue', 'sans-serif'],

			'svn-poppins': ['SVN-Poppins', 'Roboto', 'Helvetica Neue', 'sans-serif'],

			fas: 'Fontawesome 6 Pro',
		}, // fontFamily

		fontStyle: {
			normal: 'normal',
			italic: 'italic',
		}, // fontStyle

		extend: {
			lineHeight: {
				29: '29px',
				36: '36px',
				45: '45px',
				52: '52px',
			},

			flexBasis: {
				45: '45%',
			},
			backgroundImage: {
				lprimary: 'linear-gradient(130deg, #2870EA 20%, #1B4AEF 77.5%)',
			},
		},
	},
	plugins: [],
}
