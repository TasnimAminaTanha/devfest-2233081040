import React from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import Header from './components/Header'
import PlaceholderCard from './components/PlaceholderCard'

function AppShell() {
  const { t } = useLanguage()

  return (
    <div className="app-layout">
      <Header />

      <main className="app-main">
        <div className="content-grid">
          <PlaceholderCard
            title={t('sectionTenderInfo')}
            description={t('placeholderTenderInfo')}
          />
          <PlaceholderCard
            title={t('sectionRequirements')}
            description={t('placeholderRequirements')}
          />
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
