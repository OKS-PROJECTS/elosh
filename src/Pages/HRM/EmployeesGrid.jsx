import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Chip, TextField, Pagination, PaginationSummary } from 'oks-ui'
import { Search, Mail, Phone, LayoutGrid } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { employees } from '../../data/mock'

const PAGE = 12

export default function EmployeesGrid() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)

  const filtered = employees.filter((e) =>
    (e.name + e.department + e.designation).toLowerCase().includes(q.toLowerCase()),
  )
  const safePage = Math.min(page, Math.max(1, Math.ceil(filtered.length / PAGE)))
  const rows = filtered.slice((safePage - 1) * PAGE, safePage * PAGE)

  return (
    <>
      <PageHeader
        title="Employee Grid"
        subtitle="Everyone on the team, as cards."
        actions={
          <Button as={Link} to="/hrm/employees" size="sm" variant="bordered" color="default" startContent={<LayoutGrid size={14} />}>
            List view
          </Button>
        }
      />

      <div className="mb-5 max-w-xs">
        <TextField
          size="sm"
          variant="bordered"
          placeholder="Search people"
          aria-label="Search"
          startIcon={<Search size={14} />}
          value={q}
          onChange={(v) => {
            setQ(v)
            setPage(1)
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rows.map((e) => (
          <Surface key={e.id} bodyClassName="p-4">
            <div className="flex flex-col items-center text-center">
              <Avatar size={64} src={e.avatar} name={e.name} isBordered />
              <div className="mt-3 text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                {e.name}
              </div>
              <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                {e.designation}
              </div>
              <Chip className="mt-2" size="sm" variant="soft" color="default">
                {e.department}
              </Chip>
            </div>
            <div className="mt-4 flex justify-center gap-2 border-t pt-3" style={{ borderColor: 'var(--app-border)' }}>
              <Button size="sm" variant="ghost" color="default" isIconOnly aria-label={`Email ${e.name}`}>
                <Mail size={15} />
              </Button>
              <Button size="sm" variant="ghost" color="default" isIconOnly aria-label={`Call ${e.name}`}>
                <Phone size={15} />
              </Button>
            </div>
          </Surface>
        ))}
      </div>

      {filtered.length > PAGE && (
        <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <PaginationSummary page={safePage} pageSize={PAGE} total={filtered.length} />
          <Pagination size="sm" page={safePage} total={filtered.length} pageSize={PAGE} onChange={setPage} />
        </div>
      )}
    </>
  )
}
