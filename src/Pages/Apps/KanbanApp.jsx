import { useState } from 'react'
import { Board, Avatar, Chip, Button, Modal, Form, FormFieldSet, toast } from 'oks-ui'
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
  const [addOpen, setAddOpen] = useState(false)

  const addCard = (data) => {
    const assignee = employees.find((e) => e.id === data.assignee) ?? employees[0]
    setItems((cur) => [
      ...cur,
      {
        id: `card-${Date.now()}`,
        title: data.title,
        project: data.project || 'General',
        priority: data.priority || 'Medium',
        assignee,
        column: 'todo',
      },
    ])
    setAddOpen(false)
    toast.success('Card added to To do')
  }

  return (
    <>
      <PageHeader
        title="Kanban"
        actions={
          <Button size="sm" color="primary" startContent={<Plus size={15} />} onPress={() => setAddOpen(true)}>
            Add card
          </Button>
        }
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

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add card">
        <Form onSubmit={addCard} initialValues={{ priority: 'Medium' }} className="flex flex-col gap-4">
          <FormFieldSet type="text" name="title" label="Title" validation={{ rules: { required: true } }} />
          <FormFieldSet type="text" name="project" label="Project" />
          <FormFieldSet
            type="select"
            name="priority"
            label="Priority"
            options={[
              { label: 'Low', value: 'Low' },
              { label: 'Medium', value: 'Medium' },
              { label: 'High', value: 'High' },
            ]}
          />
          <FormFieldSet
            type="select"
            name="assignee"
            label="Assignee"
            options={employees.slice(0, 12).map((e) => ({ label: e.name, value: e.id }))}
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm" color="primary">
              Add card
            </Button>
            <Button type="button" size="sm" variant="bordered" color="default" onPress={() => setAddOpen(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
