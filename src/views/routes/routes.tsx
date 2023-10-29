import { ReactNode, lazy } from 'react'
import { Route, type RouteProps } from 'react-router-dom'
import { AUTH_LOGIN_URL, BASE_URL } from './routesContants'

const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'))

const HomePage = lazy(() => import('../pages/home/HomePage'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage'))

const getDefaultLayout = (e: ReactNode) => <DefaultLayout>{e}</DefaultLayout>

type CustomRouteProps = RouteProps
const routes: CustomRouteProps[] = [
	{
		path: AUTH_LOGIN_URL,
		element: getDefaultLayout(<LoginPage />),
		loader: undefined,
	},
	{
		path: BASE_URL,
		element: getDefaultLayout(<HomePage />),
		loader: undefined,
		Component: HomePage,
	},
]

export const getRoutes = (role?: string) => {
	const r = new Array<CustomRouteProps>()
	r.push(...routes)

	return r.map((p, i) => <Route key={i} {...p} />)
}
