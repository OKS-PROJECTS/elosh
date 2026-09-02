import {
  LayoutDashboard,
  MessagesSquare,
  Mail,
  Calendar,
  CheckSquare,
  StickyNote,
  Files,
  KanbanSquare,
  Users,
  Building2,
  Contact,
  Briefcase,
  UserCheck,
  CalendarClock,
  Plane,
  Clock,
  Target,
  GraduationCap,
  FileText,
  Receipt,
  Wallet,
  Landmark,
  Boxes,
  LifeBuoy,
  ShieldCheck,
  BarChart3,
  Settings,
  BookOpen,
  Globe,
  Sparkles,
  Component,
  LogIn,
  CircleHelp,
  Handshake,
  Rocket,
} from 'lucide-react'

/**
 * Elosh navigation tree. Mirrors the reference IA (sections, grouping, depth).
 * `NAV` drives the sidebar; `NAV_ROUTES` is the flat deduped list of leaf paths.
 */
export const NAV = [
  {
    heading: 'Main',
    items: [
      {
        label: 'Dashboards',
        icon: LayoutDashboard,
        children: [
          { label: 'Admin', to: '/dashboard/admin' },
          { label: 'Employee', to: '/dashboard/employee' },
          { label: 'HR', to: '/dashboard/hr' },
          { label: 'Recruitment', to: '/dashboard/recruitment' },
          { label: 'Payroll', to: '/dashboard/payroll' },
          { label: 'Finance', to: '/dashboard/finance' },
          { label: 'Deals', to: '/dashboard/deals' },
          { label: 'Leads', to: '/dashboard/leads' },
        ],
      },
      {
        label: 'Applications',
        icon: MessagesSquare,
        children: [
          { label: 'Chat', to: '/apps/chat', icon: MessagesSquare },
          { label: 'Email', to: '/apps/email', icon: Mail },
          { label: 'Calendar', to: '/apps/calendar', icon: Calendar },
          { label: 'To Do', to: '/apps/todo', icon: CheckSquare },
          { label: 'Notes', to: '/apps/notes', icon: StickyNote },
          { label: 'File Manager', to: '/apps/files', icon: Files },
          { label: 'Kanban', to: '/apps/kanban', icon: KanbanSquare },
          { label: 'Invoices', to: '/apps/invoices', icon: Receipt },
        ],
      },
      {
        label: 'AI Center',
        icon: Sparkles,
        children: [
          { label: 'Attendance Insights', to: '/ai/attendance-insights' },
          { label: 'Payroll Forecast', to: '/ai/payroll-forecast' },
          { label: 'Hiring Forecast', to: '/ai/hiring-forecast' },
          { label: 'Team Performance', to: '/ai/team-performance' },
          { label: 'AI Settings', to: '/ai/settings' },
        ],
      },
    ],
  },
  {
    heading: 'CRM',
    items: [
      { label: 'Contacts', to: '/crm/contacts', icon: Contact },
      { label: 'Companies', to: '/crm/companies', icon: Building2 },
      { label: 'Deals', to: '/crm/deals', icon: Handshake },
      { label: 'Leads', to: '/crm/leads', icon: Target },
      { label: 'Pipeline', to: '/crm/pipeline', icon: KanbanSquare },
      { label: 'Activities', to: '/crm/activities', icon: Clock },
      { label: 'Analytics', to: '/crm/analytics', icon: BarChart3 },
    ],
  },
  {
    heading: 'Projects',
    items: [
      { label: 'Clients', to: '/projects/clients', icon: Briefcase },
      { label: 'Projects', to: '/projects/list', icon: Boxes },
      { label: 'Tasks', to: '/projects/tasks', icon: CheckSquare },
      { label: 'Task Board', to: '/projects/board', icon: KanbanSquare },
    ],
  },
  {
    heading: 'HRM',
    items: [
      {
        label: 'Employees',
        icon: Users,
        children: [
          { label: 'Employee List', to: '/hrm/employees' },
          { label: 'Employee Grid', to: '/hrm/employees-grid' },
          { label: 'Departments', to: '/hrm/departments' },
          { label: 'Designations', to: '/hrm/designations' },
          { label: 'Policies', to: '/hrm/policies' },
        ],
      },
      {
        label: 'Attendance',
        icon: CalendarClock,
        children: [
          { label: 'Leaves', to: '/hrm/leaves' },
          { label: 'Attendance', to: '/hrm/attendance' },
          { label: 'Timesheet', to: '/hrm/timesheet' },
          { label: 'Shift & Schedule', to: '/hrm/shifts' },
          { label: 'Overtime', to: '/hrm/overtime' },
        ],
      },
      { label: 'Holidays', to: '/hrm/holidays', icon: Plane },
      {
        label: 'Performance',
        icon: Target,
        children: [
          { label: 'Reviews', to: '/hrm/performance/reviews' },
          { label: 'Appraisals', to: '/hrm/performance/appraisals' },
          { label: 'Goals', to: '/hrm/performance/goals' },
        ],
      },
      {
        label: 'Training',
        icon: GraduationCap,
        children: [
          { label: 'Training List', to: '/hrm/training/list' },
          { label: 'Trainers', to: '/hrm/training/trainers' },
          { label: 'Training Types', to: '/hrm/training/types' },
        ],
      },
      { label: 'Promotions', to: '/hrm/promotions', icon: UserCheck },
      { label: 'Resignations', to: '/hrm/resignations', icon: FileText },
      { label: 'Terminations', to: '/hrm/terminations', icon: FileText },
    ],
  },
  {
    heading: 'Recruitment',
    items: [
      { label: 'Jobs', to: '/recruitment/jobs', icon: Briefcase },
      { label: 'Candidates', to: '/recruitment/candidates', icon: Users },
      { label: 'Referrals', to: '/recruitment/referrals', icon: Handshake },
    ],
  },
  {
    heading: 'Finance & Accounts',
    items: [
      {
        label: 'Sales',
        icon: Receipt,
        children: [
          { label: 'Estimates', to: '/finance/estimates' },
          { label: 'Invoices', to: '/finance/invoices' },
          { label: 'Payments', to: '/finance/payments' },
          { label: 'Expenses', to: '/finance/expenses' },
          { label: 'Taxes', to: '/finance/taxes' },
        ],
      },
      {
        label: 'Accounting',
        icon: Landmark,
        children: [
          { label: 'Categories', to: '/finance/categories' },
          { label: 'Budgets', to: '/finance/budgets' },
          { label: 'Budget Expenses', to: '/finance/budget-expenses' },
        ],
      },
      {
        label: 'Payroll',
        icon: Wallet,
        children: [
          { label: 'Employee Salary', to: '/finance/salary' },
          { label: 'Payslips', to: '/finance/payslips' },
          { label: 'Payroll Items', to: '/finance/payroll-items' },
        ],
      },
      {
        label: 'Assets',
        icon: Boxes,
        children: [
          { label: 'Assets', to: '/finance/assets' },
          { label: 'Asset Categories', to: '/finance/asset-categories' },
        ],
      },
    ],
  },
  {
    heading: 'Administration',
    items: [
      {
        label: 'Tickets',
        icon: LifeBuoy,
        children: [
          { label: 'Tickets', to: '/admin/tickets' },
          { label: 'Ticket Detail', to: '/admin/tickets/detail' },
        ],
      },
      { label: 'Knowledge Base', to: '/admin/knowledge-base', icon: BookOpen },
      {
        label: 'User Management',
        icon: ShieldCheck,
        children: [
          { label: 'Users', to: '/admin/users' },
          { label: 'Roles & Permissions', to: '/admin/roles' },
        ],
      },
      {
        label: 'Reports',
        icon: BarChart3,
        children: [
          { label: 'Expense Report', to: '/admin/reports/expenses' },
          { label: 'Invoice Report', to: '/admin/reports/invoices' },
          { label: 'Payroll Report', to: '/admin/reports/payroll' },
          { label: 'Attendance Report', to: '/admin/reports/attendance' },
          { label: 'Leave Report', to: '/admin/reports/leave' },
          { label: 'Employee Report', to: '/admin/reports/employees' },
        ],
      },
      {
        label: 'Settings',
        icon: Settings,
        children: [
          { label: 'Profile', to: '/settings/profile' },
          { label: 'Security', to: '/settings/security' },
          { label: 'Notifications', to: '/settings/notifications' },
          { label: 'Connected Apps', to: '/settings/connected-apps' },
          { label: 'Business', to: '/settings/business' },
          { label: 'Localization', to: '/settings/localization' },
          { label: 'Preferences', to: '/settings/preferences' },
          { label: 'Appearance', to: '/settings/appearance' },
          { label: 'Billing', to: '/settings/billing' },
          { label: 'API Keys', to: '/settings/api-keys' },
        ],
      },
    ],
  },
  {
    heading: 'Super Admin',
    items: [
      { label: 'Dashboard', to: '/super-admin/dashboard', icon: Globe },
      { label: 'Companies', to: '/super-admin/companies', icon: Building2 },
      { label: 'Subscriptions', to: '/super-admin/subscriptions', icon: Receipt },
      { label: 'Packages', to: '/super-admin/packages', icon: Boxes },
      { label: 'Domains', to: '/super-admin/domains', icon: Globe },
    ],
  },
  {
    heading: 'Content',
    items: [
      { label: 'Pages', to: '/content/pages', icon: Files },
      { label: 'Blog', to: '/content/blog', icon: FileText },
      { label: 'Countries', to: '/content/countries', icon: Globe },
      { label: 'Testimonials', to: '/content/testimonials', icon: MessagesSquare },
      { label: 'FAQ', to: '/content/faq', icon: CircleHelp },
    ],
  },
  {
    heading: 'Pages',
    items: [
      { label: 'Profile', to: '/pages/profile', icon: Contact },
      { label: 'Pricing', to: '/pages/pricing', icon: Wallet },
      { label: 'Timeline', to: '/pages/timeline', icon: Clock },
      { label: 'Search Results', to: '/pages/search', icon: CircleHelp },
      { label: 'Gallery', to: '/pages/gallery', icon: Files },
      { label: 'Coming Soon', to: '/pages/coming-soon', icon: Rocket },
    ],
  },
  {
    heading: 'Authentication',
    items: [
      { label: 'Sign In', to: '/auth/login', icon: LogIn },
      { label: 'Sign Up', to: '/auth/register' },
      { label: 'Forgot Password', to: '/auth/forgot-password' },
      { label: 'Reset Password', to: '/auth/reset-password' },
      { label: '2-Step Verification', to: '/auth/two-step' },
      { label: 'Lock Screen', to: '/auth/lock' },
      { label: '404 Error', to: '/error/404' },
      { label: '500 Error', to: '/error/500' },
      { label: 'Maintenance', to: '/error/maintenance' },
    ],
  },
  {
    heading: 'UI Interface',
    items: [
      { label: 'Components', to: '/components', icon: Component },
      { label: 'Kitchen Sink', to: '/components/kitchen-sink', icon: Component },
    ],
  },
]

const collect = (items) =>
  items.flatMap((n) => (n.children ? collect(n.children) : n.to ? [n.to] : []))

export const NAV_ROUTES = Array.from(new Set(NAV.flatMap((s) => collect(s.items))))

/** Flat label lookup for breadcrumbs / page titles. */
export const ROUTE_LABELS = (() => {
  const map = {}
  const walk = (items, trail) => {
    for (const n of items) {
      const t = [...trail, typeof n.label === 'string' ? n.label : '']
      if (n.to) map[n.to] = t.filter(Boolean)
      if (n.children) walk(n.children, t)
    }
  }
  NAV.forEach((s) => walk(s.items, [s.heading]))
  return map
})()
