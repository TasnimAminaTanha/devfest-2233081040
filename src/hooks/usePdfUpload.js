/**
 * usePdfUpload.js
 *
 * Custom hook that manages all PDF upload state:
 *   - deduplication by name+size+lastModified
 *   - 30-file / 50 MB hard limits
 *   - PDF-only MIME/extension check
 *   - per-file page counting via pdfjs-dist (async, non-blocking)
 *   - per-file remove
 *   - batch error collection (invalid files never corrupt valid state)
 *
 * Exported shape:
 *   { uploadedFiles, addFiles, removeFile, isAtFileLimit, isAtSizeLimit }
 *
 * uploadedFiles entries:
 *   { id, file, name, size, pages, status }
 *   status: 'reading' | 'ready' | 'error'
 *   pages:  number | null
 */

import { useState, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// Point pdfjs at its own worker bundle (Vite serves it as a static asset)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).href

const MAX_FILES   = 30
const MAX_BYTES   = 50 * 1024 * 1024   // 50 MB

/** Stable unique key for deduplication — not shown to user */
function fileKey(file) {
  return `${file.name}::${file.size}::${file.lastModified}`
}

/** Format bytes → human-readable string */
export function formatBytes(bytes) {
  if (bytes < 1024)        return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

/** Check if a File is a PDF (MIME type or extension fallback) */
function isPdf(file) {
  if (file.type === 'application/pdf') return true
  return file.name.toLowerCase().endsWith('.pdf')
}

export default function usePdfUpload() {
  // Array of upload entry objects (see shape above)
  const [uploadedFiles, setUploadedFiles] = useState([])

  /**
   * addFiles(fileList, tFn)
   *   fileList — FileList or File[]
   *   tFn      — the t() translation function from useLanguage,
   *              used to build per-file error messages
   *
   * Returns an array of { type, message } error objects for
   * files that could not be added. Caller displays them.
   */
  const addFiles = useCallback(async (fileList, tFn) => {
    const incoming = Array.from(fileList)
    const errors   = []

    // Snapshot current state inside the callback via functional update later;
    // read it once here for limit/dedup calculations.
    let accepted = []   // entries we'll add this batch

    // We need the current state for limit checks — use a ref-like read via
    // a promise that resolves after the current render. Instead we pass
    // current state as a closure from the component via a setter pattern.
    // Simpler: we collect accepted entries then do a single setState at end.

    // Grab current keys + totals from a synchronous snapshot.
    // We capture these as a closure by reading state inside setUploadedFiles's
    // functional updater at the end.

    // First pass: validate non-async rules
    const candidates = []
    for (const file of incoming) {
      if (!isPdf(file)) {
        errors.push({ type: 'not-pdf', message: tFn('uploadNotPdf').replace('{name}', file.name) })
        continue
      }
      candidates.push(file)
    }

    if (candidates.length === 0) return errors

    // Page-counting: launch all reads in parallel (non-blocking)
    // We add each file immediately with status='reading', then update
    // to 'ready' or 'error' when pdfjs finishes.

    // Build the accepted entries to add (limit checks happen inside the
    // functional state updater so they're always against the live list).
    const pendingEntries = candidates.map(file => ({
      id:     fileKey(file),
      file,
      name:   file.name,
      size:   file.size,
      pages:  null,
      status: 'reading',
    }))

    // Use functional updater so we always operate on the latest state.
    let rejectedDuplicates = 0
    let rejectedFileLimit  = 0
    let rejectedSizeLimit  = 0
    let addedEntries       = []

    setUploadedFiles(prev => {
      const existingKeys  = new Set(prev.map(e => e.id))
      let currentCount    = prev.length
      let currentSize     = prev.reduce((s, e) => s + e.size, 0)
      const next          = [...prev]

      for (const entry of pendingEntries) {
        // Dedup check
        if (existingKeys.has(entry.id)) {
          rejectedDuplicates++
          errors.push({ type: 'duplicate', message: tFn('uploadDuplicate').replace('{name}', entry.name) })
          continue
        }
        // File count limit
        if (currentCount >= MAX_FILES) {
          rejectedFileLimit++
          continue
        }
        // Size limit
        if (currentSize + entry.size > MAX_BYTES) {
          rejectedSizeLimit++
          continue
        }
        next.push(entry)
        existingKeys.add(entry.id)
        currentCount++
        currentSize += entry.size
        addedEntries.push(entry)
      }

      return next
    })

    // Aggregate limit rejection messages (after the updater captures counts)
    // We use a tiny async tick so the counts are finalised before we check them.
    await Promise.resolve()

    if (rejectedFileLimit > 0) {
      errors.unshift({
        type: 'limit-files',
        message: tFn('uploadLimitFiles')
          .replace('{max}', MAX_FILES)
          .replace('{rejected}', rejectedFileLimit),
      })
    }
    if (rejectedSizeLimit > 0) {
      errors.unshift({
        type: 'limit-size',
        message: tFn('uploadLimitSize')
          .replace('{maxMb}', MAX_BYTES / (1024 * 1024))
          .replace('{rejected}', rejectedSizeLimit),
      })
    }

    // Now count pages for each accepted file asynchronously
    for (const entry of addedEntries) {
      countPages(entry.id, entry.file, setUploadedFiles, tFn)
    }

    return errors
  }, [])

  const removeFile = useCallback((id) => {
    setUploadedFiles(prev => prev.filter(e => e.id !== id))
  }, [])

  // Derived limit flags (components can read these to disable the add button)
  const isAtFileLimit = uploadedFiles.length >= MAX_FILES
  const isAtSizeLimit = uploadedFiles.reduce((s, e) => s + e.size, 0) >= MAX_BYTES

  return { uploadedFiles, addFiles, removeFile, isAtFileLimit, isAtSizeLimit }
}

/** Count pages for a single file using pdfjs, then patch state */
async function countPages(id, file, setUploadedFiles, tFn) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
    const pdf = await loadingTask.promise
    const pages = pdf.numPages
    await pdf.destroy()

    setUploadedFiles(prev =>
      prev.map(e => e.id === id ? { ...e, pages, status: 'ready' } : e)
    )
  } catch {
    // Damaged, encrypted, or non-PDF bytes — mark as error
    setUploadedFiles(prev =>
      prev.map(e => {
        if (e.id !== id) return e
        return { ...e, pages: null, status: 'error' }
      })
    )
  }
}
