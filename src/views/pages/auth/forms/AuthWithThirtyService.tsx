import React from 'react'
import { Button, Stack } from '@mui/material'

interface AuthWithThirtyServiceProps {
	loginBtnLoading: boolean
}

export default function AuthWithThirtyService({
	loginBtnLoading,
}: AuthWithThirtyServiceProps) {
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
		<Stack direction="row" spacing={1}>
			<Button
				disabled={loginBtnLoading}
				variant="outlined"
				fullWidth={true}
				startIcon={<img src="../images/icons/google.svg" alt="F" />}
				onClick={googleHandler}
			>
				Google
			</Button>
			<Button
				disabled={loginBtnLoading}
				variant="outlined"
				fullWidth={true}
				startIcon={<img src="../images/icons/facebook.svg" alt="F" />}
				onClick={twitterHandler}
			>
				Facebook
			</Button>
			<Button
				disabled={loginBtnLoading}
				variant="outlined"
				fullWidth={true}
				startIcon={<img src="../images/icons/twitter.svg" alt="F" />}
				onClick={facebookHandler}
			>
				Twitter
			</Button>
		</Stack>
	)
}
