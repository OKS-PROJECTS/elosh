import { format as fmtDate, parseISO } from 'date-fns'

/** Deterministic avatar photo for a seed — the template's one runtime dependency.
 *  Falls back to oks-ui Avatar initials on load failure. */
export const avatarUrl = (seed) => {
  const n = typeof seed === 'number' ? seed : hash(String(seed))
  return `https://i.pravatar.cc/160?img=${(n % 70) + 1}`
}

const hash = (s) => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export const money = (n, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(n)

export const compact = (n) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)

export const num = (n) => new Intl.NumberFormat('en-US').format(n)

export const pct = (n) => `${n > 0 ? '+' : ''}${n.toFixed(1)}%`

export const date = (iso, pattern = 'dd MMM yyyy') => {
  try {
    return fmtDate(typeof iso === 'string' ? parseISO(iso) : iso, pattern)
  } catch {
    return String(iso)
  }
}

export const initials = (name = '') =>
  name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
