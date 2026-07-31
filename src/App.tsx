import './App.css'
import { AuthProvider } from './features/authentication/AuthProvider'
import { DeveloperPortalPage } from './pages/DeveloperPortalPage'
import { WelcomeModal } from './shared/components/WelcomeModal'

function App() {
  return (
    <AuthProvider>
      <DeveloperPortalPage />
      <WelcomeModal />
    </AuthProvider>
  )
}

export default App
