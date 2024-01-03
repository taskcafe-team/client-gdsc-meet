import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { LoadingButton } from '@mui/lab'
import { motion } from 'framer-motion'
import { userFetchMe, userFetchUpdateMe } from 'contexts/user'
import { Animate } from 'utils/mockAnimation'

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import useToastily from 'hooks/useToastily'
interface InputFileUploadProps {
	isChoiceFile: boolean
	onChangeFile: React.ChangeEventHandler<HTMLInputElement>
}
interface FormInfomationProps {
	lable?: string
}
const FormInfomation = ({ lable, ...rest }: FormInfomationProps) => {
	const dispatch = useAppDispatch()
	const user = useAppSelector((s) => s.user)

	const [firstName, setFirstName] = useState(user.firstName || '')
	const [lastName, setLastName] = useState(user.lastName || '')
	const [email, setEmail] = useState(user.email || '')
	const [avatar, setAvatar] = useState<File>()

	const [canSave, setCanSave] = useState(false)
	const [saving, setSaving] = useState(false)

	const [canUpload, setCanUpload] = useState(false)
	const [previewImage, setPreviewImage] = useState<string | null>()
	const toast = useToastily()
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
		const result = await dispatch(
			userFetchUpdateMe({
				firstName: firstName || undefined,
				lastName: lastName || undefined,
				avatar: avatar || undefined,
			})
		).then(async(e)=>{
			await dispatch(userFetchMe())
			toast({
				content:'submit success',
				type:'success'
		})
		}).catch(e=>{
			toast({
				content:`can't submit`,
				type:'error'
			})
		})
		
		
		
		setSaving(false)
	}, [firstName, lastName, avatar])

	useLayoutEffect(() => {
		const isChangeF = firstName !== user.firstName
		const isChangeL = lastName !== user.lastName
		const isChangeA = avatar ? true : false
		if (isChangeF || isChangeL || isChangeA) setCanSave(true)
		else setCanSave(false)
	}, [firstName, lastName, avatar])

	return (
		<div {...rest}>
			<Grid item>
				<motion.h2
					{...Animate.getAnimationValues('opacity', 800)}
					className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:my-4 max-sm:text-[25px]"
				>
					User Details
				</motion.h2>
				<div className="flex items-center gap-4">
					<Box
						sx={{ width: 130, height: 130 }}
						overflow="hidden"
						position="relative"
						borderRadius={5}
						mr={3}
						mb={{ xs: 2, sm: 0 }}
						onMouseLeave={() => setCanUpload(false)}
					>
						<Avatar
							variant="rounded"
							sx={{ width: 1, height: 1, fontSize: 48 }}
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
						Hi you
					</h2>
				</div>
				<div className="mt-18 flex flex-col gap-18">
					<input
						placeholder="Email"
						disabled
						value={email}
						className="bg-white border border-gray-30 text-gray-80 dark:bg-gray-80 text-16 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					/>
					<input
						value={lastName}
						placeholder="Last name"
						onChange={(e) => setLastName(e.target.value)}
						className="bg-white border border-gray-30 text-gray-80 dark:bg-gray-80 text-16 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					/>
					<input
						value={firstName}
						placeholder="First name"
						onChange={(e) => setFirstName(e.target.value)}
						className="bg-white border border-gray-30 text-gray-80 dark:bg-gray-80 text-16 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-10 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					/>
				</div>
				<Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} py={2}>
					<Box sx={{ flex: 1 }}>
						<Grid container spacing={2}>
							<Grid item xs={6}></Grid>
							<Grid item xs={6}></Grid>
							<Grid item xs={6}></Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>

			<Grid item xs={12}>
				<Box display="flex" justifyContent="right" alignItems="center">
					<Typography variant="h6"></Typography>
					{canSave && (
						<button
							onClick={btnCancelClick}
							disabled={saving}
							className={`Tabinfo-room__item w-max transition-all flex justify-center gap-2 h-[40px] ml-4 text-xs items-center font-bold leading-sm uppercase px-10 py-1 rounded-full cursor-pointer bg-green-10 text-green-50 hover:bg-lprimary hover:text-white`}
						>
							Cancel
						</button>
					)}
					<button
						onClick={btnSaveClick}
						disabled={!canSave}
						className={`w-max transition-all flex justify-center gap-2 h-[40px] ml-4 text-xs items-center font-bold leading-sm uppercase px-10 py-1 rounded-full cursor-pointer bg-green-10 text-green-50 hover:bg-lprimary hover:text-white`}
					>
						{lable}
						<DoubleArrowIcon />
					</button>
				</Box>
			</Grid>
		</div>
	)
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

export default FormInfomation
