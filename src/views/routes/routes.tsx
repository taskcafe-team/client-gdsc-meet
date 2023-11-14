/* eslint-disable import/no-unresolved */
import { ReactNode } from 'react'
import { Routes, Route, type RouteProps } from 'react-router-dom'
import RouterPath from './routesContants'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { CircularProgress } from '@mui/material'

import { userFetchMe } from 'contexts/user'

import DefaultLayout from 'views/layouts/DefaultLayout'
import PublicLayout from 'views/layouts/PublicLayout'
import MeetingLayout from 'views/layouts/MeetingLayout'

const ForgotpasswordPage = lazy(() => import( 'pages/auth/ForgotpasswordPage'))
const ConfirmPage = lazy(() => import('views/pages/auth/ConfirmPage'))
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
export const getPublicLayout = (
	children: ReactNode,
	type: 'full' | 'wrapper' = 'full',
	hidden: 'hidden' | 'full' = 'hidden'
) => (
	<PublicLayout type={type} hidden={hidden}>
		{children}
	</PublicLayout>
)
const getMeetingLayout = (e: ReactNode) => <MeetingLayout>{e}</MeetingLayout>

type CustomRouteProps = RouteProps
const routes: CustomRouteProps[] = [
	{
		path: RouterPath.SINGUP_URL,
		element: getPublicLayout(<SignupPage />,'full'),
		loader: undefined,
	},
	{
		path: RouterPath.LOGIN_URL,
		element: getPublicLayout(<LoginPage />,'full'),
		loader: undefined,
	},
	{
		path: RouterPath.BASE_URL,
		element: getPublicLayout(<HomePage />, 'wrapper'),
		loader: undefined,
	},
	{
		path: RouterPath.CONFIRM_URL,
		element: getPublicLayout(<ConfirmPage/>,'full'),
		loader: undefined,
	},
	{
		path: RouterPath.FORGOT_PASSWORD_URL,
		element: getPublicLayout(<ForgotpasswordPage/>,'wrapper'),
		loader: undefined,
	},
	{
		path: RouterPath.PROFILE_URL,
		element: getPublicLayout(<ProfilePage />,'full','full'),
		loader: undefined,
	},
]

const privateRoutes: CustomRouteProps[] = [
	
	{
		path: RouterPath.MEETING_URL,
		element: getMeetingLayout(<MeetingPage />),
		loader: undefined,
	},
	
]

export const getRoutes = (isLogin: boolean) => {
	const r = new Array<CustomRouteProps>()
	r.push(...routes)
	if (isLogin) r.push(...privateRoutes)
	return r.map((p, i) => <Route key={i} {...p} />)
}

export default function Router() {
	const dispatch = useAppDispatch()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const fetchLoading = useAppSelector((s) => s.user.loading)

	const [loading, setLoading] = useState(true)

	const login = useCallback(async () => {
		dispatch(userFetchMe())
		setLoading(false)
	}, [])

	useEffect(() => {
		login()
	}, [isLogin])

	if (loading || fetchLoading) return <Loading />
	return (
		<Routes>
			{getRoutes(isLogin)}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
