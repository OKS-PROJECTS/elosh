import { useState } from 'react'
import { Board, Avatar, Chip, Button } from 'oks-ui'
import { Plus } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { tasks, employees } from '../../data/mock'

const COLUMNS = [
  { id: 'todo', title: 'To do', color: 'default' },
  { id: 'progress', title: 'In progress', color: 'info' },
  { id: 'review', title: 'Review', color: 'warning' },
  { id: 'done', title: 'Done', color: 'success' },
]

const COL_BY_STATUS = { Pending: 'todo', 'In Progress': 'progress', 'On Hold': 'review', Completed: 'done' }

export default function KanbanApp() {
  const [items, setItems] = useState(
    tasks.slice(0, 16).map((t, i) => ({
      id: t.id,
      title: t.title,
      project: t.project,
      priority: t.priority,
      assignee: employees[i % employees.length],
      column: COL_BY_STATUS[t.status] ?? 'todo',
    })),
  )

  return (
    <>
      <PageHeader
        title="Kanban"
        actions={<Button size="sm" color="primary" startContent={<Plus size={15} />}>Add card</Button>}
      />
      <Surface bodyClassName="p-3">
        <div className="h-[70vh]">
          <Board
            columns={COLUMNS}
            items={items}
            getItemId={(it) => it.id}
            getItemColumn={(it) => it.column}
            columnWidth={280}
            onItemMove={({ itemId, to }) =>
              setItems((cur) =>
                cur.map((it) => (it.id === itemId ? { ...it, column: to.columnId } : it)),
              )
            }
            renderCard={(it) => (
              <div
                className="rounded-md border p-3"
                style={{ background: 'var(--app-surface)', borderColor: 'var(--app-border)' }}
              >
                <div className="text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                  {it.title}
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                  {it.project}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <Chip
                    size="sm"
                    variant="soft"
                    color={it.priority === 'High' ? 'danger' : it.priority === 'Medium' ? 'warning' : 'default'}
                  >
                    {it.priority}
                  </Chip>
                  <Avatar size={24} src={it.assignee.avatar} name={it.assignee.name} />
                </div>
              </div>
            )}
          />
        </div>
      </Surface>
    </>
  )
}
