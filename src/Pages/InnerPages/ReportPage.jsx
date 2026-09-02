import { Button, toast } from 'oks-ui'
import { Download } from 'lucide-react'
import { PageHeader, ChartCard, DataTable } from '../../Components/ui'

/**
 * Config-driven report page: a chart + a supporting table.
 * config: { title, subtitle, chart: {type,data,x,series}, columns, rows, searchKeys? }
 */
export default function ReportPage({ config }) {
  return (
    <>
      <PageHeader
        title={config.title}
        subtitle={config.subtitle}
        actions={
          <Button
            size="sm"
            variant="bordered"
            color="default"
            startContent={<Download size={14} />}
            onPress={() => toast.success('Report downloaded')}
          >
            Download PDF
          </Button>
        }
      />
      <div className="mb-5">
        <ChartCard
          title={config.chart.title ?? 'Overview'}
          type={config.chart.type}
          data={config.chart.data}
          x={config.chart.x}
          series={config.chart.series}
          dataFormat={config.chart.dataFormat}
          height={300}
        />
      </div>
      <DataTable
        columns={config.columns}
        rows={config.rows}
        searchKeys={config.searchKeys ?? []}
        toolbar
      />
    </>
  )
}
