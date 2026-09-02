import { Avatar } from 'oks-ui'
import { cx } from '../../lib/cx'

/** Avatar + primary/secondary text — the identity column in most tables. */
export default function EntityCell({ name, sub, src, square = false, size = 34 }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar
        size={size}
        src={src}
        name={name}
        radius={square ? 'sm' : 'full'}
        classNames={{ base: 'shrink-0' }}
      />
      <div className="min-w-0">
        <div className={cx('truncate text-[13px] font-medium')} style={{ color: 'var(--app-fg-strong)' }}>
          {name}
        </div>
        {sub && (
          <div className="truncate text-xs" style={{ color: 'var(--app-fg-muted)' }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}
