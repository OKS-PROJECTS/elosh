import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import InnerTemplate from './Components/Common/InnerTemplate'
import { NAV_ROUTES } from './data/nav'
import { DASHBOARD_CONFIGS } from './data/dashboards'
import { LIST_CONFIGS } from './data/lists'
import {
  archetypeRoutes,
  configuredRoutePaths,
} from './data/archetypeRoutes'

const EmployeeDashboard = lazy(() => import('./Pages/Dashboards/EmployeeDashboard'))
const AdminDashboard = lazy(() => import('./Pages/Dashboards/AdminDashboard'))
const DashboardPage = lazy(() => import('./Pages/Dashboards/DashboardPage'))
const ListPage = lazy(() => import('./Pages/InnerPages/ListPage'))
const ComingSoon = lazy(() => import('./Pages/InnerPages/ComingSoon'))

const ComponentsGallery = lazy(() => import('./Pages/Gallery/ComponentsGallery'))
const KitchenSink = lazy(() => import('./Pages/Gallery/KitchenSink'))

const ChatApp = lazy(() => import('./Pages/Apps/ChatApp'))
const EmailApp = lazy(() => import('./Pages/Apps/EmailApp'))
const CalendarApp = lazy(() => import('./Pages/Apps/CalendarApp'))
const KanbanApp = lazy(() => import('./Pages/Apps/KanbanApp'))
const NotesApp = lazy(() => import('./Pages/Apps/NotesApp'))
const TodoApp = lazy(() => import('./Pages/Apps/TodoApp'))
const FilesApp = lazy(() => import('./Pages/Apps/FilesApp'))

const ProfilePage = lazy(() => import('./Pages/Content/ProfilePage'))
const PricingPage = lazy(() => import('./Pages/Content/MiscPages').then((m) => ({ default: m.PricingPage })))
const FaqPage = lazy(() => import('./Pages/Content/MiscPages').then((m) => ({ default: m.FaqPage })))
const TimelinePage = lazy(() => import('./Pages/Content/MiscPages').then((m) => ({ default: m.TimelinePage })))
const GalleryPage = lazy(() => import('./Pages/Content/MiscPages').then((m) => ({ default: m.GalleryPage })))
const SearchResultsPage = lazy(() => import('./Pages/Content/MiscPages').then((m) => ({ default: m.SearchResultsPage })))
const ComingSoonPage = lazy(() => import('./Pages/Content/MiscPages').then((m) => ({ default: m.ComingSoonPage })))

const Login = lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.Login })))
const Register = lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.Register })))
const ForgotPassword = lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.ForgotPassword })))
const ResetPassword = lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.ResetPassword })))
const TwoStep = lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.TwoStep })))
const Lock = lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.Lock })))

const NotFound = lazy(() => import('./Pages/Errors/ErrorPages').then((m) => ({ default: m.NotFound })))
const ServerError = lazy(() => import('./Pages/Errors/ErrorPages').then((m) => ({ default: m.ServerError })))
const Maintenance = lazy(() => import('./Pages/Errors/ErrorPages').then((m) => ({ default: m.Maintenance })))

const EXPLICIT = {
  '/dashboard/admin': <AdminDashboard />,
  '/dashboard/employee': <EmployeeDashboard />,
  '/apps/chat': <ChatApp />,
  '/apps/email': <EmailApp />,
  '/apps/calendar': <CalendarApp />,
  '/apps/kanban': <KanbanApp />,
  '/apps/notes': <NotesApp />,
  '/apps/todo': <TodoApp />,
  '/apps/files': <FilesApp />,
  '/apps/invoices': <ListPage config={LIST_CONFIGS['/finance/invoices']} />,
  '/projects/board': <KanbanApp />,
  '/components': <ComponentsGallery />,
  '/components/kitchen-sink': <KitchenSink />,
  '/pages/profile': <ProfilePage />,
  '/pages/pricing': <PricingPage />,
  '/pages/timeline': <TimelinePage />,
  '/pages/gallery': <GalleryPage />,
  '/pages/search': <SearchResultsPage />,
  '/pages/coming-soon': <ComingSoonPage />,
  '/content/faq': <FaqPage />,
  '/crm/pipeline': <KanbanApp />,
  '/admin/knowledge-base': <FaqPage />,
}

// dashboards driven by DASHBOARD_CONFIGS
for (const path of Object.keys(DASHBOARD_CONFIGS)) {
  EXPLICIT[path] = <DashboardPage config={DASHBOARD_CONFIGS[path]} />
}

const EXPLICIT_PATHS = new Set(Object.keys(EXPLICIT))
const CONFIGURED = new Set(configuredRoutePaths)

const shellRoutes = NAV_ROUTES.filter(
  (p) =>
    !EXPLICIT_PATHS.has(p) &&
    !CONFIGURED.has(p) &&
    !p.startsWith('/auth/') &&
    !p.startsWith('/error/') &&
    !p.startsWith('/components'),
)

export default function App() {
  return (
    <Routes>
      {/* shell-less */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/two-step" element={<TwoStep />} />
      <Route path="/auth/lock" element={<Lock />} />
      <Route path="/error/404" element={<NotFound />} />
      <Route path="/error/500" element={<ServerError />} />
      <Route path="/error/maintenance" element={<Maintenance />} />

      <Route element={<InnerTemplate />}>
        <Route path="/" element={<Navigate to="/dashboard/employee" replace />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/employee" replace />} />
        <Route path="/dashboards" element={<Navigate to="/dashboard/employee" replace />} />

        {Object.entries(EXPLICIT).map(([path, el]) => (
          <Route key={path} path={path} element={el} />
        ))}

        {archetypeRoutes}

        {shellRoutes.map((p) => (
          <Route key={p} path={p} element={<ComingSoon />} />
        ))}

        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}
