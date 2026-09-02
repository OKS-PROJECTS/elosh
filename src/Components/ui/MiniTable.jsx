import { Table } from 'oks-ui'

/** Compact borderless table for dashboard widgets (no toolbar / pagination). */
export default function MiniTable({ columns, rows, getRowKey = (r) => r.id, ariaLabel = 'List' }) {
  return (
    <div className="w-full overflow-x-auto app-scroll">
      <Table
        aria-label={ariaLabel}
        columns={columns}
        rows={rows}
        getRowKey={getRowKey}
        isCompact
        removeWrapper
      />
    </div>
  )
}
