import './App.css'
import { AuthProvider } from './features/authentication/AuthProvider'
import { DeveloperPortalPage } from './pages/DeveloperPortalPage'

function App() {
  return (
    <AuthProvider>
      <DeveloperPortalPage />
    </AuthProvider>
  )
}

export default App
