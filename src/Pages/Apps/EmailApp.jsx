import { useState } from 'react'
import { Button, Avatar, Chip, Modal, Form, FormFieldSet, EmptyState, toast } from 'oks-ui'
import { Inbox, Send, FileText, Trash2, Star, Reply, ArrowLeft, Mail } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { employees } from '../../data/mock'
import { date } from '../../lib/format'
import { useIsDesktop } from '../../lib/useMediaQuery'

const FOLDERS = [
  { key: 'inbox', label: 'Inbox', icon: Inbox },
  { key: 'starred', label: 'Starred', icon: Star },
  { key: 'sent', label: 'Sent', icon: Send },
  { key: 'drafts', label: 'Drafts', icon: FileText },
  { key: 'trash', label: 'Trash', icon: Trash2 },
]

const SUBJECTS = [
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
]

const SEED_MAILS = employees.slice(0, 10).map((e, i) => ({
  id: e.id,
  from: e.name,
  avatar: e.avatar,
  subject: SUBJECTS[i],
  preview: 'Hi — following up on the thread from earlier this week. Let me know your thoughts when you get a chance.',
  date: date(new Date(2026, 7, 20 - i), 'dd MMM'),
  unread: i < 4,
  starred: i === 0 || i === 2,
  tag: ['Work', 'Finance', 'Hiring', 'Team', 'Policy'][i % 5],
  folder: i === 7 ? 'sent' : i >= 8 ? 'drafts' : 'inbox',
}))

