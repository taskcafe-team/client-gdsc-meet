import {
	Avatar,
	Box,
	Button,
	Grid,
	Input,
	TextField,
	Typography,
} from '@mui/material'
import CustomButton from 'components/Button'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { LoadingButton } from '@mui/lab'
import { userFetchUpdateMe } from 'contexts/user'
import RouterPath from 'views/routes/routesContants'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import * as Yup from 'yup'
import Tag from 'components/Tag/Tag'
import { Animate } from 'utils/mockAnimation'

interface InputFileUploadProps {
	isChoiceFile: boolean
	onChangeFile: React.ChangeEventHandler<HTMLInputElement>
}

function InputFileUpload({ onChangeFile }: InputFileUploadProps) {
	const uploadFRef = React.useRef<HTMLInputElement>(null)
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			position="absolute"
			top={0}
			left={0}
			sx={{ width: 1, height: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
		>
			<Button
				component="label"
				size="small"
				variant="contained"
				startIcon={<UploadFileIcon />}
			>
				Upload
				<input
					ref={uploadFRef}
					onChange={(e) => onChangeFile(e)}
					type="file"
					hidden
				/>
			</Button>
		</Box>
	)
}

const features = [
	{
		lable: 'Meeting',
		description:
			'A meeting is a gathering of individuals to discuss, make decisions, or exchange information. It can take place in person or online through various applications. Meetings are often planned with specific objectives.',
	},
	{
		lable: 'AI keywords',
		description:
			'This functional task is to generate important keywords from the meeting, creating a concise, easy-to-understand summary of the meeting content.',
	},
	{
		lable: 'Fouder',
		description:
			'feature that automatically stores important data after a meeting. Once the meeting concludes, it automatically records and stores the data on the cloud or a server, ensuring no loss of vital information, making it convenient for reference and sharing',
	},
]
const roles = [
	{
		lable: 'Teacher',
	},
	{
		lable: 'Student',
	},
]

export default function ConfirmPage() {
	const dispatch = useAppDispatch()
	const user = useAppSelector((s) => s.user)
	const DEFAUFT = features[0].lable
	const [feature, setFeature] = useState(DEFAUFT)
	const [role, setRole] = useState(roles[0].lable)
	const [firstName, setFirstName] = useState(user.firstName || '')
	const [lastName, setLastName] = useState(user.lastName || '')
	const [email, setEmail] = useState(user.email || '')
	const [avatar, setAvatar] = useState<File>()

	const [canSave, setCanSave] = useState(false)
	const [saving, setSaving] = useState(false)

	const [canUpload, setCanUpload] = useState(false)
	const [previewImage, setPreviewImage] = useState<string | null>()

	const fullname = useMemo(
		() => firstName + ' ' + lastName,
		[firstName, lastName]
	)

	const handlePreviewImage = useCallback(
		(file: File) => {
			const objectURL = URL.createObjectURL(file)
			setPreviewImage(objectURL)
		},
		[avatar]
	)

	const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		console.log(event)

		if (files && files.length > 0) {
			setAvatar(files[0])
			handlePreviewImage(files[0])
		}
	}

	const btnCancelClick = useCallback(async () => {
		setFirstName(user.firstName || '')
		setLastName(user.lastName || '')
		setAvatar(undefined)
	}, [firstName, lastName, avatar])

	const btnSaveClick = useCallback(async () => {
		setSaving(true)
		dispatch(
			userFetchUpdateMe({
				firstName: firstName || undefined,
				lastName: lastName || undefined,
				avatar: avatar || undefined,
			})
		)
		setSaving(false)
	}, [firstName, lastName, avatar])

	useLayoutEffect(() => {
		const isChangeF = firstName !== user.firstName
		const isChangeL = lastName !== user.lastName
		const isChangeA = avatar ? true : false
		if (isChangeF || isChangeL || isChangeA) setCanSave(true)
		else setCanSave(false)
	}, [firstName, lastName, avatar])

	const handlecontent = useMemo(() => {
		return features.find((s) => s.lable === feature)
	}, [feature])

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email address').required('Required'),
		firstName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
	})
	const initialValues = useMemo(
		() => ({
			email: user.email ?? '',
			firstName: user.firstName ?? '',
			lastName: user.lastName ?? '',
		}),
		[user]
	)

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit(values) {
			setSaving(true)

			dispatch(
				userFetchUpdateMe({
					firstName: values.firstName || undefined,
					lastName: values.lastName || undefined,
					avatar: avatar || undefined,
				})
			)
			setSaving(false)
		},
	})
	return (
		<main className="">
			<div className="contianer mt-[10vh] px-[53px] max-2xl:px-10  items-center flex gap-10 max-2xl:flex-col-reverse">
				<div className="content w-[50%] max-2xl:w-full">
					<div className="Review">
						<motion.h2
							{...Animate.getAnimationValues('opacity', 800)}
							className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]"
						>
							Welcome to GDSC meet
						</motion.h2>
						<motion.p
							{...Animate.getAnimationValues('opacity', 1000)}
							className="max-w-[800px] max-lg:max-w-[600px]  px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]"
						>
							GDSC Meet is a versatile video conferencing and meeting service
							that offers secure and high-quality video calling and
							collaboration features, catering to users across a wide range of
							devices and platforms for a seamless communication experience.
						</motion.p>
					</div>
					<div className="feature">
						<motion.h2
							{...Animate.getAnimationValues('opacity', 800)}
							className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]"
						>
							Feature
						</motion.h2>

						<motion.div
							className="feature-contianer"
							{...Animate.getAnimationValues('opacity', 1000)}
						>
							<div className="feature-contianer__header flex flex-wrap gap-6">
								{features &&
									features.map((item, index) => (
										<Tag
											key={`feature-${index}`}
											label={item.lable}
											active={Boolean(feature === item.lable)}
											onClick={() => setFeature(item.lable)}
										/>
									))}
							</div>
							<div className="feature-contianer__body py-20 min-h-[10vh]">
								<p className="max-w-[800px] max-lg:max-w-[600px]  px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
									{handlecontent && handlecontent.description}
								</p>
							</div>
							<div className="gap-2 mb-auto  w-full py-4 ml-2 text-18 text-gray-70  max-sm:text-xl text-gray-500 dark:text-gray-30  ">
								<span>Wish you have a good experience</span>
								<span className="text-primary font-bold ">Thank you</span>
							</div>
						</motion.div>
					</div>
				</div>
				<div className="from w-[50%]  max-2xl:w-full">
					<div className="from__body">
						<motion.div
							className="from__body__title flex gap-6 items-center"
							{...Animate.getAnimationValues('opacity', 60)}
						>
							<Box
								position="relative"
								sx={{
									minWidth: { xs: '120px', md: '120px' },
									minHeight: { xs: '120px', md: '120px' },
								}}
								overflow="hidden"
								borderRadius={10}
								mr={3}
								onMouseLeave={() => setCanUpload(false)}
							>
								<Avatar
									variant="square"
									sx={{ width: 1, height: 1 }}
									onMouseEnter={() => setCanUpload(true)}
									src={previewImage || user.avatar || ''}
									alt={fullname.toUpperCase()}
								></Avatar>
								{canUpload && (
									<InputFileUpload
										onChangeFile={onChangeFile}
										isChoiceFile={Boolean(avatar)}
									/>
								)}
							</Box>
							<h2 className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]">
								Hi Minh Nha
							</h2>
						</motion.div>
						<motion.form
							{...Animate.getAnimationValues('opacity', 1000)}
							onSubmit={formik.handleSubmit}
							action=""
							className="w-[100%] min-w-[420px] max-w-[65%] max-2xl:min-w-full md:mx-0 max-sm:p-10 "
						>
							<div className="">
								<h2 className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]">
									Infomation
								</h2>
								<div className="Form__group px-2 mb-10">
									<input
										id="email"
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										disabled
										// icon={<BiUser />}
										key={'input-email'}
										placeholder="Email"
										className="bg-white border border-gray-30 text-gray-80 dark:bg-gray-80 text-16 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									/>
									<p className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic">
										{formik.touched.email && formik.errors.email ? (
											<span>{formik.errors.email}</span>
										) : null}
									</p>
								</div>
								<div className="Form__group px-2 mb-10">
									<input
										id="firstName"
										value={formik.values.firstName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										// icon={<BiUser />}
										key={'input-firstName'}
										placeholder="First name..."
										className="bg-white border border-gray-30 text-gray-80 dark:bg-gray-80 text-16 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									/>
									<p className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic">
										{formik.touched.firstName && formik.errors.firstName ? (
											<span>{formik.errors.lastName}</span>
										) : null}
									</p>
								</div>
								<div className="Form__group px-2 mb-10">
									<input
										id="lastName"
										value={formik.values.lastName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										// icon={<BiUser />}
										key={'input-lasName'}
										placeholder="Last name..."
										className="bg-white border border-gray-30 text-gray-80 dark:bg-gray-80 text-16 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									/>
									<p className="error text-red-50 text-14 min-h-[20px] mx-6 my-2 italic">
										{formik.touched.lastName && formik.errors.lastName ? (
											<span>{formik.errors.firstName}</span>
										) : null}
									</p>
								</div>
							</div>
							<div className="">
								<h2 className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]">
									You are
								</h2>
								<div className="flex gap-2">
									{roles &&
										roles.map((item, index) => (
											<Tag
												key={`Role-${index}`}
												label={item.lable}
												active={Boolean(role === item.lable)}
												onClick={() => setRole(item.lable)}
											/>
										))}
								</div>
							</div>
							<CustomButton
								type="submit"
								className={
									'max-sm:w-full w-full mt-20 flex items-center py-10 justify-center  bg-lprimary text-white'
								}
							>
								Submit
							</CustomButton>
						</motion.form>
					</div>
				</div>
			</div>
		</main>
	)
}
