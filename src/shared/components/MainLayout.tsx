import type { ReactNode } from 'react'
import type { Endpoint } from '../types/endpoint'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
  selectedId: string
  sidebarOpen: boolean
  onMenuToggle: () => void
  onSelect: (endpoint: Endpoint) => void
}

export function MainLayout({ children, selectedId, sidebarOpen, onMenuToggle, onSelect }: MainLayoutProps) {
  return (
    <div className="portal">
      <Header onMenuToggle={onMenuToggle} menuOpen={sidebarOpen} />
      <div className="workspace">
        <Sidebar selectedId={selectedId} open={sidebarOpen} onClose={onMenuToggle} onSelect={onSelect} />
        <main className="main-content">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
