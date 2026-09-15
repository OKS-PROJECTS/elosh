import { useState } from 'react'
import { Button, Chip, TextField, TextAreaField, toast } from 'oks-ui'
import { Plus, Pin, Trash2 } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { date } from '../../lib/format'

const SEED_NOTES = [
  { id: 1, title: 'Onboarding checklist v2', tag: 'People', pinned: true, body: 'Revise the buddy-system step. Add IT provisioning SLA. Loop in facilities for desk setup.', edited: new Date(2026, 7, 12) },
  { id: 2, title: 'Comp band review', tag: 'Finance', body: 'Benchmark against Q2 survey. Level 4 looks 6% below market. Draft proposal for leadership.', edited: new Date(2026, 7, 10) },
  { id: 3, title: 'Q3 hiring plan', tag: 'Hiring', body: '12 open roles. Prioritise 2 senior engineers and 1 designer. Referral push next month.', edited: new Date(2026, 7, 8) },
  { id: 4, title: 'Offsite retro', tag: 'Team', body: 'Sessions ran long. Book a bigger room next time. Catering was a hit. Move to Thursday.', edited: new Date(2026, 7, 5) },
  { id: 5, title: 'Policy: parental leave', tag: 'Policy', pinned: true, body: 'Increase to 16 weeks fully paid. Align US and EU. Publish before enrollment window.', edited: new Date(2026, 7, 3) },
  { id: 6, title: 'Tooling budget', tag: 'Finance', body: 'Consolidate two overlapping analytics tools. Estimated saving $9k/yr.', edited: new Date(2026, 7, 1) },
]

export default function NotesApp() {
  const [notes, setNotes] = useState(SEED_NOTES)
  const [activeId, setActiveId] = useState(SEED_NOTES[0].id)
  const active = notes.find((n) => n.id === activeId) ?? notes[0]

  const update = (field, value) => {
    setNotes((cur) => cur.map((n) => (n.id === activeId ? { ...n, [field]: value, edited: new Date() } : n)))
  }

  const addNote = () => {
    const id = Date.now()
    const fresh = { id, title: 'Untitled note', tag: 'General', body: '', edited: new Date() }
    setNotes((cur) => [fresh, ...cur])
    setActiveId(id)
  }

  const deleteNote = () => {
    if (!active) return
    setNotes((cur) => cur.filter((n) => n.id !== active.id))
    setActiveId((cur) => notes.find((n) => n.id !== cur)?.id ?? null)
    toast.success('Note deleted')
  }

  return (
    <>
      <PageHeader
        title="Notes"
        actions={
          <Button size="sm" color="primary" startContent={<Plus size={15} />} onPress={addNote}>
            New note
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
        <Surface bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => setActiveId(n.id)}
                  aria-current={active?.id === n.id ? 'true' : undefined}
                  className="elosh-row-btn flex w-full flex-col gap-1 px-4 py-3 text-left"
                  style={{ background: active?.id === n.id ? 'var(--app-surface-2)' : undefined }}
                >
                  <span className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                    {n.pinned && <Pin size={12} style={{ color: 'var(--app-accent)' }} />}
                    {n.title || 'Untitled note'}
                  </span>
                  <span className="truncate text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                    {n.body || 'No content yet'}
                  </span>
                </button>
              </li>
            ))}
            {notes.length === 0 && (
              <li className="p-6 text-center text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
                No notes yet.
              </li>
            )}
          </ul>
        </Surface>
        {active ? (
          <Surface>
            <div className="flex items-start justify-between gap-3">
              <TextField
                variant="underlined"
                size="lg"
                value={active.title}
                onChange={(v) => update('title', v)}
                aria-label="Note title"
                placeholder="Untitled note"
                className="flex-1"
              />
              <div className="flex shrink-0 items-center gap-2">
                <Chip size="sm" variant="soft" color="default">
                  {active.tag}
                </Chip>
                <Button size="sm" variant="ghost" color="danger" isIconOnly aria-label="Delete note" onPress={deleteNote}>
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
            <p className="mt-1 text-xs" style={{ color: 'var(--app-fg-subtle)' }}>
              Edited {date(active.edited)}
            </p>
            <TextAreaField
              className="mt-4"
              value={active.body}
              onChange={(v) => update('body', v)}
              aria-label="Note body"
              placeholder="Start writing…"
              rows={10}
            />
          </Surface>
        ) : (
          <Surface>
            <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
              Select or create a note.
            </p>
          </Surface>
        )}
      </div>
    </>
  )
}
