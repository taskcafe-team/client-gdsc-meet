import {
	Avatar,
	Box,
	Button,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import React from 'react'
import { useAppSelector } from 'contexts/hooks'
import UserApi from 'api/http-rest/userApi'
import { LoadingButton } from '@mui/lab'
const userInfo = {
	id: 'string',
	avatar: 'string',
	email: 'string',
	firstName: 'string',
	lastName: 'string',
	role: 'USER',
}

interface InputFileUploadProps {
	onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function InputFileUpload({ onChangeFile }: InputFileUploadProps) {
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
					onChange={onChangeFile}
					type="file"
					hidden
					accept="image/*,.png"
				/>
			</Button>
		</Avatar>
	)
}

export default function ProfilePage() {
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
		async (file: File) => {
			const objectURL = URL.createObjectURL(file)
			setPreviewImage(objectURL)
			console.log(objectURL)
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

	const btnSaveClick = useCallback(async () => {
		setSaving(true)
		await UserApi.updateMe({
			firstName: firstName || undefined,
			lastName: lastName || undefined,
			avatar: avatar || undefined,
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
		<Box>
			<Grid container p={3} maxWidth={'800px'} m={'auto'}>
				<Grid item xs={12}>
					<Typography variant="h6">User Information</Typography>
					<Box display="flex" py={2}>
						<Box
							mr={3}
							sx={{ position: 'relative' }}
							onMouseLeave={() => setCanUpload(false)}
						>
							<Avatar
								variant="rounded"
								onMouseEnter={() => setCanUpload(true)}
								src={previewImage || user.avatar || ''}
								sx={{
									width: { xs: '100px', md: '130px' },
									height: { xs: '100px', md: '130px' },
									fontSize: '42px',
									backgroundColor: 'blue',
									opacity: 0.7,
								}}
								alt={fullname.toUpperCase()}
							></Avatar>
							{canUpload && <InputFileUpload onChangeFile={onChangeFile} />}
						</Box>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									variant="outlined"
									label="First Name"
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									variant="outlined"
									label="Last Name"
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label="Email"
									disabled
									value={email}
									variant="outlined"
									fullWidth
								/>
							</Grid>
						</Grid>
					</Box>
				</Grid>

				<Grid item xs={12}>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="h6"></Typography>
						<LoadingButton
							loading={saving}
							onClick={btnSaveClick}
							disabled={!canSave}
							variant="contained"
							size="small"
							sx={{ px: 5 }}
						>
							Save
						</LoadingButton>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}
