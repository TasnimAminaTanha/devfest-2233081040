import React, { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import TenderInfoPanel from './components/TenderInfoPanel'
import RequirementsPanel from './components/RequirementsPanel'
import UploadPanel from './components/UploadPanel'
import usePdfUpload from './hooks/usePdfUpload'

function AppShell() {
  // ── Tender / requirements state (set by RequirementsPanel) ──────
  const [tender, setTender]           = useState(null)
  const [requirements, setRequirements] = useState(null)
  const [reqFileName, setReqFileName]   = useState(null)

  function handleRequirementsLoaded({ tender, requirements, fileName }) {
    setTender(tender)
    setRequirements(requirements)
    setReqFileName(fileName)
  }

  // ── PDF upload state (managed by usePdfUpload hook) ─────────────
  const { uploadedFiles, addFiles, removeFile, isAtFileLimit, isAtSizeLimit } =
    usePdfUpload()

  return (
    <div className="app-layout">
      <Header />

      <main className="app-main">
        {/* Row 1: Tender info (narrow left) + Requirements (wide right) */}
        <div className="main-grid">
          <TenderInfoPanel tender={tender} />
          <RequirementsPanel
            tender={tender}
            requirements={requirements}
            fileName={reqFileName}
            onLoaded={handleRequirementsLoaded}
          />
        </div>

        {/* Row 2: PDF upload (full width) */}
        <div className="main-grid main-grid--single" style={{ marginTop: '20px' }}>
          <UploadPanel
            uploadedFiles={uploadedFiles}
            addFiles={addFiles}
            removeFile={removeFile}
            isAtFileLimit={isAtFileLimit}
            isAtSizeLimit={isAtSizeLimit}
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
