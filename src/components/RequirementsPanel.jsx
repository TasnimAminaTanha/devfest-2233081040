import React, { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { validateRequirementsJson, interpolate } from '../utils/validateRequirements'

/**
 * RequirementsPanel
 *
 * Props:
 *   tender        — loaded tender object or null
 *   requirements  — sorted requirements array or null
 *   fileName      — name of the loaded file, or null
 *   onLoaded      — callback({ tender, requirements, fileName }) when valid JSON loaded
 */
export default function RequirementsPanel({ tender, requirements, fileName, onLoaded }) {
  const { t, lang } = useLanguage()
  const fileInputRef = useRef(null)
  const [error, setError] = React.useState(null)

  function openFilePicker() {
    setError(null)
    fileInputRef.current.value = ''   // allow re-picking same file
    fileInputRef.current.click()
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const result = validateRequirementsJson(evt.target.result)
        if (!result.ok) {
          const msg = result.errorParams
            ? interpolate(t(result.errorKey), result.errorParams)
            : t(result.errorKey)
          setError(msg)
        } else {
          setError(null)
          onLoaded({ tender: result.tender, requirements: result.requirements, fileName: file.name })
        }
      } catch {
        setError(t('errUnexpected'))
      }
    }
    reader.onerror = () => setError(t('errUnexpected'))
    reader.readAsText(file, 'UTF-8')
  }

  const isLoaded = Array.isArray(requirements) && requirements.length > 0

  return (
    <section className="panel requirements-panel" aria-label={t('sectionRequirements')}>
      {/* ── Panel header ── */}
      <div className="panel-header">
        <h2 className="panel-title">{t('sectionRequirements')}</h2>
        <button className="btn btn-primary" onClick={openFilePicker}>
          {isLoaded ? t('btnReloadJson') : t('btnLoadJson')}
        </button>
      </div>

      {/* Hidden file input — .json only */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        aria-hidden="true"
      />

      {/* ── Error banner ── */}
      {error && (
        <div className="alert alert-error" role="alert">
          <span className="alert-icon">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* ── Empty state ── */}
      {!isLoaded && !error && (
        <div className="panel-empty-state">
          <p className="panel-empty">{t('placeholderRequirements')}</p>
          <p className="load-instructions">{t('loadInstructions')}</p>
        </div>
      )}

      {/* ── Loaded state ── */}
      {isLoaded && (
        <>
          {/* File + count pill */}
          <div className="loaded-meta">
            <span className="loaded-filename">
              📄 {t('loadedFile')} <strong>{fileName}</strong>
            </span>
            <span className="req-count-badge">
              {requirements.length} {t('reqCount')}
            </span>
          </div>

          {/* Requirements table */}
          <div className="req-table-wrapper">
            <table className="req-table" aria-label={t('sectionRequirements')}>
              <thead>
                <tr>
                  <th className="col-order">{t('colOrder')}</th>
                  <th className="col-document">{t('colDocument')}</th>
                  <th className="col-mandatory">{t('colMandatory')}</th>
                  <th className="col-expiry">{t('colExpiry')}</th>
                </tr>
              </thead>
              <tbody>
                {requirements.map((req) => (
                  <tr key={req.id}>
                    <td className="col-order">{req.order}</td>
                    <td className="col-document">
                      {lang === 'bn' ? req.title_bn : req.title_en}
                    </td>
                    <td className="col-mandatory">
                      <span className={`badge ${req.mandatory ? 'badge-mandatory' : 'badge-optional'}`}>
                        {req.mandatory ? t('badgeMandatory') : t('badgeOptional')}
                      </span>
                    </td>
                    <td className="col-expiry">
                      <span className={`badge ${req.has_expiry ? 'badge-expiry-yes' : 'badge-expiry-no'}`}>
                        {req.has_expiry ? t('badgeExpiryYes') : t('badgeExpiryNo')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}
