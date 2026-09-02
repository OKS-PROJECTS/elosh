import { Link } from 'react-router-dom'
import { Button } from 'oks-ui'
import Logo from '../../Components/Common/Logo'

function ErrorShell({ code, title, message, action }) {
  return (
    <div
      className="flex min-h-full flex-col items-center justify-center gap-4 p-8 text-center"
      style={{ background: 'var(--app-bg)' }}
    >
      <Logo />
      <div className="text-6xl font-bold" style={{ color: 'var(--app-accent)' }}>
        {code}
      </div>
      <h1 className="text-xl font-semibold" style={{ color: 'var(--app-heading)' }}>
        {title}
      </h1>
      <p className="max-w-md text-sm" style={{ color: 'var(--app-fg-muted)' }}>
        {message}
      </p>
      {action}
    </div>
  )
}

export function NotFound() {
  return (
    <ErrorShell
      code="404"
      title="Page not found"
      message="The page you're looking for doesn't exist or has been moved."
      action={
        <Button as={Link} to="/dashboard/employee" color="primary" size="sm">
          Back to dashboard
        </Button>
      }
    />
  )
}

export function ServerError() {
  return (
    <ErrorShell
      code="500"
      title="Something went wrong"
      message="An unexpected error occurred on our end. We've been notified and are looking into it."
      action={
        <Button as={Link} to="/dashboard/employee" color="primary" size="sm">
          Back to dashboard
        </Button>
      }
    />
  )
}

export function Maintenance() {
  return (
    <ErrorShell
      code="Soon"
      title="Down for maintenance"
      message="Elosh is getting an upgrade. We'll be back online shortly — thanks for your patience."
      action={null}
    />
  )
}
