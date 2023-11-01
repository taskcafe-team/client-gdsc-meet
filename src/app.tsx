import { Suspense, useCallback } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { getRoutes } from 'views/routes/routes'
import { ThemeProvider } from 'next-themes'
import Providers from 'contexts/providers'

export const Loading = () => {
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress />
		</div>
	)
}

function App() {
	const getR = useCallback(getRoutes, [])
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Providers>
					<ThemeProvider attribute="class">
						<Routes>{getR()}</Routes>
					</ThemeProvider>
				</Providers>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
