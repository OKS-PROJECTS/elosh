import { Calendar, Button } from 'oks-ui'
import { Plus } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'

const EVENTS = [
  { day: 4, title: 'Sprint planning', color: 'var(--app-accent)' },
  { day: 4, title: '1:1 with Dominic', color: 'var(--app-info)' },
  { day: 9, title: 'All-hands', color: 'var(--app-purple)' },
  { day: 12, title: 'Design review', color: 'var(--app-ok)' },
  { day: 18, title: 'Payroll cut-off', color: 'var(--app-warn)' },
  { day: 24, title: 'Company holiday', color: 'var(--app-bad)' },
]

export default function CalendarApp() {
  return (
    <>
      <PageHeader
        title="Calendar"
        actions={<Button size="sm" color="primary" startContent={<Plus size={15} />}>New event</Button>}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        <Surface>
          <Calendar
            size="lg"
            renderDay={(ctx) => {
              const evs = EVENTS.filter((e) => e.day === ctx.date.getDate() && ctx.inMonth)
              return (
                <div className="flex flex-col items-center">
                  <span>{ctx.date.getDate()}</span>
                  <span className="mt-0.5 flex gap-0.5">
                    {evs.map((e, i) => (
                      <span key={i} className="h-1 w-1 rounded-full" style={{ background: e.color }} />
                    ))}
                  </span>
                </div>
              )
            }}
          />
        </Surface>
        <Surface title="Upcoming" bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {EVENTS.map((e, i) => (
              <li key={i} className="flex items-center gap-3 p-3.5">
                <span className="h-8 w-1 rounded-full" style={{ background: e.color }} />
                <div className="flex-1">
                  <div className="text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                    {e.title}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    Aug {e.day}, 2026
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Surface>
      </div>
    </>
  )
}
