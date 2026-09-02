import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Surface from './Surface'
import { cx } from '../../lib/cx'

const TONES = {
  primary: 'var(--app-accent)',
  success: 'var(--app-ok)',
  danger: 'var(--app-bad)',
  warning: 'var(--app-warn)',
  info: 'var(--app-info)',
  purple: 'var(--app-purple)',
  pink: 'var(--app-pink)',
  teal: 'var(--app-teal)',
  dark: '#475569',
}

/**
 * KPI card matching the reference: solid round icon tile, label, big value,
 * a trend pill and a "View" link. oks-ui <Stat> exists but has no icon-tile /
 * link-footer treatment. — OKS-UI-FEEDBACK A4
 */
export default function StatCard({ icon: Icon, label, value, tone = 'primary', trend, delta, to }) {
  const color = TONES[tone] ?? TONES.primary
  const up = trend === 'up'
  return (
    <Surface bodyClassName="p-4">
      <div className="flex items-start gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: color }}
        >
          {Icon && <Icon size={20} />}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
            {label}
          </p>
          <p className="mt-0.5 text-xl font-bold" style={{ color: 'var(--app-heading)' }}>
            {value}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        {delta != null ? (
          <span
            className={cx('inline-flex items-center gap-1 text-xs font-medium')}
            style={{ color: up ? 'var(--app-ok)' : 'var(--app-bad)' }}
          >
            {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {delta}
          </span>
        ) : (
          <span />
        )}
        {to && (
          <Link
            to={to}
            className="text-xs font-medium hover:underline"
            style={{ color: 'var(--app-accent)' }}
          >
            View all
          </Link>
        )}
      </div>
    </Surface>
  )
}
