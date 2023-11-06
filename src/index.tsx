import './index.css'
import 'assets/styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

const App = React.lazy(() => import('app'))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
