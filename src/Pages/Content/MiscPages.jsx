import { useState } from 'react'
import {
  Button,
  Chip,
  Accordion,
  AccordionItem,
  Timeline,
  TimelineItem,
  SegmentedControl,
  TextField,
  Avatar,
} from 'oks-ui'
import { Check, Search } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { activities, employees } from '../../data/mock'
import { date } from '../../lib/format'

/* ---------------- Pricing ---------------- */
const PLANS = [
  { name: 'Starter', price: 0, tag: 'Free', features: ['Up to 10 employees', 'Core HR', 'Time off tracking', 'Email support'] },
  { name: 'Growth', price: 49, tag: 'Popular', features: ['Unlimited employees', 'Payroll & payslips', 'Recruitment pipeline', 'Performance reviews', 'Priority support'] },
  { name: 'Enterprise', price: null, tag: 'Custom', features: ['SSO & SCIM', 'Custom roles', 'Audit logs', 'Dedicated CSM', 'SLA'] },
]

export function PricingPage() {
  const [cycle, setCycle] = useState('monthly')
  return (
    <>
      <PageHeader title="Pricing" />
      <div className="mb-6 flex justify-center">
        <SegmentedControl
          aria-label="Billing cycle"
          value={cycle}
          onChange={setCycle}
          options={[
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly (-20%)', value: 'yearly' },
          ]}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {PLANS.map((p) => (
          <Surface key={p.name} className={p.tag === 'Popular' ? 'ring-2' : ''}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold" style={{ color: 'var(--app-heading)' }}>
                {p.name}
              </h3>
              <Chip size="sm" variant="soft" color={p.tag === 'Popular' ? 'primary' : 'default'}>
                {p.tag}
              </Chip>
            </div>
            <div className="mt-3 text-2xl font-bold" style={{ color: 'var(--app-heading)' }}>
              {p.price === null ? 'Contact us' : p.price === 0 ? '$0' : `$${cycle === 'yearly' ? Math.round(p.price * 0.8) : p.price}`}
              {p.price ? <span className="text-sm font-normal" style={{ color: 'var(--app-fg-muted)' }}> /user/mo</span> : null}
            </div>
            <ul className="mt-4 flex flex-col gap-2 text-[13px]" style={{ color: 'var(--app-fg)' }}>
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check size={14} style={{ color: 'var(--app-ok)' }} /> {f}
                </li>
              ))}
            </ul>
            <Button className="mt-5" fullWidth size="sm" color={p.tag === 'Popular' ? 'primary' : 'default'} variant={p.tag === 'Popular' ? 'solid' : 'bordered'}>
              {p.price === null ? 'Talk to sales' : 'Choose plan'}
            </Button>
          </Surface>
        ))}
      </div>
    </>
  )
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  ['Is every screen built with oks-ui?', 'Yes. Every button, table, chart, form and menu is an oks-ui primitive or composed from oks-ui parts. No other UI or charting library is used.'],
  ['Which charting library powers the dashboards?', "Only oks-ui's <Chart>. Line, area, bar, column and donut charts all come from it."],
  ['Can I change the brand colour?', "Yes — repoint the --oks-color-primary-* ramp in src/styles/theme.css and the whole app re-skins, light and dark."],
  ['Does it support dark mode?', 'Yes. The --app-* token layer is redefined for [data-theme="dark"] and the theme toggle persists to localStorage.'],
  ['Is the data real?', 'No — all data is deterministic mock data in src/data/. There is no backend.'],
]

export function FaqPage() {
  return (
    <>
      <PageHeader title="FAQ" />
      <Surface>
        <Accordion selectionMode="multiple" variant="light">
          {FAQS.map(([q, a], i) => (
            <AccordionItem key={i} title={q}>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
                {a}
              </p>
            </AccordionItem>
          ))}
        </Accordion>
      </Surface>
    </>
  )
}

/* ---------------- Timeline / Activity ---------------- */
export function TimelinePage() {
  return (
    <>
      <PageHeader title="Activity Timeline" />
      <Surface>
        <Timeline>
          {activities.map((a) => (
            <TimelineItem key={a.id} title={a.who} time={date(a.when)} color="primary">
              <span style={{ color: 'var(--app-fg)' }}>{a.what}</span>
            </TimelineItem>
          ))}
        </Timeline>
      </Surface>
    </>
  )
}

/* ---------------- Gallery ---------------- */
export function GalleryPage() {
  return (
    <>
      <PageHeader title="Gallery" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {employees.slice(0, 12).map((e) => (
          <Surface key={e.id} bodyClassName="p-3">
            <img
              src={e.avatar}
              alt={e.name}
              className="aspect-square w-full rounded-md object-cover"
              loading="lazy"
            />
            <div className="mt-2 truncate text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
              {e.name}
            </div>
            <div className="truncate text-xs" style={{ color: 'var(--app-fg-muted)' }}>
              {e.department}
            </div>
          </Surface>
        ))}
      </div>
    </>
  )
}

/* ---------------- Search results ---------------- */
export function SearchResultsPage() {
  const [q, setQ] = useState('design')
  const results = employees
    .filter((e) => (e.name + e.department + e.designation).toLowerCase().includes(q.toLowerCase()))
    .slice(0, 8)
  return (
    <>
      <PageHeader title="Search Results" />
      <div className="mb-5 max-w-md">
        <TextField
          size="sm"
          variant="bordered"
          value={q}
          onChange={setQ}
          startIcon={<Search size={14} />}
          aria-label="Search"
          placeholder="Search people, projects, docs"
        />
      </div>
      <Surface bodyClassName="p-0">
        <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
          {results.map((e) => (
            <li key={e.id} className="flex items-center gap-3 p-3.5">
              <Avatar size={34} src={e.avatar} name={e.name} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                  {e.name}
                </div>
                <div className="truncate text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                  {e.designation} · {e.department}
                </div>
              </div>
              <Chip size="sm" variant="soft" color="default">
                Person
              </Chip>
            </li>
          ))}
          {results.length === 0 && (
            <li className="p-6 text-center text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
              No results for “{q}”.
            </li>
          )}
        </ul>
      </Surface>
    </>
  )
}

/* ---------------- Coming soon (content page, not the fallback) ---------------- */
export function ComingSoonPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-2xl font-semibold" style={{ color: 'var(--app-heading)' }}>
        Something new is coming
      </h1>
      <p className="max-w-md text-sm" style={{ color: 'var(--app-fg-muted)' }}>
        We're putting the finishing touches on this feature. Leave your email and we'll let you know
        when it's live.
      </p>
      <div className="mt-2 flex w-full max-w-sm gap-2">
        <TextField size="sm" variant="bordered" placeholder="you@company.com" aria-label="Email" className="flex-1" />
        <Button size="sm" color="primary">
          Notify me
        </Button>
      </div>
    </div>
  )
}
