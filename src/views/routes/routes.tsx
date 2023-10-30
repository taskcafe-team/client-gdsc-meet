import { ReactNode, lazy } from 'react'
import { Route, type RouteProps } from 'react-router-dom'
import {
	AUTH_LOGIN_URL,
	AUTH_SIGNUP_URL,
	BASE_URL,
	PRE_MEETING_URL,
} from './routesContants'
import PreMeeting from 'pages/pre-meeting/PreMeeting'

const NotificationBar = lazy(() => import('views/components/NotificationBar'))
const SignupPage = lazy(() => import('views/pages/auth/SignupPage'))
const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'))

const HomePage = lazy(() => import('../pages/home/HomePage'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage'))

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
		path: PRE_MEETING_URL,
		element: getDefaultLayout(
			<PreMeeting title={undefined} subheader={undefined} chart={undefined} />
		),
		loader: undefined,
	},
	{
		path: AUTH_SIGNUP_URL,
		element: blackLayout(<SignupPage />),
		loader: undefined,
	},
	{
		path: AUTH_LOGIN_URL,
		element: blackLayout(<LoginPage />),
		loader: undefined,
	},
	{
		path: BASE_URL,
		element: getDefaultLayout(<HomePage />),
		loader: undefined,
	},
]

export const getRoutes = () => {
	const r = new Array<CustomRouteProps>()
	r.push(...routes)
	return r.map((p, i) => <Route key={i} {...p} />)
}
