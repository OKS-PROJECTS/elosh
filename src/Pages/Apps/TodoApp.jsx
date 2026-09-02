import { useState } from 'react'
import { Checkbox, Chip, TextField, Button } from 'oks-ui'
import { Plus } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'

const SEED = [
  { id: 1, text: 'Approve pending leave requests', done: false, tag: 'HR' },
  { id: 2, text: 'Review Q3 hiring plan', done: false, tag: 'Hiring' },
  { id: 3, text: 'Sign off payroll for August', done: true, tag: 'Finance' },
  { id: 4, text: 'Publish updated remote-work policy', done: false, tag: 'Policy' },
  { id: 5, text: 'Prep board deck', done: false, tag: 'Exec' },
  { id: 6, text: 'Onboard two new engineers', done: true, tag: 'People' },
]

export default function TodoApp() {
  const [items, setItems] = useState(SEED)
  const [draft, setDraft] = useState('')
  const add = () => {
    if (!draft.trim()) return
    setItems((x) => [{ id: Date.now(), text: draft, done: false, tag: 'General' }, ...x])
    setDraft('')
  }
  return (
    <>
      <PageHeader title="To Do" />
      <Surface>
        <div className="mb-4 flex gap-2">
          <TextField
            size="sm"
            variant="bordered"
            placeholder="Add a task"
            aria-label="New task"
            value={draft}
            onChange={setDraft}
            className="flex-1"
          />
          <Button size="sm" color="primary" isIconOnly aria-label="Add" onPress={add}>
            <Plus size={15} />
          </Button>
        </div>
        <ul className="flex flex-col divide-y" style={{ borderColor: 'var(--app-border)' }}>
          {items.map((it) => (
            <li key={it.id} className="flex items-center gap-3 py-3">
              <Checkbox
                checked={it.done}
                onChange={(v) => setItems((x) => x.map((t) => (t.id === it.id ? { ...t, done: v } : t)))}
                aria-label={it.text}
              />
              <span
                className="flex-1 text-[13px]"
                style={{
                  color: it.done ? 'var(--app-fg-subtle)' : 'var(--app-fg-strong)',
                  textDecoration: it.done ? 'line-through' : 'none',
                }}
              >
                {it.text}
              </span>
              <Chip size="sm" variant="soft" color="default">
                {it.tag}
              </Chip>
            </li>
          ))}
        </ul>
      </Surface>
    </>
  )
}
