import { avatarUrl } from '../lib/format'
import { employees, projects, tasks } from './mock'

export const me = {
  name: 'Stella Marlowe',
  title: 'Senior Product Designer',
  team: 'Design Systems',
  phone: '+1 (415) 555 0186',
  email: 'stella.marlowe@elosh.app',
  reportsTo: 'Dominic Reyes',
  joined: '2024-02-19',
  avatar: avatarUrl(24),
}

export const leaveBreakdown = [
  { label: 'On time', value: 218, color: 'var(--app-ok)' },
  { label: 'Late attendance', value: 21, color: 'var(--app-warn)' },
  { label: 'Work from home', value: 34, color: 'var(--app-info)' },
  { label: 'Absent', value: 6, color: 'var(--app-bad)' },
  { label: 'Sick leave', value: 9, color: 'var(--app-purple)' },
]

export const leaveSummary = [
  { label: 'Total leaves', value: 20 },
  { label: 'Taken', value: 8 },
  { label: 'Absent', value: 1 },
  { label: 'Requests', value: 1 },
  { label: 'Worked days', value: 232 },
  { label: 'Loss of pay', value: 0 },
]

export const attendanceSeries = [
  { day: 'Mon', hours: 8.2 },
  { day: 'Tue', hours: 7.6 },
  { day: 'Wed', hours: 8.8 },
  { day: 'Thu', hours: 6.9 },
  { day: 'Fri', hours: 7.4 },
  { day: 'Sat', hours: 3.1 },
  { day: 'Sun', hours: 0 },
]

export const performanceSeries = [
  { month: 'Jan', score: 62 },
  { month: 'Feb', score: 68 },
  { month: 'Mar', score: 65 },
  { month: 'Apr', score: 74 },
  { month: 'May', score: 79 },
  { month: 'Jun', score: 83 },
  { month: 'Jul', score: 88 },
  { month: 'Aug', score: 91 },
]

export const skills = [
  { label: 'Product Design', value: 92 },
  { label: 'Design Systems', value: 88 },
  { label: 'Prototyping', value: 79 },
  { label: 'User Research', value: 71 },
  { label: 'Frontend', value: 64 },
]

export const birthdays = employees.slice(3, 7).map((e, i) => ({
  id: e.id,
  name: e.name,
  avatar: e.avatar,
  date: ['Today', 'Tomorrow', 'in 3 days', 'in 5 days'][i],
}))

export const teamMembers = employees.slice(8, 15).map((e) => ({
  id: e.id,
  name: e.name,
  role: e.designation,
  avatar: e.avatar,
  status: e.status === 'Active' ? 'online' : 'offline',
}))

export const myProjects = projects.slice(0, 3).map((p) => ({
  id: p.id,
  name: p.name,
  lead: p.lead,
  deadline: p.deadline,
  progress: p.progress,
  tasksDone: Math.round((p.progress / 100) * 10),
}))

export const myTasks = tasks.slice(0, 6)

export const meetings = [
  { id: 1, title: 'Design system sync', time: '09:30 – 10:00', with: 'Design Systems' },
  { id: 2, title: 'Sprint planning', time: '11:00 – 12:00', with: 'Product & Eng' },
  { id: 3, title: '1:1 with Dominic', time: '15:00 – 15:30', with: 'Dominic Reyes' },
  { id: 4, title: 'Research readout', time: '16:30 – 17:15', with: 'Research Guild' },
]

export const notifications = [
  { id: 1, text: 'Your leave request for 24 Apr was approved', when: '2h ago' },
  { id: 2, text: 'New comment from Anthony on Care Portal', when: '5h ago' },
  { id: 3, text: 'Payslip for August is ready', when: 'Yesterday' },
  { id: 4, text: 'Performance review cycle opens Monday', when: '2d ago' },
]

/* ---- Admin dashboard ---- */
export const adminKpis = [
  { label: 'Attendance overview', value: '128 / 156', tone: 'primary', to: '/hrm/attendance' },
  { label: "Total no. of projects", value: '92 / 120', tone: 'dark', to: '/projects/list' },
  { label: 'Total no. of clients', value: '69 / 86', tone: 'info', to: '/projects/clients' },
  { label: 'Total no. of tasks', value: '224 / 310', tone: 'pink', to: '/projects/tasks' },
  { label: 'Earnings', value: '$21,445', tone: 'purple', trend: 'up', delta: '12%', to: '/finance/payments' },
  { label: 'Profit this week', value: '$5,544', tone: 'danger', trend: 'up', delta: '8%', to: '/admin/reports/invoices' },
  { label: 'Job applicants', value: '98', tone: 'success', to: '/recruitment/candidates' },
  { label: 'New hires', value: '45 / 48', tone: 'dark', to: '/hrm/employees' },
]

export const empByDept = [
  { dept: 'Engineering', count: 48 },
  { dept: 'Design', count: 16 },
  { dept: 'Product', count: 12 },
  { dept: 'Sales', count: 22 },
  { dept: 'Marketing', count: 14 },
  { dept: 'People Ops', count: 8 },
  { dept: 'Finance', count: 9 },
]

export const revenueSeries = [
  { month: 'Jan', revenue: 42000, expense: 31000 },
  { month: 'Feb', revenue: 46500, expense: 33000 },
  { month: 'Mar', revenue: 44000, expense: 32500 },
  { month: 'Apr', revenue: 51000, expense: 35000 },
  { month: 'May', revenue: 55800, expense: 36500 },
  { month: 'Jun', revenue: 58200, expense: 38000 },
  { month: 'Jul', revenue: 61000, expense: 39500 },
  { month: 'Aug', revenue: 66400, expense: 41000 },
]

export const attendanceDonut = [
  { label: 'Present', value: 128, color: 'var(--app-ok)' },
  { label: 'Late', value: 14, color: 'var(--app-warn)' },
  { label: 'Remote', value: 9, color: 'var(--app-info)' },
  { label: 'Absent', value: 5, color: 'var(--app-bad)' },
]
