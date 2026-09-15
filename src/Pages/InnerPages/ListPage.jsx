import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatGroup, Stat, Button } from 'oks-ui'
import { Download } from 'lucide-react'
import { toast } from 'oks-ui'
import { PageHeader, DataTable } from '../../Components/ui'

/**
 * Config-driven list / CRUD page.
 * config: { title, subtitle, columns, rows, searchKeys?, filters?, stats?,
 *           createLabel?, createTo? } — createTo routes to a FormPage instead
 *           of the default toast (see FORM_CONFIGS).
 */
export default function ListPage({ config }) {
  const [rows] = useState(config.rows)
  const navigate = useNavigate()

  return (
    <>
      <PageHeader
        title={config.title}
        subtitle={config.subtitle}
        actions={
          <>
            <Button
              size="sm"
              variant="bordered"
              color="default"
              startContent={<Download size={14} />}
              onPress={() => toast.success('Export started')}
            >
              Export
            </Button>
          </>
        }
      />

      {config.stats?.length > 0 && (
        <StatGroup columns={Math.min(4, config.stats.length)} className="mb-5">
          {config.stats.map((s) => (
            <Stat
              key={s.label}
              label={s.label}
              value={s.value}
              delta={s.delta}
              trend={s.trend}
              classNames={{ base: 'elosh-surface rounded-[--app-card-radius] border p-4' }}
              style={{ background: 'var(--app-surface)', borderColor: 'var(--app-border)' }}
            />
          ))}
        </StatGroup>
      )}

      <DataTable
        columns={config.columns}
        rows={rows}
        searchKeys={config.searchKeys ?? []}
        filters={config.filters ?? []}
        getRowKey={config.getRowKey ?? ((r) => r.id)}
        createLabel={config.createLabel ?? 'Add new'}
        onCreate={
          config.createTo
            ? () => navigate(config.createTo)
            : () => toast.info(`New ${config.title.replace(/s$/, '')} form`)
        }
      />
    </>
  )
}
