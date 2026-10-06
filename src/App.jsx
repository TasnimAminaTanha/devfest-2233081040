import React, { useState } from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import Header from './components/Header'
import TenderInfoPanel from './components/TenderInfoPanel'
import RequirementsPanel from './components/RequirementsPanel'
import PlaceholderCard from './components/PlaceholderCard'

function AppShell() {
  const { t } = useLanguage()

  // Central state — shared across all panels as features are added
  const [tender, setTender] = useState(null)
  const [requirements, setRequirements] = useState(null)
  const [fileName, setFileName] = useState(null)

  function handleRequirementsLoaded({ tender, requirements, fileName }) {
    setTender(tender)
    setRequirements(requirements)
    setFileName(fileName)
  }

  return (
    <div className="app-layout">
      <Header />

      <main className="app-main">
        {/* Row 1: Tender info (left) + Requirements (right, full-width) */}
        <div className="main-grid">
          <TenderInfoPanel tender={tender} />

          <RequirementsPanel
            tender={tender}
            requirements={requirements}
            fileName={fileName}
            onLoaded={handleRequirementsLoaded}
          />
        </div>

        {/* Row 2: Upload section — placeholder until next feature step */}
        <div className="main-grid main-grid--single" style={{ marginTop: '20px' }}>
          <PlaceholderCard
            title={t('sectionUpload')}
            description={t('placeholderUpload')}
          />
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  )
}
