import { useMemo, useState } from 'react'
import { MessageList, Message, TextField, Button, Avatar } from 'oks-ui'
import { Send, ArrowLeft, Search } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { employees } from '../../data/mock'
import { useIsDesktop } from '../../lib/useMediaQuery'

const THREADS = employees.slice(0, 8).map((e, i) => ({
  id: e.id,
  name: e.name,
  avatar: e.avatar,
  last: ['See you at standup', 'Sent the file', 'Thanks!', 'Can we move the call?', 'LGTM', 'On it', 'Great work', 'Ping me later'][i],
  unread: i === 1 ? 2 : 0,
}))

const SEED_BY_THREAD = {
  [THREADS[0].id]: [
    { id: 1, author: THREADS[0].name, align: 'start', text: 'Morning! Did the design review notes land in your inbox?' },
    { id: 2, author: 'You', align: 'end', text: 'Yep, going through them now. The spacing tweaks look good.' },
    { id: 3, author: THREADS[0].name, align: 'start', text: 'Perfect. I’ll prep the Figma handoff this afternoon.' },
    { id: 4, author: 'You', align: 'end', text: 'Thanks — let’s sync at 3 if anything is blocking.' },
  ],
  [THREADS[1].id]: [
    { id: 1, author: THREADS[1].name, align: 'start', text: 'Sent the file over — check your downloads.' },
    { id: 2, author: 'You', align: 'end', text: 'Got it, reviewing now.' },
  ],
}
const genericThread = (name) => [{ id: 1, author: name, align: 'start', text: 'Hey! Free for a quick chat later today?' }]

export default function ChatApp() {
  const isDesktop = useIsDesktop()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)
  const [byThread, setByThread] = useState(() => {
    const out = {}
    THREADS.forEach((t) => {
      out[t.id] = SEED_BY_THREAD[t.id] ?? genericThread(t.name)
    })
    return out
  })
  const [draft, setDraft] = useState('')

  const filtered = useMemo(
    () => THREADS.filter((t) => t.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )
  const openThread = active ?? filtered[0] ?? THREADS[0]
  const messages = byThread[openThread.id] ?? []
  const showList = isDesktop || active === null

  const send = () => {
    if (!draft.trim()) return
    setByThread((cur) => ({
      ...cur,
      [openThread.id]: [...(cur[openThread.id] ?? []), { id: Date.now(), author: 'You', align: 'end', text: draft }],
    }))
    setDraft('')
  }

  return (
    <>
      <PageHeader title="Chat" />
      <Surface bodyClassName="p-0">
        <div className="grid h-[70vh] grid-cols-1 lg:grid-cols-[280px_1fr]">
          <div
            className="flex-col border-r lg:flex"
            style={{ borderColor: 'var(--app-border)', display: showList ? 'flex' : 'none' }}
          >
            <div className="border-b p-3" style={{ borderColor: 'var(--app-border)' }}>
              <TextField
                size="sm"
                variant="filled"
                placeholder="Search conversations"
                aria-label="Search"
                startIcon={<Search size={14} />}
                value={query}
                onChange={setQuery}
              />
            </div>
            <ul className="app-scroll flex-1 overflow-y-auto">
              {filtered.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => setActive(t)}
                    aria-current={openThread.id === t.id ? 'true' : undefined}
                    className="elosh-row-btn flex w-full items-center gap-3 border-b px-3 py-2.5 text-left"
                    style={{
                      borderColor: 'var(--app-border)',
                      background: openThread.id === t.id ? 'var(--app-surface-2)' : undefined,
                    }}
                  >
                    <Avatar size={34} src={t.avatar} name={t.name} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                        {t.name}
                      </div>
                      <div className="truncate text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                        {(byThread[t.id]?.at(-1)?.text) ?? t.last}
                      </div>
                    </div>
                    {t.unread > 0 && (
                      <span
                        className="rounded-full px-1.5 text-[10px] font-semibold text-white"
                        style={{ background: 'var(--app-accent)' }}
                      >
                        {t.unread}
                      </span>
                    )}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="p-4 text-center text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
                  No conversations match “{query}”.
                </li>
              )}
            </ul>
          </div>

          <div
            className="min-w-0 flex-col lg:flex"
            style={{ display: showList && !isDesktop ? 'none' : 'flex' }}
          >
            <div className="flex items-center gap-3 border-b p-3" style={{ borderColor: 'var(--app-border)' }}>
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                color="default"
                aria-label="Back to conversations"
                className="lg:hidden"
                onPress={() => setActive(null)}
              >
                <ArrowLeft size={16} />
              </Button>
              <Avatar size={34} src={openThread.avatar} name={openThread.name} status="online" />
              <div className="text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                {openThread.name}
              </div>
            </div>
            <div className="app-scroll min-h-0 flex-1 overflow-y-auto p-4">
              <MessageList>
                {messages.map((m) => (
                  <Message key={m.id} author={m.author} align={m.align} variant="bubble">
                    {m.text}
                  </Message>
                ))}
              </MessageList>
            </div>
            <div className="flex items-center gap-2 border-t p-3" style={{ borderColor: 'var(--app-border)' }}>
              <TextField
                size="sm"
                variant="bordered"
                placeholder="Write a message"
                aria-label="Message"
                value={draft}
                onChange={setDraft}
                className="flex-1"
              />
              <Button size="sm" color="primary" isIconOnly aria-label="Send" onPress={send}>
                <Send size={15} />
              </Button>
            </div>
          </div>
        </div>
      </Surface>
    </>
  )
}
