import { useState } from 'react'
import { Button, Chip } from 'oks-ui'
import { Plus, Pin } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { date } from '../../lib/format'

const NOTES = [
  { id: 1, title: 'Onboarding checklist v2', tag: 'People', pinned: true, body: 'Revise the buddy-system step. Add IT provisioning SLA. Loop in facilities for desk setup.' },
  { id: 2, title: 'Comp band review', tag: 'Finance', body: 'Benchmark against Q2 survey. Level 4 looks 6% below market. Draft proposal for leadership.' },
  { id: 3, title: 'Q3 hiring plan', tag: 'Hiring', body: '12 open roles. Prioritise 2 senior engineers and 1 designer. Referral push next month.' },
  { id: 4, title: 'Offsite retro', tag: 'Team', body: 'Sessions ran long. Book a bigger room next time. Catering was a hit. Move to Thursday.' },
  { id: 5, title: 'Policy: parental leave', tag: 'Policy', pinned: true, body: 'Increase to 16 weeks fully paid. Align US and EU. Publish before enrollment window.' },
  { id: 6, title: 'Tooling budget', tag: 'Finance', body: 'Consolidate two overlapping analytics tools. Estimated saving $9k/yr.' },
]

export default function NotesApp() {
  const [active, setActive] = useState(NOTES[0])
  return (
    <>
      <PageHeader
        title="Notes"
        actions={<Button size="sm" color="primary" startContent={<Plus size={15} />}>New note</Button>}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
        <Surface bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {NOTES.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => setActive(n)}
                  className="flex w-full flex-col gap-1 px-4 py-3 text-left"
                  style={{ background: active.id === n.id ? 'var(--app-surface-2)' : 'transparent' }}
                >
                  <span className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                    {n.pinned && <Pin size={12} style={{ color: 'var(--app-accent)' }} />}
                    {n.title}
                  </span>
                  <span className="truncate text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {n.body}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Surface>
        <Surface>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--app-heading)' }}>
              {active.title}
            </h2>
            <Chip size="sm" variant="soft" color="default">
              {active.tag}
            </Chip>
          </div>
          <p className="mt-1 text-xs" style={{ color: 'var(--app-fg-subtle)' }}>
            Edited {date(new Date(2026, 7, 12))}
          </p>
          <p className="mt-4 text-[13px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
            {active.body}
          </p>
        </Surface>
      </div>
    </>
  )
}
