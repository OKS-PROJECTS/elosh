import { Chart } from 'oks-ui'
import Surface from './Surface'

/**
 * Surface wrapper around <Chart unstyled>. Line/area render clean (no gridlines,
 * no Y axis, no markers); bar/column keep the category axis.
 * <Chart> renders its own <figure> frame — needs `unstyled` inside a card. — OKS-UI-FEEDBACK B1
 */
export default function ChartCard({
  title,
  subtitle,
  actions,
  type = 'area',
  data,
  x,
  series,
  height = 280,
  palette = { roles: ['primary', 'info', 'success'] },
  dataFormat,
  legend = false,
  stacked = false,
  children,
  ...chartRest
}) {
  const clean = type === 'line' || type === 'area'
  return (
    <Surface title={title} subtitle={subtitle} actions={actions}>
      <Chart
        unstyled
        type={type}
        data={data}
        x={x}
        series={series}
        height={height}
        palette={palette}
        dataFormat={dataFormat}
        legend={legend}
        grid={clean ? { show: false } : { horizontal: true, vertical: false, lineOpacity: 0.5 }}
        axisY={clean ? { hide: true } : undefined}
        line={
          type === 'line' || type === 'area'
            ? { curve: 'smooth', strokeWidth: 2, area: { show: type === 'area', fill: { opacity: 0.12 } } }
            : undefined
        }
        column={type === 'column' || type === 'bar' ? { stacked, radius: 4 } : undefined}
        tooltip={{ showTotal: !!stacked }}
        {...chartRest}
      />
      {children}
    </Surface>
  )
}
