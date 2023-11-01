import { Grid, Stack, Typography, Box } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import RouterPath from 'views/routes/routesContants'
import AuthWrapper from './AuthWrapper'
import LoginForm from './forms/LoginForm'
import { Input } from 'components/Input'
import Button from 'components/Button'

interface IUser {
	UserName: string
	Password: string
	Repassword: string
}

const inituser: IUser = {
	UserName: '',
	Password: '',
	Repassword: '',
}
export default function SignupPage() {
	const [loading, setLoading] = useState(false)
	// validate input
	const validationSchema = Yup.object().shape({
		UserName: Yup.string().email('Invalid email address').required('Required'),
		Password: Yup.string()
			.min(8, 'Password must be 8 characters long')
			.matches(/[0-9]/, 'Password requires a number')
			.matches(/[a-z]/, 'Password requires a lowercase letter')
			.matches(/[A-Z]/, 'Password requires an uppercase letter')
			.matches(/[^\w]/, 'Password requires a symbol')
			.required('Required'),
		Repassword: Yup.string()
			.required('Please re-type your password')
			.oneOf([Yup.ref('Password')], 'Passwords does not match'),
	})
	const formik = useFormik({
		initialValues: inituser,
		validationSchema: validationSchema,
		onSubmit: () => {},
	})
	return (
		<main className="transition-opacity py-[16px] px-[53px] ml-[45%] max-lg:ml-[0%] max-lg:mx-0 max-lg:flex max-lg:justify-center">
			<form
				onSubmit={formik.handleSubmit}
				action=""
				className="w-[100%] min-w-[420px] max-w-[60%] md:mx-0 max-sm:p-10"
			>
				<h2 className="max-w-[570px] text-40 text-gray-80 my-[20px] max-lg:max-w-none text-start leading-tight py-2 ">
					Sign Up
				</h2>
				<div className="Form__group px-2 mb-8">
					<Input
						id="UserName"
						value={formik.values.UserName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						// icon={<BiUser />}
						key={'input-userName'}
						placeholder="UserName"
						className="text-20 border-b-2  "
					/>
					<p className="error text-red-50 text- min-h-[20px] mx-6 my-2">
						{formik.touched.UserName && formik.errors.UserName ? (
							<span>{formik.errors.UserName}</span>
						) : null}
					</p>
				</div>
				<div className="Form__group px-2 mb-8">
					<Input
						id="Password"
						type="password"
						value={formik.values.Password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						// icon={<BiKey />}
						key={'Password'}
						placeholder="Password"
						className="text-20 rounded-sm border-b-2  "
					/>
					<p className="error text-red-50 text- min-h-[20px] mx-6 my-2">
						{formik.touched.Password && formik.errors.Password ? (
							<span>{formik.errors.Password}</span>
						) : null}
					</p>
				</div>
				<div className="Form__group px-2 mb-8 ">
					<Input
						id="Repassword"
						type="password"
						value={formik.values.Repassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						// icon={<BiKey />}
						key={'RePassword'}
						placeholder="Re Password"
						className="text-20 rounded-sm border-b-2 "
					/>
					<p className="error text-red-50 text- min-h-[20px] mx-6 my-2">
						{formik.touched.Repassword && formik.errors.Repassword ? (
							<span>{formik.errors.Repassword}</span>
						) : null}
					</p>
				</div>
				<div className="pt-10">
					<Button
						// s
						type="submit"
						loading={loading}
						className="max-sm:w-full w-full  flex items-center justify-center  bg-lprimary text-white"
					>
						Sign Now
					</Button>
				</div>
				<div className="flex items-center justify-center  text-gray-500 p-10">
					-or-
				</div>
				<div className="flex gap-5 justify-center items-center   ">
					<button
						type="button"
						className="flex justify-center items-center  gap-5 text-gray-500  px-10 py-3 w-full"
					>
						{/* <Image src={google} width={30} alt="Google" /> */}
						<p>Google</p>
					</button>
					<button
						type="button"
						className="flex justify-center items-center  gap-5 text-gray-500  px-10 py-3 w-full "
					>
						{/* <Image src={facebook} width={30} alt="Google" /> */}
						<p>Facebook</p>
					</button>
				</div>
				<Link
					to={'/signIn'}
					className="flex gap-2 my-8 mx-auto justify-center w-full py-4 ml-2 text-16  max-sm:text-xl text-gray-500 dark:text-gray-30  "
				>
					<span>if you already have an account</span>
					<span className=" font-bold ">Login</span>
				</Link>
			</form>
		</main>
	)
}
