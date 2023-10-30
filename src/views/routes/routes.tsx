import { ReactNode, lazy } from 'react'
import { Route, type RouteProps } from 'react-router-dom'
import { AUTH_LOGIN_URL, BASE_URL } from './routesContants'
import NotificationBar from 'views/components/NotificationBar'

const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'))

const HomePage = lazy(() => import('../pages/home/HomePage'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage'))

const getDefaultLayout = (e: ReactNode) => <DefaultLayout>{e}</DefaultLayout>
const blackLayout = (e: ReactNode) => (
	<React.Fragment>
		<NotificationBar /> {e}
	</React.Fragment>
)

type CustomRouteProps = RouteProps

const routes: CustomRouteProps[] = [
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
