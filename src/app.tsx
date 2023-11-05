import Router, { Loading } from 'views/routes/routes'
import { ThemeProvider } from 'next-themes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Providers from 'contexts/providers'

function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Providers>
					<ThemeProvider attribute="class">
						<Router />
						<ToastContainer/>
					</ThemeProvider>
				</Providers>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
