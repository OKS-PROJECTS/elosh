import { Link } from 'react-router-dom'
import {
  Avatar,
  Button,
  Chip,
  Progress,
  Timeline,
  TimelineItem,
  Alert,
} from 'oks-ui'
import {
  Phone,
  Mail,
  UserRound,
  CalendarDays,
  Plus,
  Cake,
  Clock,
} from 'lucide-react'
import { PageHeader, Surface, DonutCard, ChartCard, MiniTable, StatusChip } from '../../Components/ui'
import { date } from '../../lib/format'
import * as d from '../../data/dashboard'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-white/50">
        <Icon size={15} />
      </span>
      <div>
        <div className="text-xs text-white/50">{label}</div>
        <div className="text-[13px] font-medium text-white">{value}</div>
      </div>
    </div>
  )
}

export default function EmployeeDashboard() {
  return (
    <>
      <PageHeader
        title="Employee Dashboard"
        actions={
          <>
            <Button size="sm" variant="bordered" color="default" startContent={<CalendarDays size={14} />}>
              {date(new Date(), 'dd MMM yyyy')}
            </Button>
            <Button size="sm" color="primary" startContent={<Plus size={15} />}>
              Add Schedule
            </Button>
          </>
        }
      />

      <Alert
        color="success"
        variant="soft"
        className="mb-5"
        description="Your leave request for 24 Apr 2026 has been approved."
        isClosable
      />

      {/* profile banner */}
      <div
        className="mb-5 rounded-[--app-card-radius] p-5"
        style={{ background: '#1c2434', color: '#fff' }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar size={64} src={d.me.avatar} name={d.me.name} isBordered />
          <div>
            <h2 className="text-lg font-semibold text-white">{d.me.name}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/70">
              <span>{d.me.title}</span>
              <Chip size="sm" variant="soft" color="primary">
                {d.me.team}
              </Chip>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoRow icon={Phone} label="Phone number" value={d.me.phone} />
          <InfoRow icon={Mail} label="Email address" value={d.me.email} />
          <InfoRow icon={UserRound} label="Reports to" value={d.me.reportsTo} />
          <InfoRow icon={CalendarDays} label="Joined on" value={date(d.me.joined)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <DonutCard
          title="Attendance breakdown"
          subtitle="This year"
          data={d.leaveBreakdown}
          centerValue={`${Math.round(
            (d.leaveBreakdown[0].value / d.leaveBreakdown.reduce((s, x) => s + x.value, 0)) * 100,
          )}%`}
          centerLabel="on time"
        />

        <Surface title="Leave details" subtitle="This year" actions={<Button size="sm" variant="bordered" color="default">2026</Button>}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {d.leaveSummary.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold" style={{ color: 'var(--app-heading)' }}>
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-5" size="sm" color="primary" fullWidth startContent={<Plus size={15} />}>
            Apply new leave
          </Button>
        </Surface>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Attendance"
            subtitle="Hours worked this week"
            type="column"
            data={d.attendanceSeries}
            x="day"
            series={[{ key: 'hours', name: 'Hours' }]}
            height={260}
          />
        </div>
        <Surface title="Performance" subtitle="Review score trend">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold" style={{ color: 'var(--app-heading)' }}>
              91%
            </span>
            <span className="text-xs font-medium" style={{ color: 'var(--app-ok)' }}>
              +12% vs last cycle
            </span>
          </div>
          <div className="mt-2">
            <ChartCard
              title=""
              type="area"
              data={d.performanceSeries}
              x="month"
              series={[{ key: 'score', name: 'Score' }]}
              height={140}
            />
          </div>
        </Surface>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Surface title="My skills">
          <ul className="flex flex-col gap-4">
            {d.skills.map((s) => (
              <li key={s.label}>
                <div className="mb-1 flex items-center justify-between text-[13px]">
                  <span style={{ color: 'var(--app-fg)' }}>{s.label}</span>
                  <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                    {s.value}%
                  </span>
                </div>
                <Progress value={s.value} color="primary" size="sm" aria-label={s.label} />
              </li>
            ))}
          </ul>
        </Surface>

        <Surface title="Ongoing projects" bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {d.myProjects.map((p) => (
              <li key={p.id} className="p-4">
                <div className="flex items-center justify-between">
                  <Link
                    to="/projects/list"
                    className="text-[13px] font-semibold hover:underline"
                    style={{ color: 'var(--app-heading)' }}
                  >
                    {p.name}
                  </Link>
                  <span className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {date(p.deadline, 'dd MMM')}
                  </span>
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                  Lead: {p.lead} · Tasks {p.tasksDone}/10
                </div>
                <Progress className="mt-2" value={p.progress} color="primary" size="sm" aria-label={`${p.name} progress`} />
              </li>
            ))}
          </ul>
        </Surface>

        <Surface title="Team birthdays" bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {d.birthdays.map((b) => (
              <li key={b.id} className="flex items-center gap-3 p-4">
                <Avatar size={34} src={b.avatar} name={b.name} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                    {b.name}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {b.date}
                  </div>
                </div>
                <Cake size={16} style={{ color: 'var(--app-pink)' }} />
              </li>
            ))}
          </ul>
        </Surface>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Surface title="My tasks" bodyClassName="p-0" actions={<Button as={Link} to="/projects/tasks" size="sm" variant="bordered" color="default">All tasks</Button>}>
            <MiniTable
              ariaLabel="My tasks"
              columns={[
                { key: 'title', header: 'Task' },
                { key: 'project', header: 'Project' },
                { key: 'due', header: 'Due', render: (r) => date(r.due, 'dd MMM') },
                { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
              ]}
              rows={d.myTasks}
            />
          </Surface>
        </div>
        <Surface title="Notifications">
          <Timeline>
            {d.notifications.map((n) => (
              <TimelineItem key={n.id} time={n.when} icon={<Clock size={12} />} color="primary">
                <span className="text-[13px]" style={{ color: 'var(--app-fg)' }}>
                  {n.text}
                </span>
              </TimelineItem>
            ))}
          </Timeline>
        </Surface>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Surface title="Team members" bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {d.teamMembers.map((m) => (
              <li key={m.id} className="flex items-center gap-3 p-3.5">
                <Avatar size={34} src={m.avatar} name={m.name} status={m.status === 'online' ? 'online' : 'offline'} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                    {m.name}
                  </div>
                  <div className="truncate text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {m.role}
                  </div>
                </div>
                <Button size="sm" variant="ghost" color="default" isIconOnly aria-label={`Message ${m.name}`}>
                  <Mail size={15} />
                </Button>
              </li>
            ))}
          </ul>
        </Surface>

        <Surface title="Today's meetings" bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {d.meetings.map((m) => (
              <li key={m.id} className="flex items-center gap-3 p-4">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: 'var(--app-accent-soft)', color: 'var(--app-accent)' }}
                >
                  <CalendarDays size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                    {m.title}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {m.with}
                  </div>
                </div>
                <span className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                  {m.time}
                </span>
              </li>
            ))}
          </ul>
        </Surface>
      </div>
    </>
  )
}
