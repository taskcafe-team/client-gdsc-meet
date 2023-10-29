import { Suspense, useCallback } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

import Providers from './contexts/providers'
import { getRoutes } from './views/routes/routes'

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
					<Routes>{getR()}</Routes>
				</Providers>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
