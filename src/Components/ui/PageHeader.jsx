import { Link, useLocation } from 'react-router-dom'
import { Breadcrumbs, BreadcrumbItem, PageTitle } from 'oks-ui'
import { Home } from 'lucide-react'
import { ROUTE_LABELS } from '../../data/nav'

/**
 * Title band: page title + breadcrumb trail + actions cluster.
 * Composed from oks-ui <PageTitle> + <Breadcrumbs>. oks-ui has no combined
 * PageHeader (title + breadcrumb + actions row) of its own. — OKS-UI-FEEDBACK A3
 */
export default function PageHeader({ title, subtitle, actions, trail }) {
  const { pathname } = useLocation()
  const crumbs = trail ?? ROUTE_LABELS[pathname] ?? [title]

  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <PageTitle
          as="h1"
          title={title}
          style={{ color: 'var(--app-heading)' }}
          classNames={{ title: 'text-xl font-semibold' }}
        />
        <Breadcrumbs aria-label="Breadcrumb" className="mt-1 text-[13px]">
          <BreadcrumbItem>
            <Link to="/" aria-label="Home">
              <Home size={13} />
            </Link>
          </BreadcrumbItem>
          {crumbs.map((c, i) => (
            <BreadcrumbItem key={`${c}-${i}`} isCurrent={i === crumbs.length - 1}>
              {c}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
        {subtitle && (
          <p className="mt-1 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
