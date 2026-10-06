/**
 * validateRequirements.js
 *
 * Parses and validates a requirements.json file content (string).
 * Returns { ok: true, tender, requirements } on success,
 * or   { ok: false, errorKey, errorParams } on failure.
 *
 * errorKey maps directly to a key in src/i18n/strings.js.
 * errorParams is an optional object used for string interpolation.
 *
 * No external dependencies. Runs entirely in the browser.
 */

const TENDER_FIELDS = [
  'tender_id',
  'title',
  'procuring_entity',
  'bidder',
  'submission_deadline',
]

const REQUIREMENT_FIELDS = [
  'id',
  'order',
  'title_en',
  'title_bn',
  'mandatory',
  'has_expiry',
]

/**
 * @param {string} jsonText  Raw file content as a string.
 * @returns {{ ok: true, tender: object, requirements: object[] }
 *          |{ ok: false, errorKey: string, errorParams?: object }}
 */
export function validateRequirementsJson(jsonText) {
  // 1. Parse JSON
  let parsed
  try {
    parsed = JSON.parse(jsonText)
  } catch {
    return { ok: false, errorKey: 'errNotJson' }
  }

  // 2. Top-level tender object
  if (!parsed.tender || typeof parsed.tender !== 'object' || Array.isArray(parsed.tender)) {
    return { ok: false, errorKey: 'errMissingTender' }
  }

  const tender = parsed.tender

  // 3. Required tender fields
  const tenderErrorKeys = {
    tender_id:           'errMissingTenderId',
    title:               'errMissingTitle',
    procuring_entity:    'errMissingProcuringEntity',
    bidder:              'errMissingBidder',
    submission_deadline: 'errMissingDeadline',
  }

  for (const field of TENDER_FIELDS) {
    const value = tender[field]
    if (value === undefined || value === null || String(value).trim() === '') {
      return { ok: false, errorKey: tenderErrorKeys[field] }
    }
  }

  // 4. Requirements array — must exist and be non-empty
  if (!Array.isArray(parsed.requirements) || parsed.requirements.length === 0) {
    return { ok: false, errorKey: 'errMissingRequirements' }
  }

  // 5. Validate each requirement entry
  for (let i = 0; i < parsed.requirements.length; i++) {
    const req = parsed.requirements[i]
    for (const field of REQUIREMENT_FIELDS) {
      if (req[field] === undefined || req[field] === null) {
        return {
          ok: false,
          errorKey: 'errRequirementField',
          errorParams: { index: i + 1, field },
        }
      }
    }
  }

  // 6. Sort by order ascending (non-mutating)
  const requirements = [...parsed.requirements].sort(
    (a, b) => Number(a.order) - Number(b.order)
  )

  return { ok: true, tender, requirements }
}

/**
 * Interpolates {placeholder} tokens in a translated string.
 * e.g. interpolate("index {index} missing {field}", { index: 2, field: "id" })
 *   => "index 2 missing id"
 *
 * @param {string} str
 * @param {object} params
 * @returns {string}
 */
export function interpolate(str, params = {}) {
  return str.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`
  )
}
