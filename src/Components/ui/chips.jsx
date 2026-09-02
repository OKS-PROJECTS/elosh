import { Chip } from 'oks-ui'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const STATUS_COLORS = {
  active: 'success',
  completed: 'success',
  paid: 'success',
  approved: 'success',
  open: 'info',
  inprogress: 'info',
  'in progress': 'info',
  pending: 'warning',
  onhold: 'warning',
  'on hold': 'warning',
  draft: 'default',
  inactive: 'default',
  closed: 'default',
  overdue: 'danger',
  rejected: 'danger',
  cancelled: 'danger',
  failed: 'danger',
}

/** Status pill — maps a status string to a semantic colour. */
export function StatusChip({ status, size = 'sm' }) {
  const key = String(status ?? '').toLowerCase()
  const color = STATUS_COLORS[key] ?? 'default'
  return (
    <Chip size={size} variant="soft" color={color}>
      {status}
    </Chip>
  )
}

/** Small up/down trend pill. */
export function TrendChip({ value, size = 'sm' }) {
  const up = value >= 0
  return (
    <Chip
      size={size}
      variant="soft"
      color={up ? 'success' : 'danger'}
      startContent={up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
    >
      {up ? '+' : ''}
      {value}%
    </Chip>
  )
}
