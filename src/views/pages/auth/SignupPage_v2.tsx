import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Checkbox from '@mui/joy/Checkbox'
import Divider from '@mui/joy/Divider'
import FormControl from '@mui/joy/FormControl'
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel'
import IconButton from '@mui/joy/IconButton'
import Link from '@mui/joy/Link'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'
import Stack from '@mui/joy/Stack'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import googleIcon from 'assets/static/images/icons/google.svg'
import { Group } from '@mui/icons-material'
import useToastily from 'hooks/useToastily'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { ApiResponse } from 'api/http-rest/apiResponses'
import RouterPath from 'views/routes/routesContants'
import AuthApi from 'api/http-rest/auth/authApi'
import { setLocalStorageItem } from 'utils/localStorageUtils'
import { authLogged } from 'contexts/auth'

interface FormElements extends HTMLFormControlsCollection {
	email: HTMLInputElement
	password: HTMLInputElement
	persistent: HTMLInputElement
}
interface SignInFormElement extends HTMLFormElement {
	readonly elements: FormElements
}

export default function SignupPage() {
	const navigate = useNavigate()
	const toast = useToastily()
	const dispatch = useAppDispatch()
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const [registering, setRegistering] = useState(false)

	const googleHandler = async () => {
		window.open(import.meta.env.API_LOGIN_GOOGLE_URL, '_self')
	}

	if (isLogin) return <Navigate to="/" />
	return (
		<Box
			sx={(theme) => ({
				width:
					'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
				transition: 'width var(--Transition-duration)',
				transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
				position: 'relative',
				zIndex: 1,
				display: 'flex',
				justifyContent: 'center',
				backdropFilter: 'blur(12px)',
				backgroundColor: 'rgba(255 255 255 / 0.2)',
			})}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100dvh',
					width:
						'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
					maxWidth: '100%',
					px: 2,
				}}
			>
				<Box
					component="header"
					sx={{
						py: 3,
						display: 'flex',
						alignItems: 'left',
						justifyContent: 'space-between',
					}}
				>
					<Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
						<IconButton
							onClick={() => navigate('/')}
							variant="soft"
							color="primary"
							size="sm"
						>
							<Group />
						</IconButton>
						<Typography level="title-lg">GDSC MEET</Typography>
					</Box>
				</Box>
				<Box
					component="main"
					sx={{
						my: 'auto',
						py: 2,
						pb: 5,
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						width: 400,
						maxWidth: '100%',
						mx: 'auto',
						borderRadius: 'sm',
						'& form': {
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						},
						[`& .${formLabelClasses.asterisk}`]: {
							visibility: 'hidden',
						},
					}}
				>
					<Stack gap={4} sx={{ mb: 2 }}>
						<Stack gap={1}>
							<Typography level="h3">Sign up</Typography>
							<Typography level="body-sm">
								I already have an account?{' '}
								<Link href={RouterPath.LOGIN_URL} level="title-sm">
									Login
								</Link>
							</Typography>
						</Stack>

						<Button
							onClick={googleHandler}
							variant="soft"
							color="neutral"
							fullWidth
							startDecorator={<img src={googleIcon} />}
						>
							Continue with Google
						</Button>
					</Stack>
					<Divider
						sx={(theme) => ({
							[theme.getColorSchemeSelector('light')]: {
								color: { xs: '#FFF', md: 'text.tertiary' },
								'--Divider-lineColor': {
									xs: '#FFF',
									md: 'var(--joy-palette-divider)',
								},
							},
						})}
					>
						or
					</Divider>
					<Stack gap={4} sx={{ mt: 2 }}>
						<form
							onSubmit={(event: React.FormEvent<SignInFormElement>) => {
								event.preventDefault()
								setRegistering(true)
								const formElements = event.currentTarget.elements
								const email = formElements.email.value
								const password = formElements.password.value
								AuthApi.registerWithEmail({ email, password })
									.then(async () => {
										await AuthApi.loginWithEmail({ email, password }).then(
											async (res) => {
												AuthApi.saveUserAccessToken(res.data.accessToken)
												dispatch(authLogged())
												navigate('/')
											}
										)
									})
									.catch((err) => {
										const message = err.message ?? 'Sign Up Failed'
										toast({ content: message, type: 'error' })
									})
									.then(() => setRegistering(false))
							}}
						>
							<FormControl required>
								<FormLabel>Email</FormLabel>
								<Input disabled={registering} type="email" name="email" />
							</FormControl>
							<FormControl required>
								<FormLabel>Password</FormLabel>
								<Input disabled={registering} type="password" name="password" />
							</FormControl>
							<Stack gap={4} sx={{ mt: 2 }}>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Checkbox
										disabled={registering}
										size="sm"
										label="Remember me"
										name="persistent"
									/>
									<Link
										disabled={registering}
										level="title-sm"
										href="#replace-with-a-link"
									>
										Forgot your password?
									</Link>
								</Box>
								<Button loading={registering} type="submit" fullWidth>
									Sign Up
								</Button>
							</Stack>
						</form>
					</Stack>
				</Box>
				<Box component="footer" sx={{ py: 3 }}>
					<Typography level="body-xs" textAlign="center">
						© Gdsc Meet {new Date().getFullYear()}
					</Typography>
				</Box>
			</Box>
		</Box>
	)
}
