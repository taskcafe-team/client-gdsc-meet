import { ReactNode } from 'react'
import { type RouteProps } from 'react-router-dom'
import RouterPath from './routesContants'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { CircularProgress } from '@mui/joy'

import { userFetchMe } from 'contexts/user'

import DefaultLayout from 'views/layouts/DefaultLayout'
import MeetingLayout from 'views/layouts/MeetingLayout'
import { getLocalStorageItem } from 'utils/localStorageUtils'

const ConfirmPage = lazy(() => import('views/pages/auth/ConfirmPage'))
const HomePage = lazy(() => import('views/pages/home/HomePage'))
const LoginPage = lazy(() => import('views/pages/auth/LoginPage_v2'))
const SignupPage = lazy(() => import('views/pages/auth/SignupPage_v2'))
const MeetingPage = lazy(() => import('views/pages/meeting/MeetingPage'))
const ProfilePage = lazy(() => import('views/pages/profile/ProfilePage_v2'))

export const Loading = () => (
	<div
		style={{
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<CircularProgress />
	</div>
)

export const LayoutLoading = () => (
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

const getDefaultLayout = (e: ReactNode) => <DefaultLayout>{e}</DefaultLayout>
const getMeetingLayout = (e: ReactNode) => <MeetingLayout>{e}</MeetingLayout>

type CustomRouteProps = RouteProps

const routes: CustomRouteProps[] = [
	{
		path: RouterPath.SINGUP_URL,
		element: <SignupPage />,
		loader: undefined,
	},
	{
		path: RouterPath.LOGIN_URL,
		element: <LoginPage />,
		loader: undefined,
	},
	{
		path: RouterPath.BASE_URL,
		element: getDefaultLayout(<HomePage />),
		loader: undefined,
	},
]

const privateRoutes: CustomRouteProps[] = [
	{
		path: RouterPath.PROFILE_URL,
		element: getDefaultLayout(<ProfilePage />),
		loader: undefined,
	},
	{
		path: RouterPath.MEETING_URL,
		element: getMeetingLayout(<MeetingPage />),
		loader: undefined,
	},
	{
		path: RouterPath.CONFIRM_URL,
		element: getDefaultLayout(<ConfirmPage />),
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

	const [loading, setLoading] = useState(true)

	const getMe = useCallback(async () => {
		const key = import.meta.env.API_KEY_STORE_ACCESS_TOKEN
		const token = getLocalStorageItem(key)
		if (!token) return setLoading(false)
		dispatch(userFetchMe()).finally(() => setLoading(false))
	}, [dispatch])

	useEffect(() => {
		getMe()
	}, [getMe, isLogin])

	if (loading) return <LayoutLoading />
	return (
		<Routes>
			{getRoutes(isLogin)}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
