import { Chart } from 'oks-ui'
import Surface from './Surface'

/**
 * Donut with a custom centre value + side legend.
 * <Chart type="donut"> always paints a centre total — we use pie.center:false
 * and render our own. — OKS-UI-FEEDBACK B(donut-center)
 */
export default function DonutCard({
  title,
  subtitle,
  actions,
  data, // [{ label, value, color }]
  centerValue,
  centerLabel,
  height = 240,
}) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <Surface title={title} subtitle={subtitle} actions={actions}>
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <div className="relative shrink-0" style={{ width: height, height }}>
          <Chart
            unstyled
            type="donut"
            className="donut-no-center"
            data={data}
            x="label"
            series={[{ key: 'value' }]}
            height={height}
            legend={false}
            pie={{ center: false }}
            palette={{ colors: data.map((d) => d.color) }}
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold" style={{ color: 'var(--app-heading)' }}>
              {centerValue ?? total}
            </span>
            {centerLabel && (
              <span className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                {centerLabel}
              </span>
            )}
          </div>
        </div>
        <ul className="grid w-full grid-cols-1 gap-2.5 sm:flex-1">
          {data.map((d) => (
            <li key={d.label} className="flex items-center justify-between gap-3 text-[13px]">
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: d.color }}
                />
                <span style={{ color: 'var(--app-fg)' }}>{d.label}</span>
              </span>
              <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                {d.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  )
}
