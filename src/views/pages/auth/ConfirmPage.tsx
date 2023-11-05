import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { LoadingButton } from '@mui/lab'
import { userFetchUpdateMe } from 'contexts/user'

interface InputFileUploadProps {
	isChoiceFile: boolean
	onChangeFile: React.ChangeEventHandler<HTMLInputElement>
}

function InputFileUpload({ onChangeFile }: InputFileUploadProps) {
	const uploadFRef = React.useRef<HTMLInputElement>(null)

	return (
		<Avatar
			variant="rounded"
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
				position: 'absolute',
				backgroundColor: 'rgba(0,0,0,0.5)',
				top: 0,
				left: 0,
			}}
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
		</Avatar>
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

export default function ConfirmPage() {
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

	return (
		<main className="">
			<div className="contianer mt-[10vh] px-[53px] flex gap-10">
				<div className="content w-[50%]">
					<div className="Review">
						<h2 className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]">
							Welcome to GDSC meet
						</h2>
						<p className="max-w-[800px] max-lg:max-w-[600px] max-sm:hidden px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
							GDSC Meet is a versatile video conferencing and meeting service
							that offers secure and high-quality video calling and
							collaboration features, catering to users across a wide range of
							devices and platforms for a seamless communication experience.
						</p>
					</div>
					<div className="feature">
						<h2 className="max-w-[600px] text-46 my-[20px] max-md:max-w-none text-start leading-tight py-2 max-sm:text-[25px]">
							Feature
						</h2>

						<div className="feature-contianer">
							<div className="feature-contianer__header flex  gap-6">
                                
								<div className="feature-item">
									<div
										className={`Tabinfo-room__item w-max transition-all flex  
                                     justify-center gap-2 h-[40px]  ml-4 text-xs  
                                     items-center font-bold leading-sm uppercase px-10 py-1  
                                     rounded-full cursor-pointer bg-green-10 text-green-50 
									`}
									>
										<p className="text-xl">Meeting room</p>
									</div>
								</div>
								<div className="feature-item">
									<div
										className={`Tabinfo-room__item w-max transition-all flex  
                                     justify-center gap-2 h-[40px]  ml-4 text-xs  
                                     items-center font-bold leading-sm uppercase px-10 py-1  
                                     rounded-full cursor-pointer bg-green-10 text-green-50 
									`}
									>
										<p className="text-xl">Ai sumary</p>
									</div>
								</div>
							</div>
							<div className="feature-contianer__body py-20">
								<p className="max-w-[800px] max-lg:max-w-[600px] max-sm:hidden px-10 text-gray-700 text-[20px] font-normal text-gray-70 dark:text-white max-sm:text-[18px]">
									GDSC Meet is a versatile video conferencing and meeting
									service that offers secure and high-quality video calling and
									collaboration features, catering to users across a wide range
									of devices and platforms for a seamless communication
									experience.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="from w-[50%]">s</div>
			</div>
		</main>
	)
}
