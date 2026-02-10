import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
