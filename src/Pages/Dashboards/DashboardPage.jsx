import { Button } from 'oks-ui'
import * as Icons from 'lucide-react'
import { PageHeader, StatCard, ChartCard, DonutCard, DataTable } from '../../Components/ui'

/**
 * Config-driven secondary dashboard.
 * config: { title, kpis:[{icon,label,value,tone,trend,delta,to}], charts:[ChartCard props],
 *           donut?: DonutCard props, table?: DataTable props }
 */
export default function DashboardPage({ config }) {
  return (
    <>
      <PageHeader
        title={config.title}
        actions={
          <Button size="sm" variant="bordered" color="default" startContent={<Icons.Download size={14} />}>
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {config.kpis.map((k) => {
          const Icon = Icons[k.icon] ?? Icons.Activity
          return (
            <StatCard
              key={k.label}
              icon={Icon}
              label={k.label}
              value={k.value}
              tone={k.tone}
              trend={k.trend}
              delta={k.delta}
              to={k.to}
            />
          )
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard {...config.charts[0]} height={300} />
        </div>
        {config.donut ? (
          <DonutCard {...config.donut} />
        ) : config.charts[1] ? (
          <ChartCard {...config.charts[1]} />
        ) : null}
      </div>

      {config.charts[2] && (
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ChartCard {...config.charts[2]} />
          {config.charts[3] && <ChartCard {...config.charts[3]} />}
        </div>
      )}

      {config.table && (
        <div className="mt-5">
          <DataTable toolbar={false} {...config.table} />
        </div>
      )}
    </>
  )
}
