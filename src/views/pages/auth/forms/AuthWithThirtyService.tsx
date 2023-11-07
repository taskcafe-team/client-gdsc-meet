import React from 'react'
import { Button, Stack } from '@mui/material'

import googleIcon from 'assets/static/images/icons/google.svg'
import facebookIcon from 'assets/static/images/icons/facebook.svg'
import twitterIcon from 'assets/static/images/icons/twitter.svg'

interface AuthWithThirtyServiceProps {
	loginBtnLoading: boolean
}

export default function AuthWithThirtyService({
	loginBtnLoading,
}: AuthWithThirtyServiceProps) {
	const googleHandler = async () => {
		window.open(import.meta.env.API_LOGIN_GOOGLE_URL, '_self')
	}

	const twitterHandler = async () => {
		// login || singup
	}

	const facebookHandler = async () => {
		// login || singup
	}

	return (
		<Stack direction="row" spacing={1}>
			<Button
				disabled={loginBtnLoading}
				variant="outlined"
				fullWidth={true}
				startIcon={<img src={googleIcon} alt="G" />}
				onClick={googleHandler}
			>
				Google
			</Button>
			<Button
				disabled={true}
				variant="outlined"
				fullWidth={true}
				startIcon={<img src={facebookIcon} alt="F" />}
				onClick={facebookHandler}
			>
				Facebook
			</Button>
			<Button
				disabled={true}
				variant="outlined"
				fullWidth={true}
				startIcon={<img src={twitterIcon} alt="T" />}
				onClick={twitterHandler}
			>
				Twitter
			</Button>
		</Stack>
	)
}
