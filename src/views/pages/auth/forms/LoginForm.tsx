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

// project import
import { noitificationSet } from 'contexts/notification'
import AuthWithThirtyService from './AuthWithThirtyService'
import AnimateButton from '../../../components/AnimateButton'
import { AuthApi } from 'api/http-rest'
import { LoadingButton } from '@mui/lab'
import { useAppDispatch } from 'contexts/hooks'

interface LoginFormValueInit {
	email: string
	password: string
	errMessage: null
}

const loginFormValueInit: LoginFormValueInit = {
	email: 'dangnhatminh@gmail.com',
	password: '123456',
	errMessage: null,
}

const ShowPasswordIcon = ({ showPassword }: { showPassword: boolean }) =>
	showPassword ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />

export default function LoginForm() {
	const dispatch = useAppDispatch()
	const [checked, setChecked] = React.useState(false)
	const [showPassword, setShowPassword] = React.useState(false)

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
				try {
					const { email, password } = values
					Promise.reject({ error: 'HEllO' })
					const res = await AuthApi.loginWithEmail({ email, password })
					dispatch(noitificationSet({ code: '500', message: 'HellO' }))
					console.log(res)
					return
				} catch (error) {
					console.log(error)
				} finally {
					dispatch(noitificationSet({ code: '500', message: 'HellO' }))
				}
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
									type="email"
									value={p.values.email}
									name="email"
									onBlur={p.handleBlur}
									onChange={p.handleChange}
									placeholder="Enter email address"
									fullWidth
									error={Boolean(p.touched.email && p.errors.email)}
								/>
								{p.touched.email && p.errors.email && (
									<FormHelperText
										error
										id="standard-weight-helper-text-email-login"
									>
										{p.errors.email}
									</FormHelperText>
								)}
							</Stack>
						</Grid>
						<Grid item xs={12}>
							<Stack spacing={1}>
								<InputLabel htmlFor="password-login">Password</InputLabel>
								<OutlinedInput
									fullWidth
									error={Boolean(p.touched.password && p.errors.password)}
									id="-password-login"
									type={showPassword ? 'text' : 'password'}
									value={p.values.password}
									name="password"
									onBlur={p.handleBlur}
									onChange={p.handleChange}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setShowPassword(!showPassword)}
												edge="end"
												size="large"
											>
												<ShowPasswordIcon showPassword={showPassword} />
											</IconButton>
										</InputAdornment>
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
						<Grid item xs={12}>
							<Divider>
								<Typography variant="caption"> Login with</Typography>
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
