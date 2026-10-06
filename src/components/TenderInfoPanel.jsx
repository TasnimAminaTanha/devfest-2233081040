import React from 'react'
import { useLanguage } from '../context/LanguageContext'

/**
 * Displays the tender metadata from the loaded requirements JSON.
 * Props:
 *   tender — the validated tender object, or null if not yet loaded.
 */
export default function TenderInfoPanel({ tender }) {
  const { t } = useLanguage()

  if (!tender) {
    return (
      <section className="panel tender-info-panel" aria-label={t('sectionTenderInfo')}>
        <h2 className="panel-title">{t('sectionTenderInfo')}</h2>
        <p className="panel-empty">{t('placeholderTenderInfo')}</p>
      </section>
    )
  }

  const rows = [
    { label: t('labelTenderId'),        value: tender.tender_id },
    { label: t('labelTitle'),            value: tender.title },
    { label: t('labelProcuringEntity'), value: tender.procuring_entity },
    { label: t('labelBidder'),           value: tender.bidder },
    { label: t('labelDeadline'),         value: tender.submission_deadline },
  ]

  return (
    <section className="panel tender-info-panel" aria-label={t('sectionTenderInfo')}>
      <h2 className="panel-title">{t('sectionTenderInfo')}</h2>

      <dl className="tender-info-list">
        {rows.map(({ label, value }) => (
          <div className="tender-info-row" key={label}>
            <dt className="tender-info-label">{label}</dt>
            <dd className="tender-info-value">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
