import { ReactNode } from 'react'
import { type RouteProps } from 'react-router-dom'
import RouterPath from './routesContants'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { CircularProgress } from '@mui/joy'

import { userFetchMe } from 'contexts/user'

import DefaultLayout from 'views/layouts/DefaultLayout'
import MeetingLayout from 'views/layouts/MeetingLayout'
import PublicLayout from 'views/layouts/PublicLayout'
import { isMobile } from 'utils/mobileDetection'
import useIsMobile from 'hooks/useIsMobile'
const ForgotpasswordPage = lazy(
	() => import('views/desktop/pages/forgotpassword/ForgotpasswordPage')
)
const ResetPasswordPage = lazy(
	() => import('views/desktop/pages/resetPassword/ResetPasswordPage')
)
const ConfirmPage = lazy(() => import('views/pages/auth/ConfirmPage'))
const SignupPage = lazy(() => import('views/pages/auth/SignupPage'))
const HomePage = lazy(() => import('views/pages/home/HomePage'))
const LoginPage = lazy(() => import('views/pages/auth/LoginPage_v2'))
const MeetingPage = lazy(() => import('views/pages/meeting/MeetingPage'))
const ProfilePage = lazy(() => import('views/pages/profile/ProfilePage'))
const HomePage_v2 = lazy(() => import('views/desktop/pages/home/HomePage'))
const SignUpPage_v2 = lazy(
	() => import('views/desktop/pages/signUp/SignupPage')
)
const ProfilePage_v2 = lazy(
	() => import('views/desktop/pages/profile/ProfilePage')
)
const DocumentPage_v2 = lazy(
	() => import('views/desktop/pages/document/Document')
)
const ConfirmPage_v2 = lazy(
	() => import('views/desktop/pages/confirm/ConfirmPage')
)
const LoginPage_v2 = lazy(() => import('views/desktop/pages/Login/LoginPage'))

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
const getDynamicRouter = (
	deskTop: ReactNode,
	mobile: ReactNode,
	isMobile: boolean
) => <React.Fragment>{isMobile ? mobile : deskTop}</React.Fragment>

export const getPublicLayout = (
	children: ReactNode,
	type: 'full' | 'wrapper' = 'full',
	hidden: 'hidden' | 'full' = 'hidden'
) => (
	<PublicLayout type={type} hidden={hidden}>
		{children}
	</PublicLayout>
)
type CustomRouteProps = RouteProps

export const ManageView = () => {
	const isMobile = useIsMobile()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const routes: CustomRouteProps[] = useMemo(
		() => [
			{
				path: RouterPath.SINGUP_URL,
				element: getDynamicRouter(
					getPublicLayout(<SignUpPage_v2 />, 'wrapper'),
					getDefaultLayout(<SignupPage />),
					isMobile
				),
				loader: undefined,
			},
			{
				path: RouterPath.LOGIN_URL,
				element: getDynamicRouter(
					getPublicLayout(<LoginPage_v2 />, 'full'),
					getDefaultLayout(<LoginPage />),
					isMobile
				),
				loader: undefined,
			},
			{
				path: RouterPath.FORGOT_PASSWORD_URL,
				element: getPublicLayout(<ForgotpasswordPage />, 'wrapper'),
				loader: undefined,
			},
			{
				path: RouterPath.RESET_PASSWORD_URL,
				element: getPublicLayout(<ResetPasswordPage />, 'wrapper'),
				loader: undefined,
			},
			{
				path: RouterPath.BASE_URL,
				element: getDynamicRouter(
					getPublicLayout(<HomePage_v2 />, 'wrapper'),
					getDefaultLayout(<HomePage />),
					isMobile
				),
				loader: undefined,
			},
		],
		[isMobile]
	)

	const privateRoutes: CustomRouteProps[] = useMemo(
		() => [
			{
				path: RouterPath.PROFILE_URL,
				element: getPublicLayout(<ProfilePage_v2 />, 'full'),
				loader: undefined,
			},
			{
				path: RouterPath.MEETING_URL,
				element: getMeetingLayout(<MeetingPage />),
				loader: undefined,
			},
			{
				path: RouterPath.DOCUMENT_URL,
				element: <DocumentPage_v2 />,
				loader: undefined,
			},
			{
				path: RouterPath.CONFIRM_URL,
				element: getPublicLayout(<ConfirmPage_v2 />, 'full'),
				loader: undefined,
			},
		],
		[]
	)

	const getRoutes = (isLogin: boolean) => {
		const r = new Array<CustomRouteProps>()
		r.push(...routes)
		if (isLogin) r.push(...privateRoutes)
		return r.map((p, i) => <Route key={i} {...p} />)
	}
	return (
		<Routes>
			{getRoutes(isLogin)}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}
export default function Router() {
	const dispatch = useAppDispatch()

	const [loading, setLoading] = useState(true)

	const getMe = useCallback(async () => {
		const token = localStorage.getItem('access_token')
		if (!token) return setLoading(false)
		dispatch(userFetchMe()).finally(() => setLoading(false))
	}, [dispatch])

	useEffect(() => {
		getMe()
	}, [getMe])

	if (loading) return <LayoutLoading />
	return <ManageView />
}
