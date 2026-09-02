import { useState } from 'react'
import { Button, Avatar, Chip } from 'oks-ui'
import { Inbox, Send, FileText, Trash2, Star, Reply } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { employees } from '../../data/mock'
import { date } from '../../lib/format'

const FOLDERS = [
  { key: 'inbox', label: 'Inbox', icon: Inbox, count: 12 },
  { key: 'starred', label: 'Starred', icon: Star },
  { key: 'sent', label: 'Sent', icon: Send },
  { key: 'drafts', label: 'Drafts', icon: FileText, count: 3 },
  { key: 'trash', label: 'Trash', icon: Trash2 },
]

const MAILS = employees.slice(0, 10).map((e, i) => ({
  id: e.id,
  from: e.name,
  avatar: e.avatar,
  subject: [
    'Q3 headcount plan for review',
    'Payroll cut-off reminder',
    'New candidate — Senior Engineer',
    'Offsite logistics',
    'Policy update: remote work',
    'Your expense report was approved',
    'Interview feedback needed',
    'Benefits enrollment opens Monday',
    'Design review notes',
    'Welcome to the team!',
  ][i],
  preview: 'Hi — following up on the thread from earlier this week. Let me know your thoughts when you get a chance.',
  date: date(new Date(2026, 7, 20 - i), 'dd MMM'),
  unread: i < 4,
  tag: ['Work', 'Finance', 'Hiring', 'Team', 'Policy'][i % 5],
}))

export default function EmailApp() {
  const [active, setActive] = useState(MAILS[0])

  return (
    <>
      <PageHeader
        title="Email"
        actions={<Button size="sm" color="primary" startContent={<Send size={14} />}>Compose</Button>}
      />
      <Surface bodyClassName="p-0">
        <div className="grid h-[72vh] grid-cols-1 lg:grid-cols-[200px_320px_1fr]">
          <nav className="hidden flex-col gap-1 border-r p-3 lg:flex" style={{ borderColor: 'var(--app-border)' }}>
            {FOLDERS.map((f) => (
              <button
                key={f.key}
                className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px]"
                style={{ color: 'var(--app-fg)' }}
              >
                <f.icon size={15} />
                <span className="flex-1">{f.label}</span>
                {f.count && (
                  <span className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <ul className="app-scroll hidden overflow-y-auto border-r md:block" style={{ borderColor: 'var(--app-border)' }}>
            {MAILS.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => setActive(m)}
                  className="flex w-full flex-col gap-1 border-b px-3.5 py-3 text-left"
                  style={{
                    borderColor: 'var(--app-border)',
                    background: active.id === m.id ? 'var(--app-surface-2)' : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="truncate text-[13px]"
                      style={{ color: 'var(--app-fg-strong)', fontWeight: m.unread ? 600 : 400 }}
                    >
                      {m.from}
                    </span>
                    <span className="shrink-0 text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                      {m.date}
                    </span>
                  </div>
                  <span className="truncate text-[13px]" style={{ color: 'var(--app-fg)' }}>
                    {m.subject}
                  </span>
                  <span className="truncate text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {m.preview}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <article className="app-scroll min-w-0 overflow-y-auto p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--app-heading)' }}>
                {active.subject}
              </h2>
              <Chip size="sm" variant="soft" color="default">
                {active.tag}
              </Chip>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Avatar size={38} src={active.avatar} name={active.from} />
              <div>
                <div className="text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                  {active.from}
                </div>
                <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                  to me · {active.date}
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-[13px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
              <p>{active.preview}</p>
              <p>
                We should align on the numbers before the leadership review. I’ve attached a draft — feel
                free to leave comments directly.
              </p>
              <p>Best,<br />{active.from}</p>
            </div>
            <div className="mt-6 flex gap-2">
              <Button size="sm" variant="bordered" color="default" startContent={<Reply size={14} />}>
                Reply
              </Button>
              <Button size="sm" variant="ghost" color="default" isIconOnly aria-label="Delete">
                <Trash2 size={15} />
              </Button>
            </div>
          </article>
        </div>
      </Surface>
    </>
  )
}
