import React, { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Routes, { LayoutLoading } from 'views/routes/routes'
import Providers from 'contexts/providers'




function App() {
	return (
		<Router>
			{/* <ThemeProvider theme={theme}> */}
				<Suspense fallback={<LayoutLoading />}>
					<Providers>
						<NextThemeProvider attribute="class">
						<Routes />
						<ToastContainer />
						</NextThemeProvider>
					</Providers>
				</Suspense>
			{/* </ThemeProvider> */}
		</Router>
	)
}

export default App

if (module.hot) module.hot.accept()
