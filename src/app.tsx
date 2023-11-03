import Router, { Loading } from 'views/routes/routes'
import { ThemeProvider } from 'next-themes'
import Providers from 'contexts/providers'

function App() {
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