export default function EmailApp() {
  const isDesktop = useIsDesktop()
  const [mails, setMails] = useState(SEED_MAILS)
  const [folder, setFolder] = useState('inbox')
  const [activeId, setActiveId] = useState(SEED_MAILS[0].id)
  const [composeOpen, setComposeOpen] = useState(false)
  const [replying, setReplying] = useState(false)

  const visible = mails.filter((m) => (folder === 'starred' ? m.starred : m.folder === folder))
  const openMail = visible.find((m) => m.id === activeId) ?? visible[0] ?? null
  const showList = isDesktop || activeId === null

  const selectFolder = (key) => {
    setFolder(key)
    const first = mails.filter((m) => (key === 'starred' ? m.starred : m.folder === key))[0]
    setActiveId(isDesktop ? first?.id ?? null : null)
    setReplying(false)
  }

  const openMailItem = (m) => {
    setActiveId(m.id)
    setReplying(false)
  }

  const deleteMail = () => {
    if (!openMail) return
    setMails((cur) => cur.map((m) => (m.id === openMail.id ? { ...m, folder: 'trash', starred: false } : m)))
    toast.success('Moved to trash')
    setActiveId(null)
  }

  const sendCompose = (data) => {
    const id = `sent-${Date.now()}`
    setMails((cur) => [
      { id, from: data.to || 'New recipient', avatar: null, subject: data.subject || '(no subject)', preview: data.body || '', date: date(new Date()), unread: false, starred: false, tag: 'Work', folder: 'sent' },
      ...cur,
    ])
    setComposeOpen(false)
    toast.success('Message sent')
  }

  return (
    <>
      <PageHeader
        title="Email"
        actions={
          <Button size="sm" color="primary" startContent={<Send size={14} />} onPress={() => setComposeOpen(true)}>
            Compose
          </Button>
        }
      />
      <Surface bodyClassName="p-0">
        <div className="grid h-[72vh] grid-cols-1 lg:grid-cols-[200px_320px_1fr]">
          <nav className="hidden flex-col gap-1 border-r p-3 lg:flex" style={{ borderColor: 'var(--app-border)' }}>
            {FOLDERS.map((f) => {
              const count = mails.filter((m) => (f.key === 'starred' ? m.starred : m.folder === f.key)).length
              return (
                <button
                  key={f.key}
                  onClick={() => selectFolder(f.key)}
                  aria-current={folder === f.key ? 'true' : undefined}
                  className="elosh-row-btn flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px]"
                  style={{
                    color: folder === f.key ? 'var(--app-accent)' : 'var(--app-fg)',
                    background: folder === f.key ? 'var(--app-accent-soft)' : undefined,
                    fontWeight: folder === f.key ? 500 : 400,
                  }}
                >
                  <f.icon size={15} />
                  <span className="flex-1">{f.label}</span>
                  {count > 0 && (
                    <span className="text-xs" style={{ color: folder === f.key ? 'var(--app-accent)' : 'var(--app-fg-muted)' }}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          <ul
            className="app-scroll overflow-y-auto border-r md:block"
            style={{ borderColor: 'var(--app-border)', display: showList ? 'block' : 'none' }}
          >
            {visible.length === 0 && (
              <div className="p-6">
                <EmptyState size="sm" icon={<Mail size={22} />} title="No mail here" description="This folder is empty." />
              </div>
            )}
            {visible.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => openMailItem(m)}
                  aria-current={openMail?.id === m.id ? 'true' : undefined}
                  className="elosh-row-btn flex w-full flex-col gap-1 border-b px-3.5 py-3 text-left"
                  style={{
                    borderColor: 'var(--app-border)',
                    background: openMail?.id === m.id ? 'var(--app-surface-2)' : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="flex items-center gap-1.5 truncate text-[13px]"
                      style={{ color: 'var(--app-fg-strong)', fontWeight: m.unread ? 600 : 400 }}
                    >
                      {m.starred && <Star size={12} fill="currentColor" style={{ color: 'var(--app-warn)' }} />}
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

          <article
            className="app-scroll min-w-0 overflow-y-auto p-5"
            style={{ display: showList && !isDesktop ? 'none' : 'block' }}
          >
            {!openMail ? (
              <EmptyState icon={<Mail size={24} />} title="No message selected" description="Choose an email from the list." />
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  color="default"
                  startContent={<ArrowLeft size={14} />}
                  className="mb-4 lg:hidden"
                  onPress={() => setActiveId(null)}
                >
                  Back to inbox
                </Button>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--app-heading)' }}>
                    {openMail.subject}
                  </h2>
                  <Chip size="sm" variant="soft" color="default">
                    {openMail.tag}
                  </Chip>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar size={38} src={openMail.avatar} name={openMail.from} />
                  <div>
                    <div className="text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                      {openMail.from}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                      to me · {openMail.date}
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-[13px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
                  <p>{openMail.preview}</p>
                  <p>
                    We should align on the numbers before the leadership review. I’ve attached a draft — feel
                    free to leave comments directly.
                  </p>
                  <p>Best,<br />{openMail.from}</p>
                </div>

                {!replying ? (
                  <div className="mt-6 flex gap-2">
                    <Button size="sm" variant="bordered" color="default" startContent={<Reply size={14} />} onPress={() => setReplying(true)}>
                      Reply
                    </Button>
                    <Button size="sm" variant="ghost" color="default" isIconOnly aria-label="Delete" onPress={deleteMail}>
                      <Trash2 size={15} />
                    </Button>
                  </div>
                ) : (
                  <Form
                    className="mt-6 flex flex-col gap-3 border-t pt-4"
                    style={{ borderColor: 'var(--app-border)' }}
                    onSubmit={() => {
                      toast.success('Reply sent')
                      setReplying(false)
                    }}
                  >
                    <FormFieldSet
                      type="textarea"
                      name="reply"
                      label={`Reply to ${openMail.from}`}
                      placeholder="Write your reply…"
                      validation={{ rules: { required: true } }}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" color="primary">
                        Send reply
                      </Button>
                      <Button type="button" size="sm" variant="bordered" color="default" onPress={() => setReplying(false)}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </>
            )}
          </article>
        </div>
      </Surface>

      <Modal
        isOpen={composeOpen}
        onClose={() => setComposeOpen(false)}
        title="New message"
        size="lg"
      >
        <Form onSubmit={sendCompose} className="flex flex-col gap-4">
          <FormFieldSet type="email" name="to" label="To" placeholder="name@company.com" validation={{ rules: { required: true, email: true } }} />
          <FormFieldSet type="text" name="subject" label="Subject" validation={{ rules: { required: true } }} />
          <FormFieldSet type="textarea" name="body" label="Message" placeholder="Write your message…" />
          <div className="flex gap-2">
            <Button type="submit" size="sm" color="primary" startContent={<Send size={14} />}>
              Send
            </Button>
            <Button type="button" size="sm" variant="bordered" color="default" onPress={() => setComposeOpen(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
