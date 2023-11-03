/* eslint-disable import/no-unresolved */
import { ReactNode } from 'react'
import { Routes, Route, type RouteProps } from 'react-router-dom'
import RouterPath from './routesContants'
import { getLocalStorageItem } from 'utils/localStorageUtils'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { authLoginSuccess } from 'contexts/auth'
import UserApi from 'api/http-rest/userApi'
import { CircularProgress } from '@mui/material'
import { UserInfo, userDetailData } from 'contexts/user'

import DefaultLayout from 'views/layouts/DefaultLayout'
import PublicLayout from 'views/layouts/PublicLayout'
import NotificationBar from 'components/NotificationBar'
// import NotificationBar from 'components/NotificationBar'

const SignupPage = lazy(() => import('views/pages/auth/SignupPage'))
const HomePage = lazy(() => import('views/pages/home/HomePage'))
const LoginPage = lazy(() => import('views/pages/auth/LoginPage'))
const MeetingPage = lazy(() => import('views/pages/meeting/MeetingPage'))
const ProfilePage = lazy(() => import('views/pages/profile/ProfilePage'))

export const Loading = () => {
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress />
		</div>
	)
}

const getDefaultLayout = (e: ReactNode) => <DefaultLayout>{e}</DefaultLayout>

const blackLayout = (e: ReactNode) => (
	<React.Fragment>
		<NotificationBar />
		{e}
	</React.Fragment>
)
const getPublicLayout = (e: ReactNode, type: 'full' | 'wrapper' = 'full') => <PublicLayout type={type}>{e}</PublicLayout>


type CustomRouteProps = RouteProps

const routes: CustomRouteProps[] = [
	{
		path: RouterPath.MEETING_URL,
		element: getDefaultLayout(<MeetingPage />),
		loader: undefined,
	},
	{
		path: RouterPath.SINGUP_URL,
		element: getPublicLayout(<SignupPage />),
		loader: undefined,
	},
	{
		path: RouterPath.LOGIN_URL,
		element: blackLayout(<LoginPage />),
		loader: undefined,
	},
	{
		path: RouterPath.BASE_URL,
		element: getPublicLayout(<HomePage />,'wrapper'),
		loader: undefined,
	},
	{
		path: 'profile',
		element: getDefaultLayout(<ProfilePage />),
		loader: undefined,
	},
]

const privateRoutes: CustomRouteProps[] = []

export const getRoutes = (isLogin: boolean) => {
	const r = new Array<CustomRouteProps>()
	r.push(...routes)
	if (isLogin) r.push(...privateRoutes)
	return r.map((p, i) => <Route key={i} {...p} />)
}

export default function Router() {
	const dispatch = useAppDispatch()
	const isLogin = useAppSelector((s) => s.auth.isLogin)

	const [isLoading, setIsLoading] = useState(true)

	const login = useCallback(async () => {
		try{
			const accessToken = getLocalStorageItem('access_token')
			if (!accessToken) return
			else {
				const res = await UserApi.getMe()
				const { status } = res.metadata
				if (`${status}` == '200') {
					if (res.data.avatar)
						res.data.avatar =
							'http://localhost:5000/users/avatar/' + res.data.avatar
	
					dispatch(userDetailData(res.data as UserInfo))
					dispatch(authLoginSuccess())
				}
			}
		}finally{
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		login()
	}, [])
	if (isLoading) return <Loading />
	return (
		<Routes>
			{getRoutes(isLogin)}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
