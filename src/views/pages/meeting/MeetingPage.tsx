import React from 'react'
import { Box } from '@mui/material'
import '@livekit/components-styles'
import { Navigate } from 'react-router-dom'

const PreJoin = lazy(() => import('./PreJoin'))
const MeetingRoom = lazy(() => import('./MeetingRoom'))

import MeetingApi from 'api/http-rest/meetingApi'
import { useAppSelector } from 'contexts/hooks'

type AccessTokenDataResponse = {
	permissions: {
		status: string
	}
	token: string
}

export default function MeetingPage() {
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const [token, setToken] = useState('')

	const { friendlyId } = useParams()

	const getAccessToken = useCallback(async () => {
		if (!friendlyId) return

		const res = await MeetingApi.getAccessToken<AccessTokenDataResponse>(
			friendlyId
		)

		if (res.metadata.status == 200) setToken(res.data.token)
	}, [friendlyId])

	const btnJoinMeetingClick = (isLoading, setIsLoading) => {
		setIsLoading(true)
		getAccessToken().then(() => setIsLoading(false))
	}

	if (!isLogin) return <Navigate to="/" />
	return (
		<Box display="flex" justifyContent="center" alignItems="center" p={5}>
			{token ? <MeetingRoom token={token} /> : ''}
			{!token ? <PreJoin btnJoinMeetingClick={btnJoinMeetingClick} /> : ''}
		</Box>
	)
}
