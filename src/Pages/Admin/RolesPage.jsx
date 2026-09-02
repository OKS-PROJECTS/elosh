import { useState } from 'react'
import { Table, SwitchField, Chip, Button, toast } from 'oks-ui'
import { Plus } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'

const ROLES = ['Admin', 'Manager', 'Recruiter', 'Finance', 'Employee']
const MODULES = [
  'Dashboards', 'Employees', 'Attendance & Leave', 'Payroll', 'Recruitment',
  'Finance & Invoices', 'Reports', 'Settings', 'User Management',
]

// default grant matrix — deterministic
const grants = {}
MODULES.forEach((m, mi) => {
  grants[m] = {}
  ROLES.forEach((r, ri) => {
    grants[m][r] = ri === 0 || (ri + mi) % 3 === 0
  })
})

export default function RolesPage() {
  const [matrix, setMatrix] = useState(grants)

  const toggle = (mod, role) =>
    setMatrix((cur) => ({ ...cur, [mod]: { ...cur[mod], [role]: !cur[mod][role] } }))

  const columns = [
    { key: 'module', header: 'Module', render: (r) => <span className="font-medium">{r.module}</span> },
    ...ROLES.map((role) => ({
      key: role,
      header: role,
      align: 'center',
      render: (r) => (
        <SwitchField
          name={`${r.module}-${role}`}
          checked={matrix[r.module][role]}
          onChange={() => toggle(r.module, role)}
          aria-label={`${role} can access ${r.module}`}
        />
      ),
    })),
  ]

  const rows = MODULES.map((m) => ({ id: m, module: m }))

  return (
    <>
      <PageHeader
        title="Roles & Permissions"
        subtitle="Control what each role can access."
        actions={
          <Button size="sm" color="primary" startContent={<Plus size={15} />} onPress={() => toast.info('New role')}>
            Add role
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-3">
        {ROLES.map((r, i) => (
          <Surface key={r} bodyClassName="p-4" className="flex-1 min-w-[160px]">
            <div className="text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
              {r}
            </div>
            <div className="mt-1 text-xs" style={{ color: 'var(--app-fg-muted)' }}>
              {[3, 12, 5, 4, 132][i]} users
            </div>
            <Chip className="mt-2" size="sm" variant="soft" color={i === 0 ? 'primary' : 'default'}>
              {MODULES.filter((m) => matrix[m][r]).length} / {MODULES.length} modules
            </Chip>
          </Surface>
        ))}
      </div>

      <Surface title="Permission matrix" bodyClassName="p-0">
        <div className="w-full overflow-x-auto app-scroll">
          <Table aria-label="Permission matrix" columns={columns} rows={rows} getRowKey={(r) => r.id} removeWrapper />
        </div>
      </Surface>

      <div className="mt-4 flex gap-2">
        <Button size="sm" color="primary" onPress={() => toast.success('Permissions saved')}>
          Save changes
        </Button>
      </div>
    </>
  )
}
