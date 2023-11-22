/* eslint-disable import/no-unresolved */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import * as Yup from 'yup'
import { ResponseDataRegisterSuccess } from 'api/http-rest'
import RouterPath from 'views/routes/routesContants'
import useToastily from 'hooks/useToastily'
import bgL1 from 'assets/static/images/icons/bgl1.svg'
import facbookIcon from 'assets/static/images/icons/facebook.svg'
import googleIcon from 'assets/static/images/icons/google.svg'
import entity2 from 'assets/static/images/icons/entity.svg'
import { Input } from '@mui/material'
import Button from 'components/Button'
import { Animate } from 'utils/mockAnimation'
import { authFetchGoogleLoginVerify } from 'contexts/auth'
import { useAppDispatch } from 'contexts/hooks'
import AuthApi from 'api/http-rest/auth/authApi'

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
	const [err, setErr] = useState('')
	const navigate = useNavigate()
	const Toastily = useToastily()
	const query = useLocation()
	const dispatch = useAppDispatch()
	// init container animate
	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	}
	const loginWithGoogle = useCallback(() => {
		window.open(import.meta.env.API_LOGIN_GOOGLE_URL, '_self')
	}, [])
	useLayoutEffect(() => {
		const { search } = query
		if (search) dispatch(authFetchGoogleLoginVerify(search))
	}, [])
	const item = {
		hidden: { y: '-100%', opacity: 0, scale: 0 },
		visible: {
			y: '-20%',
			x: '+10%',
			opacity: 1,
			scale: 1,
		},
	}
	// validate input
	const validationSchema = Yup.object().shape({
		UserName: Yup.string().email('Invalid email address').required('Required'),
		Password: Yup.string()
			.min(4, 'Password must be 8 characters long')
			.required('Required'),
		Repassword: Yup.string()
			.required('Please re-type your password')
			.oneOf([Yup.ref('Password')], 'Passwords does not match'),
	})
	const formik = useFormik({
		initialValues: inituser,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			try {
				setLoading(true)
				const body = {
					email: values.UserName,
					password: values.Password,
				}
				const res =
					await AuthApi.registerWithEmail<ResponseDataRegisterSuccess>(body)
				setLoading(false)

				const { success } = res.metadata
				if (success) navigate(RouterPath.LOGIN_URL)
				else setErr(res.metadata.error?.message ?? '')
			} finally {
				setLoading(false)
			}
		},
	})
	return (
		<div className="Singn-up relative h-[100vh] overflow-hidden max-2xl:overflow-auto z-1">
			<img
				src={bgL1}
				className="max-lg:hidden absolute bottom-[-20%] left-[-5%]  h-[100vh]  z-2"
			/>
			<motion.ul
				className="container max-lg:hidden"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<motion.li className="mt-[20vh]" variants={item}>
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
							className="absolute top-[50%] max-h-[70vh] max-w-[35vw] block z-3 rotate-45"
						/>
					</motion.div>
				</motion.li>
			</motion.ul>

			<main className="mt-[10vh] transition-opacity max-2xl:p-10 py-[16px] px-[53px] ml-[45%] max-lg:px-0 max-lg:ml-[0%] max-lg:mx-0 max-lg:flex max-lg:justify-center">
				<form
					onSubmit={formik.handleSubmit}
					action=""
					className="w-[100%] min-w-[420px] max-w-[65%] max-sm:min-w-full md:mx-0 max-sm:p-10"
				>
					<h2 className="max-w-[570px] text-40 text-gray-80 dark:text-white my-[20px] max-lg:max-w-none text-start leading-tight py-2 ">
						Sign Up
					</h2>
					<div className="Form__group px-2 mb-10">
						<Input
							id="UserName"
							value={formik.values.UserName}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							// icon={<BiUser />}
							key={'input-userName'}
							placeholder="UserName"
							className="Input text-18 border-b-2 w-full dark:text-white dark:border-white p-6"
						/>
						<p className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic">
							{formik.touched.UserName && formik.errors.UserName ? (
								<span>{formik.errors.UserName}</span>
							) : null}
						</p>
					</div>
					<div className="Form__group px-2 mb-10">
						<Input
							id="Password"
							type="password"
							value={formik.values.Password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							// icon={<BiKey />}
							key={'Password'}
							placeholder="Password"
							className="Input text-18 rounded-sm border-b-2  w-full dark:text-white dark:border-white p-6"
						/>
						<p className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic">
							{formik.touched.Password && formik.errors.Password ? (
								<span>{formik.errors.Password}</span>
							) : null}
						</p>
					</div>
					<div className="Form__group px-2 mb-10 ">
						<Input
							id="Repassword"
							type="password"
							value={formik.values.Repassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							key={'RePassword'}
							placeholder="Re Password"
							className="Input text-18 rounded-sm border-b-2 w-full dark:text-white dark:border-white p-6"
						/>
						<p className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic">
							{formik.touched.Repassword && formik.errors.Repassword ? (
								<span>{formik.errors.Repassword}</span>
							) : null}
						</p>
					</div>
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
					<div className="flex items-center justify-center  text-gray-70  mt-20	">
						-or-
					</div>
					<div className="flex gap-18 justify-center items-center   ">
						<button
							onClick={loginWithGoogle}
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
						to={RouterPath.LOGIN_URL}
						className="flex  gap-2 mt-20 mx-auto justify-center w-full py-4 ml-2 text-18 text-gray-70  max-sm:text-xl text-gray-500 dark:text-gray-30  "
					>
						<span>if you already have an account</span>
						<span className="text-primary font-bold ">Login</span>
					</Link>
				</form>
			</main>
		</div>
	)
}
