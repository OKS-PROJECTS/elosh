import { StatusChip, EntityCell } from '../Components/ui'
import { money, date } from '../lib/format'
import * as db from './mock'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const s = (key, base, step, jitter = 0) =>
  months.map((m, i) => ({ month: m, [key]: base + i * step + (i % 3) * jitter }))

export const DASHBOARD_CONFIGS = {
  '/dashboard/hr': {
    title: 'HR Dashboard',
    kpis: [
      { icon: 'Users', label: 'Total employees', value: '156', tone: 'primary', to: '/hrm/employees' },
      { icon: 'UserCheck', label: 'Present today', value: '128', tone: 'success', to: '/hrm/attendance' },
      { icon: 'Plane', label: 'On leave', value: '9', tone: 'warning', to: '/hrm/leaves' },
      { icon: 'UserPlus', label: 'New joiners', value: '6', tone: 'info', trend: 'up', delta: '+2', to: '/hrm/employees' },
    ],
    charts: [
      {
        title: 'Headcount growth',
        type: 'area',
        data: s('count', 120, 6),
        x: 'month',
        series: [{ key: 'count', name: 'Employees' }],
      },
      {
        title: 'Attrition rate',
        type: 'line',
        data: s('rate', 4, 0, 1),
        x: 'month',
        series: [{ key: 'rate', name: 'Rate %' }],
      },
    ],
    donut: {
      title: 'Attendance today',
      data: [
        { label: 'Present', value: 128, color: 'var(--app-ok)' },
        { label: 'Late', value: 12, color: 'var(--app-warn)' },
        { label: 'Remote', value: 9, color: 'var(--app-info)' },
        { label: 'Absent', value: 7, color: 'var(--app-bad)' },
      ],
      centerLabel: 'present',
      centerValue: 128,
    },
    table: {
      title: 'Recent leave requests',
      columns: [
        { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} src={r.avatar} /> },
        { key: 'type', header: 'Type' },
        { key: 'days', header: 'Days', align: 'end' },
        { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: db.leaves.slice(0, 6),
      pageSize: 6,
    },
  },
  '/dashboard/recruitment': {
    title: 'Recruitment Dashboard',
    kpis: [
      { icon: 'Briefcase', label: 'Open roles', value: '12', tone: 'primary', to: '/recruitment/jobs' },
      { icon: 'Users', label: 'Applicants', value: '312', tone: 'info', to: '/recruitment/candidates' },
      { icon: 'CalendarClock', label: 'Interviews', value: '28', tone: 'purple' },
      { icon: 'CheckCircle2', label: 'Offers out', value: '7', tone: 'success', trend: 'up', delta: '+3' },
    ],
    charts: [
      {
        title: 'Applicants per week',
        type: 'column',
        data: s('n', 30, 8),
        x: 'month',
        series: [{ key: 'n', name: 'Applicants' }],
      },
      {
        title: 'Time to hire (days)',
        type: 'line',
        data: s('d', 30, -1, 1),
        x: 'month',
        series: [{ key: 'd', name: 'Days' }],
      },
    ],
    donut: {
      title: 'Pipeline by stage',
      data: [
        { label: 'Applied', value: 180, color: 'var(--app-info)' },
        { label: 'Screening', value: 64, color: 'var(--app-purple)' },
        { label: 'Interview', value: 42, color: 'var(--app-warn)' },
        { label: 'Offer', value: 12, color: 'var(--app-ok)' },
      ],
      centerLabel: 'candidates',
    },
    table: {
      title: 'Latest candidates',
      columns: [
        { key: 'name', header: 'Candidate', render: (r) => <EntityCell name={r.name} src={r.avatar} /> },
        { key: 'role', header: 'Role' },
        { key: 'stage', header: 'Stage', render: (r) => <StatusChip status={r.stage} /> },
        { key: 'applied', header: 'Applied', render: (r) => date(r.applied, 'dd MMM') },
      ],
      rows: db.candidates.slice(0, 6),
      pageSize: 6,
    },
  },
  '/dashboard/payroll': {
    title: 'Payroll Dashboard',
    kpis: [
      { icon: 'Wallet', label: 'Monthly payroll', value: '$248k', tone: 'primary', to: '/finance/payroll-items' },
      { icon: 'Users', label: 'Paid employees', value: '156', tone: 'success', to: '/finance/payslips' },
      { icon: 'Receipt', label: 'Reimbursements', value: '$12.4k', tone: 'info', to: '/finance/expenses' },
      { icon: 'TrendingUp', label: 'YoY change', value: '+8.2%', tone: 'warning', trend: 'up', delta: '+8.2%' },
    ],
    charts: [
      {
        title: 'Gross payroll cost',
        type: 'column',
        data: s('cost', 210000, 6000),
        x: 'month',
        series: [{ key: 'cost', name: 'Cost' }],
        dataFormat: { prefix: '$', format: 'compact' },
      },
      {
        title: 'Overtime hours',
        type: 'area',
        data: s('ot', 120, 20),
        x: 'month',
        series: [{ key: 'ot', name: 'Hours' }],
      },
    ],
    donut: {
      title: 'Cost split',
      data: [
        { label: 'Base pay', value: 190000, color: 'var(--app-accent)' },
        { label: 'Bonuses', value: 28000, color: 'var(--app-ok)' },
        { label: 'Benefits', value: 22000, color: 'var(--app-info)' },
        { label: 'Taxes', value: 8000, color: 'var(--app-warn)' },
      ],
      centerLabel: 'total',
      centerValue: '$248k',
    },
    table: {
      title: 'Recent payslips',
      columns: [
        { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} src={r.avatar} /> },
        { key: 'department', header: 'Department' },
        { key: 'salary', header: 'Monthly net', align: 'end', render: (r) => money(Math.round((r.salary / 12) * 0.78)) },
      ],
      rows: db.employees.slice(0, 6),
      pageSize: 6,
    },
  },
  '/dashboard/finance': {
    title: 'Finance Dashboard',
    kpis: [
      { icon: 'TrendingUp', label: 'Revenue (MTD)', value: '$66.4k', tone: 'primary', trend: 'up', delta: '+9%', to: '/admin/reports/invoices' },
      { icon: 'Wallet', label: 'Expenses (MTD)', value: '$41k', tone: 'danger', to: '/finance/expenses' },
      { icon: 'PiggyBank', label: 'Net profit', value: '$25.4k', tone: 'success', to: '/admin/reports/invoices' },
      { icon: 'Receipt', label: 'Outstanding', value: '$18.2k', tone: 'warning', to: '/finance/invoices' },
    ],
    charts: [
      {
        title: 'Revenue vs expense',
        type: 'area',
        data: months.map((m, i) => ({ month: m, revenue: 42000 + i * 3400, expense: 31000 + i * 1400 })),
        x: 'month',
        series: [{ key: 'revenue', name: 'Revenue' }, { key: 'expense', name: 'Expense' }],
        dataFormat: { prefix: '$', format: 'compact' },
        legend: true,
      },
      {
        title: 'Cash flow',
        type: 'column',
        data: s('flow', 8000, 1200, 800),
        x: 'month',
        series: [{ key: 'flow', name: 'Net' }],
        dataFormat: { prefix: '$', format: 'compact' },
      },
    ],
    donut: {
      title: 'Expense by category',
      data: [
        { label: 'Payroll', value: 210000, color: 'var(--app-accent)' },
        { label: 'Software', value: 24000, color: 'var(--app-info)' },
        { label: 'Marketing', value: 18000, color: 'var(--app-purple)' },
        { label: 'Travel', value: 9000, color: 'var(--app-warn)' },
      ],
      centerLabel: 'this month',
    },
    table: {
      title: 'Recent invoices',
      columns: [
        { key: 'id', header: 'Invoice' },
        { key: 'client', header: 'Client', render: (r) => <EntityCell name={r.client} square /> },
        { key: 'amount', header: 'Amount', align: 'end', render: (r) => money(r.amount) },
        { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: db.invoices.slice(0, 6),
      pageSize: 6,
    },
  },
  '/dashboard/deals': {
    title: 'Deals Dashboard',
    kpis: [
      { icon: 'Handshake', label: 'Open deals', value: '42', tone: 'primary', to: '/crm/deals' },
      { icon: 'DollarSign', label: 'Pipeline value', value: '$1.8M', tone: 'info', to: '/crm/deals' },
      { icon: 'Trophy', label: 'Won this quarter', value: '11', tone: 'success', trend: 'up', delta: '+4' },
      { icon: 'Percent', label: 'Win rate', value: '38%', tone: 'warning', trend: 'up', delta: '+4%' },
    ],
    charts: [
      {
        title: 'Pipeline value by month',
        type: 'area',
        data: s('v', 180000, 22000),
        x: 'month',
        series: [{ key: 'v', name: 'Pipeline' }],
        dataFormat: { prefix: '$', format: 'compact' },
      },
      {
        title: 'Deals created vs won',
        type: 'column',
        data: months.map((m, i) => ({ month: m, created: 8 + (i % 4), won: 3 + (i % 3) })),
        x: 'month',
        series: [{ key: 'created', name: 'Created' }, { key: 'won', name: 'Won' }],
        legend: true,
      },
    ],
    donut: {
      title: 'Deals by stage',
      data: [
        { label: 'Qualified', value: 18, color: 'var(--app-info)' },
        { label: 'Proposal', value: 12, color: 'var(--app-purple)' },
        { label: 'Negotiation', value: 8, color: 'var(--app-warn)' },
        { label: 'Won', value: 11, color: 'var(--app-ok)' },
      ],
      centerLabel: 'deals',
    },
    table: {
      title: 'Top deals',
      columns: [
        { key: 'name', header: 'Deal' },
        { key: 'company', header: 'Company' },
        { key: 'value', header: 'Value', align: 'end', render: (r) => money(r.value) },
        { key: 'stage', header: 'Stage', render: (r) => <StatusChip status={r.stage} /> },
      ],
      rows: db.deals.slice(0, 6),
      pageSize: 6,
    },
  },
  '/super-admin/dashboard': {
    title: 'Super Admin Dashboard',
    kpis: [
      { icon: 'Building2', label: 'Tenants', value: '148', tone: 'primary', to: '/super-admin/companies' },
      { icon: 'DollarSign', label: 'MRR', value: '$92.4k', tone: 'success', trend: 'up', delta: '+6%', to: '/super-admin/subscriptions' },
      { icon: 'Users', label: 'Total seats', value: '11,204', tone: 'info' },
      { icon: 'TriangleAlert', label: 'Past due', value: '6', tone: 'danger', to: '/super-admin/subscriptions' },
    ],
    charts: [
      {
        title: 'MRR growth',
        type: 'area',
        data: s('mrr', 62000, 4200),
        x: 'month',
        series: [{ key: 'mrr', name: 'MRR' }],
        dataFormat: { prefix: '$', format: 'compact' },
      },
      {
        title: 'New tenants',
        type: 'column',
        data: s('n', 6, 2),
        x: 'month',
        series: [{ key: 'n', name: 'Tenants' }],
      },
    ],
    donut: {
      title: 'Tenants by plan',
      data: [
        { label: 'Starter', value: 62, color: 'var(--app-info)' },
        { label: 'Growth', value: 71, color: 'var(--app-accent)' },
        { label: 'Enterprise', value: 15, color: 'var(--app-purple)' },
      ],
      centerLabel: 'tenants',
    },
    table: {
      title: 'Recent tenants',
      columns: [
        { key: 'name', header: 'Company', render: (r) => <EntityCell name={r.name} sub={r.industry} square /> },
        { key: 'plan', header: 'Plan' },
        { key: 'seats', header: 'Seats', align: 'end' },
        { key: 'mrr', header: 'MRR', align: 'end', render: (r) => money(r.mrr) },
      ],
      rows: db.companies.slice(0, 6).map((c, i) => ({
        ...c,
        plan: ['Starter', 'Growth', 'Enterprise'][i % 3],
        seats: 10 + (i * 7) % 200,
        mrr: 99 + (i % 5) * 400,
      })),
      pageSize: 6,
    },
  },
  '/ai/attendance-insights': {
    title: 'AI Attendance Insights',
    kpis: [
      { icon: 'Sparkles', label: 'Flagged patterns', value: '4', tone: 'warning' },
      { icon: 'Clock', label: 'Avg punch-in', value: '09:07', tone: 'primary' },
      { icon: 'TrendingDown', label: 'Late rate', value: '6.2%', tone: 'danger', trend: 'down', delta: '-1.1%' },
      { icon: 'Home', label: 'Remote days', value: '38%', tone: 'info' },
    ],
    charts: [
      { title: 'Predicted attendance', type: 'area', data: s('v', 92, 0, 2), x: 'month', series: [{ key: 'v', name: 'Rate %' }] },
      { title: 'Late arrivals by weekday', type: 'bar', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => ({ d, n: 4 + (i % 3) })), x: 'd', series: [{ key: 'n', name: 'Count' }] },
    ],
  },
  '/ai/payroll-forecast': {
    title: 'AI Payroll Forecast',
    kpis: [
      { icon: 'Wallet', label: 'Next month (est.)', value: '$254k', tone: 'primary', trend: 'up', delta: '+2.4%' },
      { icon: 'TrendingUp', label: 'Q4 projection', value: '$782k', tone: 'info' },
      { icon: 'Users', label: 'Headcount impact', value: '+8', tone: 'success' },
      { icon: 'Percent', label: 'Confidence', value: '91%', tone: 'purple' },
    ],
    charts: [
      {
        title: 'Payroll — actual vs forecast',
        type: 'area',
        data: [...s('actual', 210000, 6000).slice(0, 6), ...s('forecast', 246000, 4000).slice(6)].map((r, i) => ({
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i],
          value: r.actual ?? r.forecast,
        })),
        x: 'month',
        series: [{ key: 'value', name: 'Cost' }],
        dataFormat: { prefix: '$', format: 'compact' },
      },
    ],
  },
  '/ai/hiring-forecast': {
    title: 'AI Hiring Forecast',
    kpis: [
      { icon: 'Briefcase', label: 'Roles to open (Q4)', value: '9', tone: 'primary' },
      { icon: 'Clock', label: 'Predicted time-to-hire', value: '22d', tone: 'info', trend: 'down', delta: '-3d' },
      { icon: 'DollarSign', label: 'Recruiting budget', value: '$64k', tone: 'warning' },
      { icon: 'Target', label: 'Fill probability', value: '84%', tone: 'success' },
    ],
    charts: [
      { title: 'Projected openings', type: 'column', data: s('n', 4, 1), x: 'month', series: [{ key: 'n', name: 'Openings' }] },
      { title: 'Applicant supply index', type: 'line', data: s('v', 60, 3), x: 'month', series: [{ key: 'v', name: 'Index' }] },
    ],
  },
  '/ai/team-performance': {
    title: 'AI Team Performance Insights',
    kpis: [
      { icon: 'TrendingUp', label: 'Momentum score', value: '78', tone: 'primary', trend: 'up', delta: '+5' },
      { icon: 'Users', label: 'At-risk members', value: '3', tone: 'danger' },
      { icon: 'Star', label: 'Top performers', value: '12', tone: 'success' },
      { icon: 'MessageSquare', label: 'Feedback given', value: '146', tone: 'info' },
    ],
    charts: [
      { title: 'Team performance trend', type: 'area', data: s('v', 64, 3), x: 'month', series: [{ key: 'v', name: 'Score' }] },
      { title: 'Goals completion', type: 'column', data: s('n', 40, 6), x: 'month', series: [{ key: 'n', name: '% complete' }] },
    ],
  },
  '/dashboard/leads': {
    title: 'Leads Dashboard',
    kpis: [
      { icon: 'Target', label: 'New leads', value: '86', tone: 'primary', to: '/crm/leads' },
      { icon: 'Flame', label: 'Hot leads', value: '24', tone: 'danger', to: '/crm/leads' },
      { icon: 'PhoneCall', label: 'Contacted', value: '52', tone: 'info' },
      { icon: 'CheckCircle2', label: 'Qualified', value: '18', tone: 'success', trend: 'up', delta: '+6' },
    ],
    charts: [
      {
        title: 'Leads by source',
        type: 'bar',
        data: [
          { source: 'Website', n: 34 },
          { source: 'Referral', n: 22 },
          { source: 'Event', n: 15 },
          { source: 'Outreach', n: 10 },
          { source: 'Partner', n: 5 },
        ],
        x: 'source',
        series: [{ key: 'n', name: 'Leads' }],
      },
      {
        title: 'Lead volume',
        type: 'area',
        data: s('n', 40, 6),
        x: 'month',
        series: [{ key: 'n', name: 'Leads' }],
      },
    ],
    donut: {
      title: 'Leads by status',
      data: [
        { label: 'New', value: 40, color: 'var(--app-info)' },
        { label: 'Contacted', value: 28, color: 'var(--app-warn)' },
        { label: 'Qualified', value: 18, color: 'var(--app-ok)' },
        { label: 'Unqualified', value: 12, color: 'var(--app-bad)' },
      ],
      centerLabel: 'leads',
    },
    table: {
      title: 'Recent leads',
      columns: [
        { key: 'name', header: 'Lead' },
        { key: 'company', header: 'Company' },
        { key: 'source', header: 'Source' },
        { key: 'score', header: 'Score', align: 'end' },
        { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: db.leads.slice(0, 6),
      pageSize: 6,
    },
  },
}
