import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Divider from '@mui/joy/Divider'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import IconButton from '@mui/joy/IconButton'
import Stack from '@mui/joy/Stack'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'
import CardActions from '@mui/joy/CardActions'
import CardOverflow from '@mui/joy/CardOverflow'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import CountrySelector from './CountrySelector'
import { useAppDispatch, useAppSelector } from 'contexts/hooks'
import { Grid } from '@mui/joy'
import UserApi from 'api/http-rest/user/userApi'
import { userFetchMe } from 'contexts/user'
import { useToast } from 'react-toastify'
import useToastily from 'hooks/useToastily'

export default function ProfilePage() {
	const user = useAppSelector((s) => s.user)
	const dispatch = useAppDispatch()
	const toast = useToastily()

	const [firstName, setFirstName] = useState(user.firstName)
	const [lastName, setLastName] = useState(user.lastName)
	const [email, setEmail] = useState(user.email)
	const [avatar, setAvatar] = useState<string | null>(user.avatar)
	const [avatarFile, setAvatarFile] = useState<File | null>(null)

	const [fetchSaving, setFetchSaving] = useState(false)

	const handleCancel = useCallback(() => {
		setFirstName(user.firstName)
		setLastName(user.lastName)
		setAvatar(user.avatar)
		setAvatarFile(null)
	}, [])

	const fetchSave = useCallback(async () => {
		if (fetchSaving) return
		setFetchSaving(true)
		await UserApi.updateMe({
			firstName: firstName ?? undefined,
			lastName: lastName ?? undefined,
			avatar: avatarFile ?? undefined,
		})
			.then((res) => dispatch(userFetchMe()))
			.then(() => toast({ content: 'Saved', type: 'success' }))
			.catch((err) => console.log(err))
			.finally(() => setFetchSaving(false))
	}, [fetchSaving, firstName, lastName, avatarFile])

	return (
		<Box sx={{ flex: 1, width: '100%' }}>
			<Stack
				spacing={4}
				sx={{
					display: 'flex',
					maxWidth: '800px',
					mx: 'auto',
					px: { xs: 2, md: 6 },
					py: { xs: 2, md: 3 },
				}}
			>
				<Card>
					<Box sx={{ mb: 1 }}>
						<Typography level="title-md">Personal info</Typography>
						<Typography level="body-sm">
							Customize how your profile information will apper to the networks.
						</Typography>
					</Box>
					<Divider />

					<Grid container spacing={2}>
						<Grid xs={12}>
							<Grid container xs={12} spacing={2}>
								<Grid position="relative">
									<AspectRatio
										ratio="1"
										maxHeight={200}
										sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
									>
										<img src={avatar ?? ''} loading="lazy" alt="" />
									</AspectRatio>
									<IconButton
										aria-label="upload new picture"
										disabled={fetchSaving}
										size="sm"
										variant="outlined"
										color="neutral"
										sx={{
											bgcolor: 'background.body',
											position: 'absolute',
											zIndex: 2,
											borderRadius: '50%',
											right: 10,
											bottom: 10,
											boxShadow: 'sm',
										}}
										onClick={() => {
											const fileInput = document.createElement('input')
											fileInput.type = 'file'
											fileInput.onchange = () => {
												const file = fileInput.files
													? fileInput?.files[0]
													: null
												if (file) {
													setAvatarFile(file)
													const reader = new FileReader()
													reader.onloadend = () =>
														setAvatar(reader.result as string)
													reader.readAsDataURL(file)
												}
											}
											fileInput.click()
										}}
									>
										<EditRoundedIcon />
									</IconButton>
								</Grid>
								<Grid flexGrow={1}>
									<FormLabel>Name</FormLabel>
									<FormControl
										sx={{
											flexDirection: { sm: 'column', md: 'row' },
											gap: 2,
										}}
									>
										<Input
											disabled={fetchSaving}
											size="sm"
											placeholder="First name"
											value={firstName ?? ''}
											sx={{ flexGrow: 1 }}
											onChange={(e) => setFirstName(e.target.value)}
										/>
										<Input
											disabled={fetchSaving}
											size="sm"
											placeholder="Last name"
											sx={{ flexGrow: 1 }}
											value={lastName ?? ''}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</FormControl>
								</Grid>
							</Grid>
						</Grid>
						<Grid xs={12}>
							<Stack
								sx={{ flexDirection: { sm: 'column', md: 'row' }, gap: 2 }}
							>
								<FormControl sx={{ width: 1 }}>
									<FormLabel>Role</FormLabel>
									<Input size="sm" defaultValue="UI Developer" />
								</FormControl>
								<FormControl sx={{ width: 1 }}>
									<FormLabel>Email</FormLabel>
									<Input
										size="sm"
										type="email"
										value={email}
										disabled={true}
										startDecorator={<EmailRoundedIcon />}
										placeholder="email"
										defaultValue="gdscmeet@email.com"
									/>
								</FormControl>
							</Stack>
						</Grid>
						<Grid xs={12}>
							<CountrySelector />
						</Grid>
						<Grid xs={12}>
							<Stack>
								<FormControl sx={{ display: { sm: 'contents' } }}>
									<FormLabel>Timezone</FormLabel>
									<Select
										size="sm"
										startDecorator={<AccessTimeFilledRoundedIcon />}
										defaultValue="1"
									>
										<Option value="1">
											Indochina Time (Bangkok){' '}
											<Typography textColor="text.tertiary" ml={0.5}>
												— GMT+07:00
											</Typography>
										</Option>
										<Option value="2">
											Indochina Time (Ho Chi Minh City){' '}
											<Typography textColor="text.tertiary" ml={0.5}>
												— GMT+07:00
											</Typography>
										</Option>
									</Select>
								</FormControl>
							</Stack>
						</Grid>
					</Grid>

					<CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
						<CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
							<Button
								disabled={fetchSaving}
								onClick={() => handleCancel()}
								size="sm"
								variant="outlined"
								color="neutral"
							>
								Cancel
							</Button>
							<Button
								onClick={() => fetchSave()}
								loading={false}
								size="sm"
								variant="solid"
							>
								Save
							</Button>
						</CardActions>
					</CardOverflow>
				</Card>
			</Stack>
		</Box>
	)
}
