import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Loader,
  Progress,
  CircularProgress,
  Skeleton,
  Accordion,
  AccordionItem,
  SegmentedControl,
  Tabs,
  Tab,
  Tooltip,
  Timeline,
  TimelineItem,
  Breadcrumbs,
  BreadcrumbItem,
  Pagination,
  Stat,
  StatGroup,
  EmptyState,
} from 'oks-ui'
import { useState } from 'react'
import { Inbox, Star, Bell } from 'lucide-react'
import { PageHeader, Surface, StatusChip, TrendChip, ChartCard } from '../../Components/ui'
import { avatarUrl } from '../../lib/format'

function Demo({ title, note, children }) {
  return (
    <Surface title={title} subtitle={note}>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </Surface>
  )
}

export default function ComponentsGallery() {
  const [seg, setSeg] = useState('week')
  const [page, setPage] = useState(2)
  return (
    <>
      <PageHeader
        title="Components"
        subtitle="Every screen in Elosh is built from these oks-ui primitives and compositions."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Demo title="Buttons" note="oks-ui · Button / ButtonGroup">
          <Button color="primary" size="sm">Primary</Button>
          <Button variant="soft" color="primary" size="sm">Soft</Button>
          <Button variant="bordered" color="default" size="sm">Bordered</Button>
          <Button variant="ghost" color="default" size="sm">Ghost</Button>
          <ButtonGroup size="sm" variant="bordered">
            <Button>Day</Button>
            <Button>Week</Button>
            <Button>Month</Button>
          </ButtonGroup>
        </Demo>

        <Demo title="Chips & status" note="composed · StatusChip / TrendChip over Chip">
          <StatusChip status="Active" />
          <StatusChip status="Pending" />
          <StatusChip status="Overdue" />
          <TrendChip value={12.4} />
          <TrendChip value={-3.1} />
          <Chip size="sm" variant="dot" color="success">Live</Chip>
        </Demo>

        <Demo title="Avatars" note="oks-ui · Avatar / AvatarGroup">
          <Avatar size={36} src={avatarUrl(1)} name="Aria B" />
          <Avatar size={36} name="No Photo" />
          <Avatar size={36} src={avatarUrl(3)} name="On" status="online" />
          <AvatarGroup max={4} size={36}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Avatar key={i} src={avatarUrl(i + 10)} name={`U${i}`} />
            ))}
          </AvatarGroup>
        </Demo>

        <Demo title="Badges" note="oks-ui · Badge">
          <Badge content={5} color="danger">
            <Button isIconOnly variant="bordered" color="default" size="sm" aria-label="Inbox">
              <Inbox size={16} />
            </Button>
          </Badge>
          <Badge content={12} color="primary" max={9}>
            <Button isIconOnly variant="bordered" color="default" size="sm" aria-label="Notifications">
              <Bell size={16} />
            </Button>
          </Badge>
          <Badge isDot color="success">
            <Button isIconOnly variant="bordered" color="default" size="sm" aria-label="Star">
              <Star size={16} />
            </Button>
          </Badge>
        </Demo>

        <Demo title="Progress" note="oks-ui · Progress / CircularProgress">
          <div className="w-full">
            <Progress value={68} color="primary" size="sm" aria-label="Loading" />
          </div>
          <CircularProgress value={72} color="primary" aria-label="Score" showValueLabel />
        </Demo>

        <Demo title="Loaders & skeleton" note="oks-ui · Loader / Skeleton">
          <Loader />
          <Loader variant="dots-roll" />
          <div className="w-40">
            <Skeleton variant="text" lines={3} />
          </div>
        </Demo>

        <Demo title="Segmented control" note="oks-ui · SegmentedControl">
          <SegmentedControl
            aria-label="Range"
            value={seg}
            onChange={setSeg}
            options={[
              { label: 'Day', value: 'day' },
              { label: 'Week', value: 'week' },
              { label: 'Month', value: 'month' },
            ]}
          />
        </Demo>

        <Demo title="Breadcrumbs" note="oks-ui · Breadcrumbs">
          <Breadcrumbs aria-label="Breadcrumb">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>HRM</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Employees</BreadcrumbItem>
          </Breadcrumbs>
        </Demo>

        <Demo title="Pagination" note="oks-ui · Pagination">
          <Pagination size="sm" page={page} pageCount={9} onChange={setPage} />
        </Demo>

        <Surface title="Tabs" subtitle="oks-ui · Tabs / Tab">
          <Tabs variant="underlined" size="sm">
            <Tab key="overview" title="Overview">
              <p className="pt-3 text-[13px]" style={{ color: 'var(--app-fg)' }}>
                Overview panel content.
              </p>
            </Tab>
            <Tab key="activity" title="Activity">
              <p className="pt-3 text-[13px]" style={{ color: 'var(--app-fg)' }}>
                Activity panel content.
              </p>
            </Tab>
          </Tabs>
        </Surface>

        <Surface title="Accordion" subtitle="oks-ui · Accordion / AccordionItem">
          <Accordion selectionMode="single" variant="light" isCompact>
            <AccordionItem key="a" title="What is Elosh?">
              <p className="text-[13px]" style={{ color: 'var(--app-fg)' }}>
                An HR admin template built entirely with oks-ui.
              </p>
            </AccordionItem>
            <AccordionItem key="b" title="Which charting library?">
              <p className="text-[13px]" style={{ color: 'var(--app-fg)' }}>
                Only oks-ui's &lt;Chart&gt;.
              </p>
            </AccordionItem>
          </Accordion>
        </Surface>

        <Surface title="Timeline" subtitle="oks-ui · Timeline / TimelineItem">
          <Timeline>
            <TimelineItem title="Offer sent" time="09:12" color="primary">
              Product Designer — Aria Bennett
            </TimelineItem>
            <TimelineItem title="Interview scheduled" time="Yesterday" color="info">
              Panel round with the design team
            </TimelineItem>
          </Timeline>
        </Surface>

        <Surface title="Alert" subtitle="oks-ui · Alert">
          <div className="flex w-full flex-col gap-2">
            <Alert color="success" variant="soft" title="Saved" description="Your changes were saved." />
            <Alert color="warning" variant="soft" title="Heads up" description="Payroll runs on Friday." />
          </div>
        </Surface>

        <Surface title="Tooltip" subtitle="oks-ui · Tooltip">
          <Tooltip content="This is a tooltip" placement="top">
            <Button size="sm" variant="bordered" color="default">
              Hover me
            </Button>
          </Tooltip>
        </Surface>

        <Surface title="Empty state" subtitle="oks-ui · EmptyState">
          <EmptyState icon={<Inbox size={24} />} title="No records" description="Nothing to show yet." size="sm" />
        </Surface>

        <div className="md:col-span-2 xl:col-span-3">
          <StatGroup columns={4}>
            <Stat label="Revenue" value="$66.4k" delta="+9%" trend="up" classNames={{ base: 'elosh-surface rounded-[--app-card-radius] border p-4' }} style={{ background: 'var(--app-surface)', borderColor: 'var(--app-border)' }} />
            <Stat label="Active users" value="1,284" delta="+3%" trend="up" classNames={{ base: 'elosh-surface rounded-[--app-card-radius] border p-4' }} style={{ background: 'var(--app-surface)', borderColor: 'var(--app-border)' }} />
            <Stat label="Churn" value="2.1%" delta="-0.4%" trend="down" classNames={{ base: 'elosh-surface rounded-[--app-card-radius] border p-4' }} style={{ background: 'var(--app-surface)', borderColor: 'var(--app-border)' }} />
            <Stat label="NPS" value="61" delta="+5" trend="up" classNames={{ base: 'elosh-surface rounded-[--app-card-radius] border p-4' }} style={{ background: 'var(--app-surface)', borderColor: 'var(--app-border)' }} />
          </StatGroup>
        </div>

        <div className="md:col-span-2 xl:col-span-3">
          <ChartCard
            title="Chart — area / column / bar / donut"
            subtitle="oks-ui · Chart (the only charting tool)"
            type="area"
            data={[
              { m: 'Jan', v: 12 }, { m: 'Feb', v: 18 }, { m: 'Mar', v: 15 },
              { m: 'Apr', v: 22 }, { m: 'May', v: 28 }, { m: 'Jun', v: 26 },
            ]}
            x="m"
            series={[{ key: 'v', name: 'Value' }]}
            height={220}
          />
        </div>
      </div>

      <Divider className="my-8" />
      <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
        Composed components (Surface, PageHeader, StatCard, DataTable, DonutCard, ChartCard,
        EntityCell, StatusChip, TrendChip) are built <em>from</em> these primitives — see{' '}
        <code>src/Components/ui/</code>.
      </p>
    </>
  )
}
