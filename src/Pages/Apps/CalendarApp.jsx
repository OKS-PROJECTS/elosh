import { useState } from 'react'
import { Calendar, Button, Modal, Form, FormFieldSet } from 'oks-ui'
import { toast } from 'oks-ui'
import { Plus } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { date as fmtDate } from '../../lib/format'

const COLOR_OPTIONS = [
  { label: 'Accent', value: 'var(--app-accent)' },
  { label: 'Info', value: 'var(--app-info)' },
  { label: 'Purple', value: 'var(--app-purple)' },
  { label: 'Success', value: 'var(--app-ok)' },
  { label: 'Warning', value: 'var(--app-warn)' },
  { label: 'Danger', value: 'var(--app-bad)' },
]

const SEED_EVENTS = [
  { id: 1, day: 4, date: new Date(2026, 8, 4), title: 'Sprint planning', color: 'var(--app-accent)' },
  { id: 2, day: 4, date: new Date(2026, 8, 4), title: '1:1 with Dominic', color: 'var(--app-info)' },
  { id: 3, day: 9, date: new Date(2026, 8, 9), title: 'All-hands', color: 'var(--app-purple)' },
  { id: 4, day: 12, date: new Date(2026, 8, 12), title: 'Design review', color: 'var(--app-ok)' },
  { id: 5, day: 18, date: new Date(2026, 8, 18), title: 'Payroll cut-off', color: 'var(--app-warn)' },
  { id: 6, day: 24, date: new Date(2026, 8, 24), title: 'Company holiday', color: 'var(--app-bad)' },
]

export default function CalendarApp() {
  const [events, setEvents] = useState(SEED_EVENTS)
  const [newOpen, setNewOpen] = useState(false)

  const addEvent = (data) => {
    const d = data.date ? new Date(data.date) : new Date()
    setEvents((cur) =>
      [...cur, { id: Date.now(), day: d.getDate(), date: d, title: data.title, color: data.color || 'var(--app-accent)' }].sort(
        (a, b) => a.date - b.date,
      ),
    )
    setNewOpen(false)
    toast.success('Event added')
  }

  return (
    <>
      <PageHeader
        title="Calendar"
        actions={
          <Button size="sm" color="primary" startContent={<Plus size={15} />} onPress={() => setNewOpen(true)}>
            New event
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        <Surface>
          <Calendar
            size="lg"
            renderDay={(ctx) => {
              const evs = events.filter((e) => e.day === ctx.date.getDate() && ctx.inMonth)
              return (
                <div className="flex flex-col items-center">
                  <span>{ctx.date.getDate()}</span>
                  <span className="mt-0.5 flex gap-0.5">
                    {evs.map((e) => (
                      <span key={e.id} className="h-1 w-1 rounded-full" style={{ background: e.color }} />
                    ))}
                  </span>
                </div>
              )
            }}
          />
        </Surface>
        <Surface title="Upcoming" bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {events.map((e) => (
              <li key={e.id} className="flex items-center gap-3 p-3.5">
                <span className="h-8 w-1 shrink-0 rounded-full" style={{ background: e.color }} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                    {e.title}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {fmtDate(e.date, 'dd MMM yyyy')}
                  </div>
                </div>
              </li>
            ))}
            {events.length === 0 && (
              <li className="p-6 text-center text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
                No events yet.
              </li>
            )}
          </ul>
        </Surface>
      </div>

      <Modal isOpen={newOpen} onClose={() => setNewOpen(false)} title="New event">
        <Form onSubmit={addEvent} initialValues={{ color: COLOR_OPTIONS[0].value }} className="flex flex-col gap-4">
          <FormFieldSet type="text" name="title" label="Title" validation={{ rules: { required: true } }} />
          <FormFieldSet type="datepicker" name="date" label="Date" validation={{ rules: { required: true } }} />
          <FormFieldSet type="select" name="color" label="Colour" options={COLOR_OPTIONS} />
          <div className="flex gap-2">
            <Button type="submit" size="sm" color="primary">
              Add event
            </Button>
            <Button type="button" size="sm" variant="bordered" color="default" onPress={() => setNewOpen(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
