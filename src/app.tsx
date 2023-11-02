import { CircularProgress } from '@mui/material'
import Router, { getRoutes } from 'views/routes/routes'
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
						<Router />
					</ThemeProvider>
				</Providers>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
