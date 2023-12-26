import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from 'contexts'
import RouterPath from 'views/routes/routesContants'
import { Input } from '@mui/material'
import bgL1 from 'assets/static/images/icons/bgl1.svg'
import facbookIcon from 'assets/static/images/icons/facebook.svg'
import googleIcon from 'assets/static/images/icons/google.svg'
import entity2 from 'assets/static/images/backgrouds/Person.svg'
import Button from 'components/Button'
import { authFetchEmailLogin, authFetchGoogleLoginVerify } from 'contexts/auth'
import useToastily from 'hooks/useToastily'
import { Animate } from 'utils/mockAnimation'
import { ResponseLoginSuccess } from 'api/http-rest'
import {
	ApiResponse,
	ApiResponseError,
	ResponseMetadata,
} from 'api/http-rest/apiResponses'
import { PayloadAction } from '@reduxjs/toolkit'

export default function LoginPage() {
	const isLogin = useAppSelector((s) => s.auth.isLogin)
	const [loading, setLoading] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const query = useLocation()
	const toast = useToastily()
	const [err, setErr] = useState<string>('')

	const googleHandler = async () => {
		window.open(import.meta.env.API_LOGIN_GOOGLE_URL, '_self')
	}

	useLayoutEffect(() => {
		const { search } = query
		if (search.match('google'))
			dispatch(authFetchGoogleLoginVerify(search)).then((res) => {
				const payload = res.payload as ApiResponse
				if (payload.metadata.error)
					toast({ content: payload.metadata.error.message, type: 'error' })
			})
	}, [])

	// validate input

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			errMessage: null,
		},
		validationSchema: validationSchema,
		async onSubmit(values) {
			await setLoading(true)
			const { email, password } = values
			const fetchUser = await dispatch(authFetchEmailLogin({ email, password }))
				.then(async (item) => {
					const data = item.payload as ApiResponse<
						ApiResponseError | ResponseMetadata
					>
					if (!data.metadata.success) {
						setErr(`${data.metadata.message}`)
					}
				})
				.finally(() => {
					setLoading(false)
				})
		},
	})

	if (isLogin) {
		return <Navigate to="/" />
	}

	return (
		<div className="Singn-up relative h-[100vh] overflow-hidden max-2xl:overflow-auto z-1">
			<img
				src={bgL1}
				className="max-2xl:hidden object-left-bottom  absolute bottom-[-20%] left-[-5%] h-[100vh]  z-2"
			/>
			<motion.ul
				className="container max-lg:hidden"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<motion.li className="mt-[20vh] max-2xl:mt-[5vh]" variants={item}>
					<motion.div
						whileHover={{ scale: 0.6 }}
						whileTap={{
							scale: 0.8,
							rotate: -20,
							borderRadius: '100%',
						}}
					>
						<img
							src={entity2}
							className="absolute top-[50%] max-h-[100vh] max-w-[35vw] block z-3 "
							loading={'lazy'}
						/>
					</motion.div>
				</motion.li>
			</motion.ul>
			<main className="mt-[10vh]  transition-opacity py-[16px] px-[53px] ml-[45%] max-lg:px-0 max-lg:ml-[0%] max-lg:mx-0 max-lg:flex max-lg:justify-center">
				<form
					onSubmit={formik.handleSubmit}
					action=""
					className="w-[100%] min-w-[420px] max-w-[65%] max-sm:min-w-full md:mx-0 max-sm:p-10 "
				>
					<h2 className="max-w-[570px] text-40 text-gray-80 dark:text-white my-[20px] max-lg:max-w-none text-start leading-tight py-2 ">
						Sign In
					</h2>
					<div className="Form__group px-2 mb-10">
						<Input
							id="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							// icon={<BiUser />}
							key={'input-email'}
							placeholder="email"
							className="Input text-18 border-b-2 w-full dark:text-white dark:border-white p-6"
						/>
						<motion.p
							{...Animate.getAnimationValues('opacity', 200)}
							className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic"
						>
							{formik.touched.email && formik.errors.email ? (
								<span>{formik.errors.email}</span>
							) : null}
						</motion.p>
					</div>
					<div className="Form__group px-2 mb-10">
						<Input
							id="password"
							type="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							key={'password'}
							placeholder="password"
							className="Input text-18 rounded-sm border-b-2  w-full dark:text-white dark:border-white p-6"
						/>
						<motion.p
							{...Animate.getAnimationValues('opacity', 200)}
							className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic"
						>
							{formik.touched.password && formik.errors.password ? (
								<span>{formik.errors.password}</span>
							) : null}
						</motion.p>
					</div>
					<Link
						to={`${RouterPath.FORGOT_PASSWORD_URL}`}
						className="text-16 block my-14 rounded-sm border-b-2 text-gray-70  w-full dark:text-white"
					>
						Lost your password ?
						<span className="text-primary font-bold "> Forgot now</span>
					</Link>
					{err && (
						<motion.div
							{...Animate.getAnimationValues('opacity', 200)}
							className="tip error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic"
						>
							{err}
						</motion.div>
					)}
					<div className="mt-10">
						<Button
							type="submit"
							loading={loading}
							className={
								'max-sm:w-full w-full  flex items-center py-10 justify-center  bg-lprimary text-white'
							}
						>
							Sign Now
						</Button>
					</div>
					<div className="flex items-center justify-center  text-gray-70  my-20	">
						-or-
					</div>
					<div className="flex gap-18 justify-center items-center   ">
						<button
							onClick={googleHandler}
							type="button"
							className="border-[1px] border-gray-70  p-4 rounded-md flex justify-center items-center text-20  gap-6 text-gray-500  px-10 py-3 w-full"
						>
							<img className={'w-30 h-30 mx-3'} src={googleIcon} />
							<p>Google</p>
						</button>
						<button
							disabled={true}
							type="button"
							className="border-[1px] border-gray-70  p-4 rounded-md opacity-25 flex justify-center items-center  text-20  gap-6 text-gray-500  px-10 py-3 w-full "
						>
							<img className={'block w-30 h-30 mx-3'} src={facbookIcon} />
							<p>Facebook</p>
						</button>
					</div>
					<Link
						to={RouterPath.SINGUP_URL}
						className="flex  gap-2 mt-20 mx-auto justify-center w-full py-4 ml-2 text-18 text-gray-70  max-sm:text-xl text-gray-500 dark:text-gray-30  "
					>
						<span>If you no account</span>
						<span className="text-primary font-bold ">Register</span>
					</Link>
				</form>
			</main>
		</div>
	)
}

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { delayChildren: 0.3, staggerChildren: 0.2 },
	},
}

const item = {
	hidden: { y: '-100%', opacity: 0, scale: 0 },
	visible: { y: '-20%', x: '+10%', opacity: 1, scale: 1 },
}

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email address').required('Required'),
	password: Yup.string()
		.min(4, 'password must be 8 characters long')
		.required('Required'),
})
