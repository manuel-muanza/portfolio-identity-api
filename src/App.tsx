import './App.css'
import { AuthProvider } from './features/authentication/AuthProvider'
import { DeveloperPortalPage } from './pages/DeveloperPortalPage'
import { WelcomeModal } from './shared/components/WelcomeModal'
import { I18nProvider } from './shared/i18n/I18nProvider'

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <DeveloperPortalPage />
        <WelcomeModal />
      </AuthProvider>
    </I18nProvider>
  )
}

export default App
