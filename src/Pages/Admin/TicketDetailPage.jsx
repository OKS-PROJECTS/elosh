import { Link } from 'react-router-dom'
import {
  Avatar,
  Button,
  Chip,
  Timeline,
  TimelineItem,
  TextField,
  Divider,
} from 'oks-ui'
import { ArrowLeft, Send, Paperclip } from 'lucide-react'
import { PageHeader, Surface, StatusChip } from '../../Components/ui'
import { tickets, employees } from '../../data/mock'
import { date } from '../../lib/format'

const t = tickets[0]
const requester = { name: t.requester, avatar: employees[3].avatar }
const agent = { ...employees[8], name: t.agent }

const CONVO = [
  { who: requester.name, avatar: requester.avatar, when: '3 days ago', text: 'I still can’t open my payslip — it just spins and then shows an error.' },
  { who: agent.name, avatar: agent.avatar, when: '3 days ago', text: 'Thanks for flagging. Can you tell me which browser you’re on and share a screenshot?' },
  { who: requester.name, avatar: requester.avatar, when: '2 days ago', text: 'Chrome on macOS. Screenshot attached.' },
  { who: agent.name, avatar: agent.avatar, when: '1 day ago', text: 'Reproduced it. Looks like a permissions issue on the payslip service — escalating to engineering.' },
]

export default function TicketDetailPage() {
  return (
    <>
      <PageHeader
        title={`Ticket ${t.id}`}
        actions={
          <Button as={Link} to="/admin/tickets" size="sm" variant="bordered" color="default" startContent={<ArrowLeft size={14} />}>
            Back to tickets
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-5">
          <Surface>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--app-heading)' }}>
                {t.subject}
              </h2>
              <StatusChip status={t.status} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs" style={{ color: 'var(--app-fg-muted)' }}>
              <span>Opened {date(t.created)}</span>
              <span>·</span>
              <span>Requester {t.requester}</span>
              <span>·</span>
              <Chip size="sm" variant="soft" color={t.priority === 'Urgent' || t.priority === 'High' ? 'danger' : 'default'}>
                {t.priority} priority
              </Chip>
            </div>
          </Surface>

          <Surface title="Conversation">
            <Timeline>
              {CONVO.map((c, i) => (
                <TimelineItem key={i} title={c.who} time={c.when} icon={<span />} color="primary">
                  <div className="flex items-start gap-3">
                    <Avatar size={28} src={c.avatar} name={c.who} />
                    <p className="text-[13px]" style={{ color: 'var(--app-fg)' }}>
                      {c.text}
                    </p>
                  </div>
                </TimelineItem>
              ))}
            </Timeline>
            <Divider className="my-4" />
            <div className="flex items-center gap-2">
              <TextField
                size="sm"
                variant="bordered"
                placeholder="Write a reply"
                aria-label="Reply"
                className="flex-1"
              />
              <Button size="sm" variant="ghost" color="default" isIconOnly aria-label="Attach">
                <Paperclip size={15} />
              </Button>
              <Button size="sm" color="primary" isIconOnly aria-label="Send">
                <Send size={15} />
              </Button>
            </div>
          </Surface>
        </div>

        <div className="flex flex-col gap-5">
          <Surface title="Details">
            <dl className="flex flex-col gap-3 text-[13px]">
              {[
                ['Status', <StatusChip key="s" status={t.status} />],
                ['Assignee', agent.name],
                ['Requester', requester.name],
                ['Category', 'Payroll'],
                ['Priority', t.priority],
                ['Created', date(t.created)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt style={{ color: 'var(--app-fg-muted)' }}>{k}</dt>
                  <dd style={{ color: 'var(--app-fg-strong)' }}>{v}</dd>
                </div>
              ))}
            </dl>
          </Surface>
          <Surface title="Assignee">
            <div className="flex items-center gap-3">
              <Avatar size={40} src={agent.avatar} name={agent.name} />
              <div>
                <div className="text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                  {agent.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                  {agent.designation}
                </div>
              </div>
            </div>
          </Surface>
        </div>
      </div>
    </>
  )
}
