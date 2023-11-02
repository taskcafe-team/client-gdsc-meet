/* eslint-disable import/no-unresolved */
import { ReactNode, lazy } from 'react'
import { Routes, Route, type RouteProps } from 'react-router-dom'
import RouterPath from './routesContants'
import {
	getLocalStorageItem,
	setLocalStorageItem,
} from 'utils/localStorageUtils'
import { AuthApi } from 'api/http-rest'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { authLoginSuccess } from 'contexts/auth'
import UserApi, { ResponseSuccessDataGetMe } from 'api/http-rest/userApi'

const NotificationBar = lazy(() => import('views/components/NotificationBar'))
const SignupPage = lazy(() => import('views/pages/auth/SignupPage'))
const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'))

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

type CustomRouteProps = RouteProps

const routes: CustomRouteProps[] = [
	{
		path: RouterPath.MEETING_URL,
		element: getDefaultLayout(<MeetingPage />),
		loader: undefined,
	},
	{
		path: RouterPath.SINGUP_URL,
		element: blackLayout(<SignupPage />),
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

	const login = useCallback(async () => {
		const accessToken = getLocalStorageItem('access_token')
		if (!accessToken) return
		// const res = await AuthApi.verifyAccessToken(accessToken)

		const body = {
			email: 'dangnhatminh@gmail.com',
			password: '123456',
		}
		const res = await UserApi.getMe()
		const { status } = res.metadata
		if (`${status}` == '200') {
			const data = res.data as ResponseSuccessDataGetMe
			console.log(data)
			dispatch(authLoginSuccess())
			return
		}
	}, [])

	useLayoutEffect(() => {
		login()
	}, [])

	return <Routes>{getRoutes(isLogin)}</Routes>
}
