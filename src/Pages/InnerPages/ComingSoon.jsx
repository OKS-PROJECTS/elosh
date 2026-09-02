import { useLocation, Link } from 'react-router-dom'
import { EmptyState, Button } from 'oks-ui'
import { Hammer } from 'lucide-react'
import { PageHeader } from '../../Components/ui'
import { ROUTE_LABELS } from '../../data/nav'

export default function ComingSoon() {
  const { pathname } = useLocation()
  const trail = ROUTE_LABELS[pathname]
  const title = trail?.[trail.length - 1] ?? 'Page'
  return (
    <>
      <PageHeader title={title} />
      <div className="flex min-h-[50vh] items-center justify-center">
        <EmptyState
          icon={<Hammer size={28} />}
          title={`${title} is on the roadmap`}
          description="This screen isn't built out yet. The shell, theme and component layer it will use are all ready."
          actions={
            <Button as={Link} to="/dashboard/employee" color="primary" size="sm">
              Back to dashboard
            </Button>
          }
        />
      </div>
    </>
  )
}
