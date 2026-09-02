import { Link } from 'react-router-dom'
import Logo from '../../Components/Common/Logo'

/** Shell-less split screen: dark brand panel + form card. */
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-full lg:grid-cols-2" style={{ background: 'var(--app-bg)' }}>
      <div
        className="relative hidden flex-col justify-between p-10 lg:flex"
        style={{ background: '#1c2434' }}
      >
        <Logo onDark />
        <div>
          <h2 className="max-w-sm text-2xl font-semibold text-white">
            Everything your people team needs, in one place.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Elosh brings HR, payroll, recruitment and performance together — built entirely with
            oks-ui components.
          </p>
        </div>
        <p className="text-xs text-white/40">© {new Date().getFullYear()} Elosh</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-6 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--app-heading)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm" style={{ color: 'var(--app-fg-muted)' }}>
              {subtitle}
            </p>
          )}
          <div className="mt-6">{children}</div>
          {footer && (
            <p className="mt-6 text-center text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
              {footer}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export { Link }
