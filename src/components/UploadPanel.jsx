import React, { useRef, useState, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { formatBytes } from '../hooks/usePdfUpload'

/**
 * UploadPanel
 *
 * Props:
 *   uploadedFiles  — array of upload entry objects from usePdfUpload
 *   addFiles       — async fn(FileList, tFn) → error[]
 *   removeFile     — fn(id)
 *   isAtFileLimit  — boolean
 *   isAtSizeLimit  — boolean
 */
export default function UploadPanel({
  uploadedFiles,
  addFiles,
  removeFile,
  isAtFileLimit,
  isAtSizeLimit,
}) {
  const { t } = useLanguage()
  const fileInputRef = useRef(null)
  const [errors, setErrors]       = useState([])
  const [isDragging, setIsDragging] = useState(false)

  const isLimited = isAtFileLimit || isAtSizeLimit

  /* ── Process a FileList (from picker or drop) ─────────────────── */
  async function processFiles(fileList) {
    if (!fileList || fileList.length === 0) return
    const batchErrors = await addFiles(fileList, t)

    // Also surface parse errors from entries that ended up status='error'
    // Those are reported via the hook's state update — we catch them below
    // in the file list render. Batch errors (non-PDF, limits, dups) go here.
    setErrors(batchErrors)
  }

  /* ── File picker ──────────────────────────────────────────────── */
  function openPicker() {
    setErrors([])
    fileInputRef.current.value = ''
    fileInputRef.current.click()
  }

  function handleInputChange(e) {
    processFiles(e.target.files)
  }

  /* ── Drag-and-drop ────────────────────────────────────────────── */
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (isLimited) return
    processFiles(e.dataTransfer.files)
  }, [isLimited]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Derived stats ────────────────────────────────────────────── */
  const totalSize  = uploadedFiles.reduce((s, e) => s + e.size, 0)
  const hasFiles   = uploadedFiles.length > 0

  return (
    <section className="panel upload-panel" aria-label={t('sectionUpload')}>

      {/* ── Panel header ── */}
      <div className="panel-header">
        <h2 className="panel-title">{t('sectionUpload')}</h2>
        <button
          className="btn btn-primary"
          onClick={openPicker}
          disabled={isLimited}
          title={
            isAtFileLimit ? t('limitReachedFiles')
            : isAtSizeLimit ? t('limitReachedSize')
            : undefined
          }
        >
          ＋ {t('btnAddPdfs')}
        </button>
      </div>

      {/* Hidden multi-file PDF-only input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        style={{ display: 'none' }}
        onChange={handleInputChange}
        aria-hidden="true"
      />

      {/* ── Limit banner ── */}
      {isAtFileLimit && (
        <div className="alert alert-warning" role="status">
          <span className="alert-icon">ℹ</span>
          <span>{t('limitReachedFiles')}</span>
        </div>
      )}
      {!isAtFileLimit && isAtSizeLimit && (
        <div className="alert alert-warning" role="status">
          <span className="alert-icon">ℹ</span>
          <span>{t('limitReachedSize')}</span>
        </div>
      )}

      {/* ── Batch error list ── */}
      {errors.length > 0 && (
        <div className="alert alert-error" role="alert">
          <span className="alert-icon">⚠</span>
          <ul className="error-list">
            {errors.map((err, i) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Drop zone / empty state ── */}
      {!hasFiles && (
        <div
          className={`drop-zone ${isDragging ? 'drop-zone--active' : ''} ${isLimited ? 'drop-zone--disabled' : ''}`}
          onDragOver={!isLimited ? handleDragOver : undefined}
          onDragLeave={!isLimited ? handleDragLeave : undefined}
          onDrop={!isLimited ? handleDrop : undefined}
          aria-label={t('uploadInstructions')}
        >
          <span className="drop-zone-icon">📂</span>
          <p className="drop-zone-primary">{t('uploadEmptyHint')}</p>
          <p className="drop-zone-secondary">{t('uploadInstructions')}</p>
        </div>
      )}

      {/* ── Stats bar ── */}
      {hasFiles && (
        <div className="upload-stats-bar">
          <span>
            {t('uploadStats')
              .replace('{count}', uploadedFiles.length)
              .replace('{size}', formatBytes(totalSize))}
          </span>
          {/* Drop zone hint when files already present */}
          {!isLimited && (
            <span
              className={`drop-hint ${isDragging ? 'drop-hint--active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isDragging ? '⬇ Drop here' : t('uploadInstructions')}
            </span>
          )}
        </div>
      )}

      {/* ── File list table ── */}
      {hasFiles && (
        <div className="upload-table-wrapper">
          <table className="upload-table">
            <thead>
              <tr>
                <th className="ucol-name">{t('colFilename')}</th>
                <th className="ucol-size">{t('colSize')}</th>
                <th className="ucol-pages">{t('colPages')}</th>
                <th className="ucol-action">{t('colActions')}</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((entry) => (
                <UploadRow
                  key={entry.id}
                  entry={entry}
                  onRemove={removeFile}
                  t={t}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

/* ── Single file row ───────────────────────────────────────────── */
function UploadRow({ entry, onRemove, t }) {
  const { name, size, pages, status } = entry

  let pagesCell
  if (status === 'reading') {
    pagesCell = <span className="pages-reading">{t('labelReading')}</span>
  } else if (status === 'error') {
    pagesCell = (
      <span
        className="pages-error"
        title={t('uploadParseFail').replace('{name}', name)}
      >
        ✕
      </span>
    )
  } else {
    pagesCell = <span>{pages} <small>{t('labelPages')}</small></span>
  }

  return (
    <tr className={status === 'error' ? 'row-error' : ''}>
      <td className="ucol-name">
        <span className="file-icon">📄</span>
        <span className="file-name" title={name}>{name}</span>
        {status === 'error' && (
          <span className="file-error-msg">
            {t('uploadParseFail').replace('{name}', '')}
          </span>
        )}
      </td>
      <td className="ucol-size">{formatBytes(size)}</td>
      <td className="ucol-pages">{pagesCell}</td>
      <td className="ucol-action">
        <button
          className="btn-remove"
          onClick={() => onRemove(entry.id)}
          aria-label={`${t('btnRemove')} ${name}`}
        >
          {t('btnRemove')}
        </button>
      </td>
    </tr>
  )
}
