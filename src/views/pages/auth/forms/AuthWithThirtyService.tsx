import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery, Button, Stack } from '@mui/material'

// assets
// import Google from "../../../../assets/images/icons/google.svg";
// import Twitter from "../../../../assets/images/icons/twitter.svg";
// import Facebook from "../../../../assets/images/icons/facebook.svg";

export default function AuthWithThirtyService() {
	const theme = useTheme()
	const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))

	const googleHandler = async () => {
		// login || singup
	}

	const twitterHandler = async () => {
		// login || singup
	}

	const facebookHandler = async () => {
		// login || singup
	}

	return (
		<Stack
			direction="row"
			spacing={matchDownSM ? 1 : 3}
			justifyContent={matchDownSM ? 'space-around' : 'space-between'}
		>
			<Button
				size={matchDownSM ? 'small' : 'medium'}
				variant="outlined"
				color="secondary"
				fullWidth={!matchDownSM}
				// startIcon={<img src={Google} alt="Google" />}
				onClick={googleHandler}
			>
				Google
			</Button>
			<Button
				size={matchDownSM ? 'small' : 'medium'}
				variant="outlined"
				color="secondary"
				fullWidth={!matchDownSM}
				// startIcon={<img src={Twitter} alt="Twitter" />}
				onClick={twitterHandler}
			>
				Twitter
			</Button>
			<Button
				size={matchDownSM ? 'small' : 'medium'}
				variant="outlined"
				color="secondary"
				fullWidth={!matchDownSM}
				// startIcon={<img src={Facebook} alt="Facebook" />}
				onClick={facebookHandler}
			>
				Facebook
			</Button>
		</Stack>
	)
}
