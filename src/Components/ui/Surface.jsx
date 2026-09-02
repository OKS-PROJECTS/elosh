import { Card, CardBody } from 'oks-ui'
import { cx } from '../../lib/cx'

/**
 * The everyday card. Composed from oks-ui <Card> + <CardBody>, styled from
 * --app-* tokens so light/dark and rebrand flip together.
 * oks-ui gap: Card ships but its padding/header conventions differ from the
 * reference (title 18/600, divider under it, 20px body). — OKS-UI-FEEDBACK A(card-header)
 */
export default function Surface({
  title,
  subtitle,
  actions,
  headerDivider = false,
  bodyClassName,
  className,
  padded = true,
  children,
  ...rest
}) {
  return (
    <Card
      shadow="none"
      radius="lg"
      className={cx('h-full overflow-hidden', className)}
      classNames={{ base: 'elosh-surface' }}
      style={{
        background: 'var(--app-surface)',
        border: 'var(--app-card-border)',
        borderRadius: 'var(--app-card-radius)',
      }}
      {...rest}
    >
      {(title || actions) && (
        <div
          className={cx(
            'flex items-start justify-between gap-3 px-5 pt-4',
            headerDivider ? 'pb-4' : 'pb-0',
            headerDivider && 'border-b',
          )}
          style={headerDivider ? { borderColor: 'var(--app-border)' } : undefined}
        >
          <div className="min-w-0">
            {title && (
              <h3 className="truncate text-[17px] font-semibold" style={{ color: 'var(--app-heading)' }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}
      <CardBody className={cx(padded ? 'p-5' : 'p-0', bodyClassName)}>{children}</CardBody>
    </Card>
  )
}
