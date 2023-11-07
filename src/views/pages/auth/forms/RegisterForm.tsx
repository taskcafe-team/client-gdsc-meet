import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
	Checkbox,
	Divider,
	FormControlLabel,
	FormHelperText,
	Grid,
	Link,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography,
} from '@mui/material'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import * as Yup from 'yup'
import { Formik, type FormikProps } from 'formik'
import { LoadingButton } from '@mui/lab'

// project import
import AuthWithThirtyService from './AuthWithThirtyService'
import AnimateButton from '../../../components/AnimateButton'
import { LoginFormValueInit } from '../type'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { authFetchEmailLogin } from 'contexts/auth'

const loginFormValueInit: LoginFormValueInit = {
	email: 'dangnhatminh@gmail.com',
	password: 'MyP@ssw0rd',
	errMessage: null,
}

function ShowPasswordIcon({
	showPassword,
	setShowPassword,
}: {
	showPassword: boolean
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<InputAdornment position="end">
			<IconButton
				aria-label="toggle password visibility"
				onClick={() => setShowPassword(!showPassword)}
				edge="end"
				size="large"
			>
				{showPassword ? (
					<RemoveRedEyeOutlinedIcon />
				) : (
					<VisibilityOffOutlinedIcon />
				)}
			</IconButton>
		</InputAdornment>
	)
}
export default function RegisterForm() {
	const dispatch = useAppDispatch()

	const error = useAppSelector((s) => s.auth.error)
	const [err, setErr] = useState<string>('')

	const [checked, setChecked] = React.useState(false)
	const [showPassword, setShowPassword] = React.useState(false)

	useLayoutEffect(() => {
		if (error) {
			setErr(error.message)
			setTimeout(() => setErr(''), 2000)
		}
	}, [error])

	return (
		<Formik
			initialValues={loginFormValueInit}
			validationSchema={Yup.object().shape({
				email: Yup.string()
					.email('Must be a valid email')
					.required('Email is required')
					.max(255),
				password: Yup.string().max(255).required('Password is required'),
			})}
			onSubmit={async (values) => {
				const { email, password } = values
				dispatch(authFetchEmailLogin({ email, password }))
			}}
		>
			{(p: FormikProps<LoginFormValueInit>) => (
				<form noValidate onSubmit={p.handleSubmit}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Stack spacing={1}>
								<InputLabel htmlFor="email-login">Email Address</InputLabel>
								<OutlinedInput
									id="email-login"
									disabled={p.isSubmitting}
									type="email"
									value={p.values.email}
									name="email"
									onBlur={p.handleBlur}
									onChange={p.handleChange}
									placeholder="Enter email address"
									error={Boolean(p.touched.email && p.errors.email)}
								/>
								{p.touched.email && p.errors.email && (
									<FormHelperText error>{p.errors.email}</FormHelperText>
								)}
							</Stack>
						</Grid>
						<Grid item xs={12}>
							<Stack spacing={1}>
								<InputLabel htmlFor="password-login">Password</InputLabel>
								<OutlinedInput
									disabled={p.isSubmitting}
									fullWidth
									error={Boolean(p.touched.password && p.errors.password)}
									id="password-login"
									type={showPassword ? 'text' : 'password'}
									value={p.values.password}
									name="password"
									onBlur={p.handleBlur}
									onChange={p.handleChange}
									endAdornment={
										<ShowPasswordIcon
											showPassword={showPassword}
											setShowPassword={setShowPassword}
										/>
									}
									placeholder="Enter password"
								/>
								{p.touched.password && p.errors.password && (
									<FormHelperText
										error
										id="standard-weight-helper-text-password-login"
									>
										{p.errors.password}
									</FormHelperText>
								)}
							</Stack>
						</Grid>

						<Grid item xs={12}>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								spacing={2}
							>
								<FormControlLabel
									control={
										<Checkbox
											checked={checked}
											onChange={(event) => setChecked(event.target.checked)}
											name="checked"
											color="primary"
											size="small"
										/>
									}
									label={
										<Typography variant="body1">Keep me sign in</Typography>
									}
								/>
								<Link
									variant="body1"
									component={RouterLink}
									to="/"
									color="text.primary"
								>
									Forgot Password?
								</Link>
							</Stack>
						</Grid>
						<Grid item xs={12}>
							<AnimateButton>
								<LoadingButton
									loading={p.isSubmitting}
									disableElevation
									fullWidth
									size="large"
									type="submit"
									variant="contained"
									color="primary"
								>
									Login
								</LoadingButton>
							</AnimateButton>
						</Grid>
						{err && (
							<Grid item xs={12}>
								<Typography variant="body1" color="red">
									{err}
								</Typography>
							</Grid>
						)}
						<Grid item xs={12}>
							<Divider>
								<Typography variant="caption">Login with</Typography>
							</Divider>
						</Grid>
						<Grid item xs={12}>
							<AuthWithThirtyService loginBtnLoading={p.isSubmitting} />
						</Grid>
					</Grid>
				</form>
			)}
		</Formik>
	)
}
