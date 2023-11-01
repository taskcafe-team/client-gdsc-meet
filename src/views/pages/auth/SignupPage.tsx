import React from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import * as Yup from 'yup'
import { Input } from 'components/Input'
import Button from 'components/Button'
import BgL1 from 'components/UILib/BgL1'
import Entity2 from 'components/UILib/Entity2'
import GoogleIcon from 'components/UILib/GoogleIcon'
import FacbookIcon from 'components/UILib/FacbookIcon'
import { AuthApi } from 'api/http-rest'
import RouterPath from 'views/routes/routesContants';
import useToastily from 'hooks/useToastily';

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
	const navigate = useNavigate();
	const Toastily = useToastily()
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
		onSubmit: async(values) => {
			try {
				setLoading(true);
				const initUser = await AuthApi.registerWithEmail({
					email:values.UserName,
					password:values.Password,
				})
				initUser.data 
				? navigate(RouterPath.LOGIN_URL)
				: Toastily({
					type:'error',
					content:'can not register please try again'
				})		
			} catch (error) {
				
			}finally{
				setLoading(false);
			}
		},
	})
	return (
		<div className="Singn-up relative min-h-[89.8vh] max-h-[88vh] overflow-hidden z-1">
			<div className="absolute bottom-[-10%] left-[-5%] max-h-[100vh]  z-2">
				<BgL1 />
			</div>
			<motion.ul
				className="container"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<motion.li className="item" variants={item}>
					<div className="absolute  max-h-[30vh]  z-3 rotate-45">
						<Entity2 />
					</div>
				</motion.li>
			</motion.ul>

			<main className="transition-opacity py-[16px] px-[53px] ml-[45%] max-lg:ml-[0%] max-lg:mx-0 max-lg:flex max-lg:justify-center">
				<form
					onSubmit={formik.handleSubmit}
					action=""
					className="w-[100%] min-w-[420px] max-w-[70%] md:mx-0 max-sm:p-10"
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
							className="text-18 border-b-2  "
						/>
						<p className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic">
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
							className="text-18 rounded-sm border-b-2  "
						/>
						<p className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic">
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
							className="text-18 rounded-sm border-b-2 "
						/>
						<p className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic">
							{formik.touched.Repassword && formik.errors.Repassword ? (
								<span>{formik.errors.Repassword}</span>
							) : null}
						</p>
					</div>
					<div className="mt-10">
						<Button
							type="submit"
							loading={loading}
							className="max-sm:w-full w-full  flex items-center py-10 justify-center  bg-lprimary text-white"
						>
							Sign Now
						</Button>
					</div>
					<div className="flex items-center justify-center  text-gray-70  mt-20	">
						-or-
					</div>
					<div className="flex gap-5 justify-center items-center   ">
						<button
							type="button"
							className="flex justify-center items-center text-20  gap-6 text-gray-500  px-10 py-3 w-full"
						>
							<GoogleIcon className={'w-30 h-30 mx-3'}></GoogleIcon>
							<p>Google</p>
						</button>
						<button
							type="button"
							className="flex justify-center items-center  text-20  gap-6 text-gray-500  px-10 py-3 w-full "
						>
							<FacbookIcon className={'block w-30 h-30 mx-3'}></FacbookIcon>
							<p>Facebook</p>
						</button>
					</div>
					<Link
						to={'/signIn'}
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
