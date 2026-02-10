import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
