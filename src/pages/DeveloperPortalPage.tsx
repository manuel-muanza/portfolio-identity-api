import { useState } from 'react'
import { endpointCollections } from '../data/endpointCollections'
import { EndpointDetails } from '../features/endpoint-viewer/EndpointDetails'
import { MainLayout } from '../shared/components/MainLayout'
import type { Endpoint } from '../shared/types/endpoint'

export function DeveloperPortalPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpointCollections[0].endpoints[0])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleSelect(endpoint: Endpoint) {
    setSelectedEndpoint(endpoint)
    setSidebarOpen(false)
  }

  return (
    <MainLayout
      selectedId={selectedEndpoint.id}
      sidebarOpen={sidebarOpen}
      onMenuToggle={() => setSidebarOpen((value) => !value)}
      onSelect={handleSelect}
    >
      <EndpointDetails key={selectedEndpoint.id} endpoint={selectedEndpoint} />
    </MainLayout>
  )
}
