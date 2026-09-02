import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Nav } from 'oks-ui'
import { NAV } from '../../data/nav'
import Logo from './Logo'
import { cx } from '../../lib/cx'

/** NAV (our tree) -> oks-ui NavItemData[] with section headings flattened in. */
function toNavItems(sections) {
  const out = []
  for (const section of sections) {
    out.push({ key: `head:${section.heading}`, label: section.heading, isSection: true })
    const walk = (items, prefix) =>
      items.map((n, i) => {
        const key = n.to ?? `${prefix}:${i}`
        const Icon = n.icon
        return {
          key,
          label: n.label,
          href: n.to,
          icon: Icon ? <Icon size={17} strokeWidth={2} /> : undefined,
          children: n.children ? walk(n.children, key) : undefined,
        }
      })
    out.push(...walk(section.items, section.heading))
  }
  return out
}

export default function Sidebar({ collapsed = false, onNavigate }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const items = useMemo(() => toNavItems(NAV), [])

  const isItemActive = (item) =>
    !!item.href && (pathname === item.href || pathname.startsWith(item.href + '/'))

  const defaultExpandedKeys = useMemo(() => {
    const keys = []
    const walk = (list) => {
      for (const it of list) {
        if (it.children) {
          if (it.children.some((c) => isItemActive(c) || (c.children && c.children.some(isItemActive))))
            keys.push(it.key)
          walk(it.children)
        }
      }
    }
    walk(items)
    return keys
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, pathname])

  return (
    <aside
      className={cx(
        'flex h-full flex-col border-r transition-[width] duration-200',
        collapsed ? 'w-[72px]' : 'w-[252px]',
      )}
      style={{ background: 'var(--app-menu-bg)', borderColor: 'var(--app-menu-border)' }}
    >
      <div
        className="flex h-[60px] shrink-0 items-center border-b px-4"
        style={{ borderColor: 'var(--app-menu-border)' }}
      >
        <Logo collapsed={collapsed} />
      </div>

      <div className="app-scroll min-h-0 flex-1 overflow-y-auto px-2.5 py-3">
        <Nav
          aria-label="Main navigation"
          items={items}
          isCollapsed={collapsed}
          isItemActive={isItemActive}
          defaultExpandedKeys={defaultExpandedKeys}
          expansionMode="multiple"
          onItemSelect={(item) => {
            if (item.href) {
              navigate(item.href)
              onNavigate?.()
            }
          }}
          classNames={{
            sectionTitle: 'elosh-nav-heading',
            link: 'elosh-nav-link',
          }}
        />
      </div>
    </aside>
  )
}
