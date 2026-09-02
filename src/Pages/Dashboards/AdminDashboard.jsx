import { Link } from 'react-router-dom'
import { Avatar, Button, Chip } from 'oks-ui'
import {
  Users,
  FolderKanban,
  Building2,
  ListChecks,
  Wallet,
  TrendingUp,
  UserPlus,
  Sparkles,
  CalendarDays,
  Download,
} from 'lucide-react'
import {
  PageHeader,
  Surface,
  StatCard,
  ChartCard,
  DonutCard,
  MiniTable,
  StatusChip,
  EntityCell,
} from '../../Components/ui'
import { date } from '../../lib/format'
import * as d from '../../data/dashboard'
import { employees, tasks, jobs } from '../../data/mock'

const ICONS = [Users, FolderKanban, Building2, ListChecks, Wallet, TrendingUp, UserPlus, Sparkles]

export default function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        actions={
          <>
            <Button size="sm" variant="bordered" color="default" startContent={<Download size={14} />}>
              Export
            </Button>
            <Button size="sm" variant="bordered" color="default" startContent={<CalendarDays size={14} />}>
              This month
            </Button>
          </>
        }
      />

      <Surface className="mb-5" bodyClassName="p-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Avatar size={44} src={employees[6].avatar} name="Adrian Park" />
            <div>
              <div className="text-sm font-semibold" style={{ color: 'var(--app-heading)' }}>
                Welcome back, Adrian
              </div>
              <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                You have 21 pending approvals and 14 leave requests
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button as={Link} to="/hrm/leaves" size="sm" variant="bordered" color="default">
              Approvals
            </Button>
            <Button as={Link} to="/hrm/employees" size="sm" color="primary">
              Add employee
            </Button>
          </div>
        </div>
      </Surface>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {d.adminKpis.map((k, i) => (
          <StatCard
            key={k.label}
            icon={ICONS[i % ICONS.length]}
            label={k.label}
            value={k.value}
            tone={k.tone}
            trend={k.trend}
            delta={k.delta}
            to={k.to}
          />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Revenue vs expense"
            subtitle="Last 8 months"
            type="area"
            data={d.revenueSeries}
            x="month"
            series={[
              { key: 'revenue', name: 'Revenue' },
              { key: 'expense', name: 'Expense' },
            ]}
            dataFormat={{ prefix: '$', format: 'compact' }}
            legend
            height={300}
          />
        </div>
        <DonutCard
          title="Attendance today"
          data={d.attendanceDonut}
          centerLabel="present"
          centerValue={d.attendanceDonut[0].value}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ChartCard
          title="Employees by department"
          type="bar"
          data={d.empByDept}
          x="dept"
          series={[{ key: 'count', name: 'Employees' }]}
          height={280}
        />
        <div className="lg:col-span-2">
          <Surface
            title="Recent tasks"
            bodyClassName="p-0"
            actions={
              <Button as={Link} to="/projects/tasks" size="sm" variant="bordered" color="default">
                View all
              </Button>
            }
          >
            <MiniTable
              ariaLabel="Recent tasks"
              columns={[
                { key: 'title', header: 'Task' },
                { key: 'assignee', header: 'Assignee', render: (r) => <EntityCell name={r.assignee} size={28} /> },
                { key: 'priority', header: 'Priority', render: (r) => <StatusChip status={r.priority} /> },
                { key: 'due', header: 'Due', render: (r) => date(r.due, 'dd MMM') },
                { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
              ]}
              rows={tasks.slice(0, 6)}
            />
          </Surface>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Surface
          title="Open positions"
          bodyClassName="p-0"
          actions={
            <Button as={Link} to="/recruitment/jobs" size="sm" variant="bordered" color="default">
              All jobs
            </Button>
          }
        >
          <MiniTable
            ariaLabel="Open positions"
            columns={[
              { key: 'title', header: 'Role' },
              { key: 'department', header: 'Department' },
              { key: 'applicants', header: 'Applicants', align: 'end' },
              { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
            ]}
            rows={jobs.slice(0, 6)}
          />
        </Surface>

        <Surface title="Recent hires" bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {employees.slice(0, 6).map((e) => (
              <li key={e.id} className="flex items-center gap-3 p-3.5">
                <Avatar size={34} src={e.avatar} name={e.name} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                    {e.name}
                  </div>
                  <div className="truncate text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {e.designation} · {e.department}
                  </div>
                </div>
                <Chip size="sm" variant="soft" color="default">
                  {date(e.joined, 'dd MMM')}
                </Chip>
              </li>
            ))}
          </ul>
        </Surface>
      </div>
    </>
  )
}
