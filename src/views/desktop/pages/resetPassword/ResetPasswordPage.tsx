import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'next-themes'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { motion } from 'framer-motion'
import { Input } from '@mui/material'
import Button from 'components/Button'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'

import Bg from 'assets/static/images/backgrouds/FortgotBg3.svg'
import BgDark from 'assets/static/images/backgrouds/FortgotBgDark3.svg'
import BgT1 from 'assets/static/images/backgrouds/Person.svg'
import BgTL from 'assets/static/images/backgrouds/FortgotBg44.svg'
import useToastily from 'hooks/useToastily'
import { Animate } from 'utils/mockAnimation'

const ResetPasswordPage = (props) => {
	const { theme } = useTheme()
	const [loading, setLoading] = useState(false)
	const showToast = useToastily()
	const [flag, setFlag] = useState(false)
	const { token = '' } = useParams()
	const dispatch = useAppDispatch()

	const formik = useFormik({
		initialValues: initialUser,
		validationSchema: validationSchema,
		onSubmit: handleSubmit,
	})

	async function handleSubmit(values) {
		try {
			setLoading(true)
			// logic here
		} catch (error) {
			showToast({
				content: 'Error, please try again',
				type: 'error',
			})
			setFlag(false)
		} finally {
			setLoading(false)
		}
	}
	if (!Boolean(token)) {
		return <Navigate to="/" />
	}
	return (
		<div
			className={`relative h-[100vh] bg-lprimary overflow-hidden max-2xl:overflow-auto max-2xl:bg-none z-1 ${
				theme === 'light' ? 'max-2xl:bg-white' : 'max-2xl:bg-black'
			}`}
		>
			<img
				src={theme === 'light' ? Bg : BgDark}
				alt="background"
				className="max-lg:hidden object-contain absolute left-[-15%] top-[-50px] w-[120%] max-w-[110%] z-2"
			/>

			<motion.div
				{...Animate.getAnimationValues('opacity', 200)}
				className="rounded-full object-fill absolute max-2xl:bottom-[10vh] max-2xl:right-[20wh] bottom-[-15%] right-[12%] z-3"
			>
				<img
					src={BgT1}
					alt="background"
					className="max-lg:hidden max-lg:bg-gray-80 max-2xl:bg-lprimary max-2xl:rounded-full w-[90wh] h-[90vh] max-2xl:w-[70wh] max-2xl:h-[70vh]"
				></img>
			</motion.div>
			<img
				src={BgTL}
				alt="background"
				className="max-2xl:hidden overflow-hidden max-2xl:bg-lprimary object-fill absolute bottom-[-10%] right-[-10%] z-3 w-[40%]"
			></img>

			<main className="mt-[35vh]">
				<div className="mt-10 transition-opacity max-lg:flex max-lg:items-center justify-center">
					{flag === false ? (
						<form
							onSubmit={formik.handleSubmit}
							action=""
							className="w-[500px] max-sm:w-full border-solid max-lg:ml-0 max-2xl:ml-[10%] ml-[20%] mt-10 p-[30px] max-lg:p-[20px] bg-white bg-opacity-50 backdrop-blur-lg rounded drop-shadow-lg max-lg:backdrop-blur-0 max-lg:border-none max-lg:bg-opacity-0"
						>
							<h2 className="max-w-[570px] text-40 text-gray-80 dark:text-white my-[20px] max-lg:max-w-none text-start leading-tight py-2">
								Reset Password
							</h2>

							<div className="Form__group px-2 mb-2">
								<Input
									id="password"
									type="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder="Your new password..."
									className="block w-full !text-gray-70 dark:!text-white outline-none px-8 py-12 rounded-md max-sm:w-full bg-gray-100 dark:bg-gray-60 bg-gray-10"
								/>
								{formik.touched.password && formik.errors.password && (
									<motion.p
										{...Animate.getAnimationValues('opacity', 200)}
										className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic"
									>
										{formik.errors.password}
									</motion.p>
								)}
							</div>

							<div className="Form__group px-2 mb-2">
								<Input
									id="repassword"
									type="password"
									value={formik.values.repassword}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder="Confirm your new password..."
									className="block w-full !text-gray-70 dark:!text-white outline-none px-8 py-12 rounded-md max-sm:w-full bg-gray-100 dark:bg-gray-60 bg-gray-10"
								/>
								{formik.touched.repassword && formik.errors.repassword && (
									<motion.p
										{...Animate.getAnimationValues('opacity', 200)}
										className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic"
									>
										{formik.errors.repassword}
									</motion.p>
								)}
							</div>

							<div className="pt-5">
								<Button
									loading={loading}
									type="submit"
									className="max-sm:w-full w-full flex items-center justify-center bg-primary text-white"
								>
									Reset Password
								</Button>
							</div>
						</form>
					) : (
						<div className="w-[500px] border border-solid ml-[20%] mt-10 p-[30px] bg-white bg-opacity-50 backdrop-blur-lg rounded drop-shadow-lg">
							<h2 className="max-w-[570px] text-40 text-gray-80 dark:text-white my-[20px] max-lg:max-w-none text-start leading-tight py-2">
								Password Reset Successful
							</h2>

							<div className="flex flex-col gap-5 my-4">
								<p>{`Please check your Gmail inbox at  for any new messages or notifications.`}</p>
								<p className="my-6">Thank you!</p>
							</div>

							<Button
								onClick={() => setFlag(false)}
								type="button"
								className="max-sm:w-full w-full flex items-center justify-center bg-primary text-white"
							>
								Click if no Gmail yet!!
							</Button>
						</div>
					)}
				</div>
			</main>
		</div>
	)
}

const validationSchema = Yup.object().shape({
	password: Yup.string()
		.min(8, 'Password must be 8 characters long')
		.required('Required'),
	repassword: Yup.string()
		.required('Please re-type your password')
		.oneOf([Yup.ref('password')], 'Passwords do not match'),
})

const initialUser = {
	password: '',
	repassword: '',
}

export default ResetPasswordPage
