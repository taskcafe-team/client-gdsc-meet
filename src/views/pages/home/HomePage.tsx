import React from 'react'
import {
	Box,
	Button,
	Container,
	Divider,
	FormControl,
	InputAdornment,
	OutlinedInput,
	Typography,
	styled,
} from '@mui/material'
import CallIcon from '@mui/icons-material/Call'
import { useAppSelector } from '../../../contexts/hooks'

const MainContent = styled(Box)(
	() => `
    width: 100%;
    display: flex;s
    flex: 1;
    flex-direction: column;
  `
)

const TopWrapper = styled(Box)(
	() => `
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
  `
)

export default function HomePage() {
	const isLogin = useAppSelector((s) => s.auth.payload.isLogin)

	return (
		<MainContent>
			<TopWrapper>
				<Container maxWidth="md">
					<Box textAlign="center">
						<img
							alt="Oline Meeting Images"
							height={180}
							src="assets/static/images/icons/facebook.svg"
						/>
						<Typography variant="h3" sx={{ my: 2 }}>
							Cuộc họp video chất lượng. Giờ đây miễn phí cho tất cả mọi người.
						</Typography>
						<Typography
							variant="h6"
							color="text.secondary"
							fontWeight="normal"
							sx={{ mb: 4 }}
						>
							Chúng tôi đã thiết kế lại Google Meet - dịch vụ tổ chức cuộc họp
							kinh doanh với độ bảo mật cao - để cung cấp miễn phí cho mọi
							người.
						</Typography>
					</Box>
					<Container maxWidth="sm">
						<Box sx={{ textAlign: 'center', mt: 3, p: 4 }}>
							<FormControl variant="outlined" fullWidth>
								<OutlinedInput
									type="text"
									placeholder="Input meeting id..."
									endAdornment={
										<InputAdornment position="end">
											<Button variant="contained" size="small">
												Join Meeting
											</Button>
										</InputAdornment>
									}
									startAdornment={
										<InputAdornment position="start">
											<CallIcon />
										</InputAdornment>
									}
								/>
							</FormControl>
							<Divider sx={{ my: 4 }}>OR</Divider>
							<Button variant="outlined">Create Meeting</Button>
						</Box>
					</Container>
				</Container>
			</TopWrapper>
		</MainContent>
	)
}
