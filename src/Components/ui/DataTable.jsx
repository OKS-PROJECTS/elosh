import { useMemo, useState } from 'react'
import { Table, Pagination, PaginationSummary, TextField, Button, Chip, EmptyState } from 'oks-ui'
import { Search, Plus, SlidersHorizontal } from 'lucide-react'
import Surface from './Surface'
import { cx } from '../../lib/cx'

/**
 * List/CRUD table = oks-ui <Table> + a toolbar (search + quick filters + action)
 * + <Pagination>. oks-ui bundles none of the toolbar/pagination wiring. — OKS-UI-FEEDBACK A2
 *
 * columns: [{ key, header, align?, sortable?, sortValue?(row), render?(row) }]
 */
export default function DataTable({
  columns,
  rows,
  getRowKey = (r) => r.id,
  searchKeys = [],
  filters = [],
  pageSize = 10,
  selectable = false,
  toolbar = true,
  onCreate,
  createLabel = 'Add new',
  title,
  subtitle,
  actions,
  loading = false,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'Records will appear here once added.',
}) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(new Set())

  const filtered = useMemo(() => {
    let out = rows
    if (query && searchKeys.length) {
      const q = query.toLowerCase()
      out = out.filter((r) =>
        searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q)),
      )
    }
    if (activeFilter != null) {
      const f = filters[activeFilter]
      if (f?.test) out = out.filter(f.test)
    }
    return out
  }, [rows, query, searchKeys, activeFilter, filters])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <Surface title={title} subtitle={subtitle} actions={actions} bodyClassName="p-0">
      {toolbar && (
        <div
          className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'var(--app-border)' }}
        >
          <div className="flex flex-wrap items-center gap-2">
            {searchKeys.length > 0 && (
              <div className="w-full sm:w-64">
                <TextField
                  size="sm"
                  variant="bordered"
                  placeholder="Search"
                  aria-label="Search table"
                  startIcon={<Search size={14} />}
                  value={query}
                  onChange={(v) => {
                    setQuery(v)
                    setPage(1)
                  }}
                />
              </div>
            )}
            {filters.map((f, i) => (
              <Chip
                key={f.label}
                size="sm"
                variant={activeFilter === i ? 'solid' : 'bordered'}
                color={activeFilter === i ? 'primary' : 'default'}
                selected={activeFilter === i}
                onSelectedChange={() => {
                  setActiveFilter((cur) => (cur === i ? null : i))
                  setPage(1)
                }}
              >
                {f.label}
              </Chip>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="bordered" color="default" startContent={<SlidersHorizontal size={14} />}>
              Filters
            </Button>
            {onCreate && (
              <Button size="sm" color="primary" startContent={<Plus size={15} />} onPress={onCreate}>
                {createLabel}
              </Button>
            )}
          </div>
        </div>
      )}

      <div className={cx('w-full overflow-x-auto', 'app-scroll')}>
        <Table
          aria-label={title || 'Data table'}
          columns={columns}
          rows={pageRows}
          getRowKey={getRowKey}
          isLoading={loading}
          selectionMode={selectable ? 'multiple' : 'none'}
          selectedKeys={selected}
          onSelectionChange={setSelected}
          removeWrapper
          isStriped={false}
          emptyContent={<EmptyState title={emptyTitle} description={emptyDescription} />}
        />
      </div>

      {filtered.length > pageSize && (
        <div
          className="flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row"
          style={{ borderColor: 'var(--app-border)' }}
        >
          <PaginationSummary page={safePage} pageSize={pageSize} total={filtered.length} />
          <Pagination
            size="sm"
            page={safePage}
            total={filtered.length}
            pageSize={pageSize}
            onChange={setPage}
            siblingCount={1}
          />
        </div>
      )}
    </Surface>
  )
}
