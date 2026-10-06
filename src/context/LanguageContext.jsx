import React, { createContext, useContext, useState } from 'react'
import strings from '../i18n/strings'

const LanguageContext = createContext(null)

/**
 * Wraps the app and provides the active language + t() helper.
 * Usage: const { lang, setLang, t } = useLanguage()
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  /** Translate a key to the active language string. */
  function t(key) {
    return strings[lang]?.[key] ?? strings['en']?.[key] ?? key
  }

  function toggleLang() {
    setLang(prev => (prev === 'en' ? 'bn' : 'en'))
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
