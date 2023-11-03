/* eslint-disable import/no-unresolved */
import { ReactNode, lazy } from 'react'
import { Routes, Route, type RouteProps } from 'react-router-dom'
import RouterPath from './routesContants'
import { getLocalStorageItem } from 'utils/localStorageUtils'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { authLoginSuccess } from 'contexts/auth'
import UserApi, { ResponseSuccessDataGetMe } from 'api/http-rest/userApi'
import { Loading } from 'app'

const NotificationBar = lazy(() => import('views/components/NotificationBar'))
const SignupPage = lazy(() => import('views/pages/auth/SignupPage'))
const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'))
const PublicLayout = lazy(() => import('../layouts/PublicLayout'))

const HomePage = lazy(() => import('../pages/home/HomePage'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage'))
const MeetingPage = lazy(() => import('../pages/meeting/MeetingPage'))

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
]

const privateRoutes: CustomRouteProps[] = []

export const getRoutes = (isLogin: boolean) => {
	const r = new Array<CustomRouteProps>()
	if (isLogin) r.push(...privateRoutes)
	r.push(...routes)
	return r.map((p, i) => <Route key={i} {...p} />)
}

export default function Router() {
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const dispatch = useAppDispatch()

	const [isLoading, setIsLoading] = useState(false)

	const login = useCallback(async () => {
		const accessToken = getLocalStorageItem('access_token')
		if (!accessToken) return
		// const res = await AuthApi.verifyAccessToken(accessToken)

		const res = await UserApi.getMe()
		setIsLoading(false)
		const { status } = res.metadata
		if (`${status}` == '200') {
			// const data = res.data as ResponseSuccessDataGetMe
			dispatch(authLoginSuccess())
		}
	}, [])

	useLayoutEffect(() => {
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
