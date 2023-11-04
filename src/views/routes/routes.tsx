/* eslint-disable import/no-unresolved */
import { ReactNode } from 'react'
import { Routes, Route, type RouteProps } from 'react-router-dom'
import RouterPath from './routesContants'
import { getLocalStorageItem } from 'utils/localStorageUtils'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { CircularProgress } from '@mui/material'
import { fetchCurrentUser } from 'contexts/user'

import DefaultLayout from 'views/layouts/DefaultLayout'
import PublicLayout from 'views/layouts/PublicLayout'

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
const blackLayout = (e: ReactNode) => <React.Fragment>{e}</React.Fragment>
const getPublicLayout = (e: ReactNode) => <PublicLayout>{e}</PublicLayout>
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
		element: getDefaultLayout(<HomePage />),
		loader: undefined,
	},
]

const privateRoutes: CustomRouteProps[] = [
	{
		path: 'profile',
		element: getDefaultLayout(<ProfilePage />),
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
	const param = useParams()
	const query = useLocation()
	const dispatch = useAppDispatch()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const fetchLoading = useAppSelector((s) => s.user.loading)

	const [loading, setLoading] = useState(true)

	const login = useCallback(async () => {
		dispatch(fetchCurrentUser())
		setLoading(false)
	}, [])

	useEffect(() => {
		login()
	}, [])

	if (loading || fetchLoading) return <Loading />
	return (
		<Routes>
			{getRoutes(isLogin)}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
