import { Avatar, Button, Tabs, Tab, Progress, Timeline, TimelineItem } from 'oks-ui'
import { Mail, Phone, MapPin, Building2, CalendarDays } from 'lucide-react'
import { PageHeader, Surface, MiniTable, StatusChip } from '../../Components/ui'
import { me, skills, myProjects } from '../../data/dashboard'
import { date } from '../../lib/format'
import { tasks } from '../../data/mock'

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Profile" />
      <Surface className="mb-5" bodyClassName="p-0">
        <div className="h-24" style={{ background: 'var(--app-accent-soft)' }} />
        <div className="flex flex-col gap-4 px-5 pb-5 sm:flex-row sm:items-end">
          <Avatar
            size={88}
            src={me.avatar}
            name={me.name}
            isBordered
            classNames={{ base: '-mt-11 shrink-0' }}
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--app-heading)' }}>
              {me.name}
            </h2>
            <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
              {me.title} · {me.team}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="bordered" color="default" startContent={<Mail size={14} />}>
              Message
            </Button>
            <Button size="sm" color="primary">
              Edit profile
            </Button>
          </div>
        </div>
      </Surface>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Surface title="About">
          <ul className="flex flex-col gap-3 text-[13px]">
            <li className="flex items-center gap-2" style={{ color: 'var(--app-fg)' }}>
              <Mail size={14} style={{ color: 'var(--app-fg-subtle)' }} /> {me.email}
            </li>
            <li className="flex items-center gap-2" style={{ color: 'var(--app-fg)' }}>
              <Phone size={14} style={{ color: 'var(--app-fg-subtle)' }} /> {me.phone}
            </li>
            <li className="flex items-center gap-2" style={{ color: 'var(--app-fg)' }}>
              <Building2 size={14} style={{ color: 'var(--app-fg-subtle)' }} /> Reports to {me.reportsTo}
            </li>
            <li className="flex items-center gap-2" style={{ color: 'var(--app-fg)' }}>
              <MapPin size={14} style={{ color: 'var(--app-fg-subtle)' }} /> Austin, TX
            </li>
            <li className="flex items-center gap-2" style={{ color: 'var(--app-fg)' }}>
              <CalendarDays size={14} style={{ color: 'var(--app-fg-subtle)' }} /> Joined {date(me.joined)}
            </li>
          </ul>
          <div className="mt-5">
            <h4 className="mb-2 text-[13px] font-semibold" style={{ color: 'var(--app-heading)' }}>
              Skills
            </h4>
            {skills.map((s) => (
              <div key={s.label} className="mb-2">
                <div className="mb-1 flex justify-between text-xs" style={{ color: 'var(--app-fg)' }}>
                  <span>{s.label}</span>
                  <span>{s.value}%</span>
                </div>
                <Progress value={s.value} color="primary" size="sm" aria-label={s.label} />
              </div>
            ))}
          </div>
        </Surface>

        <div className="lg:col-span-2">
          <Surface bodyClassName="p-0">
            <Tabs variant="underlined" size="sm" classNames={{ panel: 'p-5' }}>
              <Tab key="activity" title="Activity">
                <Timeline>
                  <TimelineItem title="Completed a task" time="2h ago" color="success">
                    Accessibility audit — Care Portal
                  </TimelineItem>
                  <TimelineItem title="Commented" time="Yesterday" color="info">
                    Left feedback on the onboarding flow
                  </TimelineItem>
                  <TimelineItem title="Joined a project" time="3d ago" color="primary">
                    Added to Fleet Tracker
                  </TimelineItem>
                </Timeline>
              </Tab>
              <Tab key="projects" title="Projects">
                <MiniTable
                  ariaLabel="Projects"
                  columns={[
                    { key: 'name', header: 'Project' },
                    { key: 'lead', header: 'Lead' },
                    { key: 'progress', header: 'Progress', align: 'end', render: (r) => `${r.progress}%` },
                    { key: 'deadline', header: 'Deadline', render: (r) => date(r.deadline, 'dd MMM') },
                  ]}
                  rows={myProjects}
                />
              </Tab>
              <Tab key="tasks" title="Tasks">
                <MiniTable
                  ariaLabel="Tasks"
                  columns={[
                    { key: 'title', header: 'Task' },
                    { key: 'project', header: 'Project' },
                    { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
                  ]}
                  rows={tasks.slice(0, 6)}
                />
              </Tab>
            </Tabs>
          </Surface>
        </div>
      </div>
    </>
  )
}
