import Router, { Loading } from 'views/routes/routes'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import Providers from 'contexts/providers'

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Providers>
					<ThemeProvider attribute="class">
						<Router />
						<ToastContainer />
					</ThemeProvider>
				</Providers>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
if (module.hot) module.hot.accept()
