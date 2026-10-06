import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Header() {
  const { t, toggleLang } = useLanguage()

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <svg className="brand-icon" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="4" fill="#1a56db" />
            <text x="16" y="22" fontSize="18" textAnchor="middle" fill="white" fontFamily="Arial">T</text>
          </svg>
          <div>
            <h1 className="brand-title">{t('appTitle')}</h1>
            <p className="brand-subtitle">{t('appSubtitle')}</p>
          </div>
        </div>

        <button
          className="lang-toggle"
          onClick={toggleLang}
          aria-label="Switch language"
        >
          {t('langToggle')}
        </button>
      </div>
    </header>
  )
}
