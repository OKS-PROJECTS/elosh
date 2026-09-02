import { avatarUrl } from '../lib/format'

/* Deterministic mock data — index-generated, never Math.random, never the
   reference's own strings/numbers. */

const FIRST = [
  'Aria', 'Noah', 'Maya', 'Leo', 'Priya', 'Owen', 'Zara', 'Ethan', 'Iris', 'Kai',
  'Nina', 'Ravi', 'Mira', 'Sam', 'Tara', 'Ben', 'Lucia', 'Omar', 'Elsa', 'Finn',
  'Anya', 'Cole', 'Hana', 'Isaac', 'Juno', 'Liam', 'Nora', 'Reed', 'Suki', 'Vera',
]
const LAST = [
  'Bennett', 'Cross', 'Delgado', 'Fenwick', 'Grover', 'Hollis', 'Ipsen', 'Jarrah',
  'Keller', 'Lombard', 'Marsh', 'Naylor', 'Okafor', 'Pruitt', 'Quill', 'Rhodes',
  'Sowell', 'Trent', 'Underwood', 'Voss', 'Whitlock', 'Yates', 'Zimmer', 'Ashby',
]
const DEPARTMENTS = [
  'Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'People Ops', 'Finance',
  'Customer Success', 'Data', 'Operations', 'Legal', 'IT',
]
const DESIGNATIONS = [
  'Software Engineer', 'Senior Engineer', 'Product Designer', 'UX Researcher',
  'Product Manager', 'Marketing Lead', 'Account Executive', 'HR Business Partner',
  'Finance Analyst', 'Support Specialist', 'Data Scientist', 'Ops Coordinator',
]
const COMPANIES = [
  'Northwind Labs', 'Brightpath Co', 'Meridian Group', 'Cobalt Systems', 'Vantage Retail',
  'Harbor Analytics', 'Ridgeline Media', 'Quanta Foods', 'Lumen Health', 'Fjord Robotics',
  'Cedar & Vale', 'Atlas Freight', 'Pinecrest Bank', 'Solace Energy', 'Onyx Studios',
]
const CITIES = ['Austin', 'Denver', 'Lisbon', 'Toronto', 'Berlin', 'Dublin', 'Pune', 'Nairobi', 'Bogotá', 'Osaka']
const STATUSES = ['Active', 'Pending', 'On Hold', 'Completed', 'Inactive']

const pick = (arr, i) => arr[i % arr.length]
const day = (i) => {
  const d = new Date(2026, 0, 1)
  d.setDate(d.getDate() + ((i * 37) % 540) - 120)
  return d.toISOString().slice(0, 10)
}

export const person = (i) => {
  const first = pick(FIRST, i * 3 + 1)
  const last = pick(LAST, i * 5 + 2)
  const name = `${first} ${last}`
  return {
    id: `EMP-${String(1000 + i)}`,
    name,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@elosh.app`,
    phone: `+1 (${200 + (i % 700)}) ${100 + (i % 900)}-${1000 + (i % 9000)}`,
    department: pick(DEPARTMENTS, i + 1),
    designation: pick(DESIGNATIONS, i * 2),
    location: pick(CITIES, i * 3),
    joined: day(i + 4),
    status: pick(['Active', 'Active', 'Active', 'Pending', 'Inactive'], i),
    avatar: avatarUrl(i + 11),
    salary: 52000 + ((i * 2137) % 90000),
  }
}

export const employees = Array.from({ length: 48 }, (_, i) => person(i))

export const departments = DEPARTMENTS.map((name, i) => ({
  id: `DEP-${10 + i}`,
  name,
  head: employees[(i * 4) % employees.length].name,
  members: 4 + ((i * 7) % 26),
  status: i % 5 === 0 ? 'Inactive' : 'Active',
  created: day(i + 2),
}))

export const designations = DESIGNATIONS.map((name, i) => ({
  id: `DES-${20 + i}`,
  name,
  department: pick(DEPARTMENTS, i),
  employees: 2 + ((i * 5) % 18),
  status: 'Active',
}))

export const companies = COMPANIES.map((name, i) => ({
  id: `CMP-${300 + i}`,
  name,
  industry: pick(['Retail', 'Technology', 'Healthcare', 'Media', 'Logistics', 'Finance'], i),
  location: pick(CITIES, i + 2),
  contacts: 1 + (i % 6),
  deals: (i * 3) % 12,
  revenue: 120000 + ((i * 91733) % 2400000),
  status: pick(STATUSES, i),
})).map((c) => ({ ...c, owner: employees[(c.deals + 3) % employees.length].name }))

export const contacts = Array.from({ length: 32 }, (_, i) => {
  const p = person(i + 60)
  return {
    id: `CON-${400 + i}`,
    name: p.name,
    email: p.email,
    phone: p.phone,
    company: pick(COMPANIES, i),
    title: pick(DESIGNATIONS, i + 3),
    location: p.location,
    status: pick(STATUSES, i + 1),
    avatar: p.avatar,
  }
})

export const deals = Array.from({ length: 28 }, (_, i) => ({
  id: `DL-${500 + i}`,
  name: `${pick(COMPANIES, i)} — ${pick(['Renewal', 'Expansion', 'New Business', 'Upgrade'], i)}`,
  company: pick(COMPANIES, i),
  value: 8000 + ((i * 5471) % 180000),
  stage: pick(['Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'], i),
  owner: employees[(i * 2) % employees.length].name,
  closeDate: day(i + 30),
  status: pick(['Open', 'Open', 'Won', 'Lost'], i),
}))

export const leads = Array.from({ length: 26 }, (_, i) => ({
  id: `LD-${600 + i}`,
  name: person(i + 90).name,
  company: pick(COMPANIES, i + 1),
  source: pick(['Website', 'Referral', 'Event', 'Cold Outreach', 'Partner'], i),
  score: 20 + ((i * 13) % 80),
  owner: employees[(i * 3) % employees.length].name,
  created: day(i + 12),
  status: pick(['New', 'Contacted', 'Qualified', 'Unqualified'], i),
}))

export const projects = Array.from({ length: 22 }, (_, i) => ({
  id: `PRJ-${700 + i}`,
  name: pick(
    ['Office Management', 'Mobile Banking App', 'Warehouse Sync', 'Care Portal', 'Fleet Tracker',
     'Retail Insights', 'Payroll Revamp', 'Onboarding Flow', 'Data Lakehouse', 'Support Copilot'],
    i,
  ),
  client: pick(COMPANIES, i + 2),
  lead: employees[(i * 4) % employees.length].name,
  progress: (i * 11) % 100,
  deadline: day(i + 45),
  budget: 15000 + ((i * 7919) % 120000),
  status: pick(['Active', 'On Hold', 'Completed', 'Active'], i),
}))

export const tasks = Array.from({ length: 30 }, (_, i) => ({
  id: `TSK-${800 + i}`,
  title: pick(
    ['Appointment booking', 'Video conferencing module', 'Private chat', 'Go-live support',
     'Payment reconciliation', 'Design QA pass', 'API rate limiting', 'Import pipeline',
     'Accessibility audit', 'Release notes'],
    i,
  ),
  project: pick(['Office Management', 'Mobile Banking App', 'Care Portal', 'Fleet Tracker'], i),
  assignee: employees[(i * 5) % employees.length].name,
  priority: pick(['Low', 'Medium', 'High'], i),
  due: day(i + 8),
  status: pick(['Pending', 'In Progress', 'Completed', 'On Hold'], i),
}))

export const invoices = Array.from({ length: 24 }, (_, i) => ({
  id: `INV-${2400 + i}`,
  client: pick(COMPANIES, i),
  amount: 1200 + ((i * 3313) % 42000),
  issued: day(i + 3),
  due: day(i + 20),
  status: pick(['Paid', 'Pending', 'Overdue', 'Draft'], i),
}))

export const candidates = Array.from({ length: 24 }, (_, i) => {
  const p = person(i + 120)
  return {
    id: `CAND-${900 + i}`,
    name: p.name,
    role: pick(DESIGNATIONS, i),
    experience: `${2 + (i % 12)} yrs`,
    stage: pick(['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'], i),
    applied: day(i + 6),
    rating: 1 + (i % 5),
    avatar: p.avatar,
  }
})

export const jobs = Array.from({ length: 16 }, (_, i) => ({
  id: `JOB-${140 + i}`,
  title: pick(DESIGNATIONS, i),
  department: pick(DEPARTMENTS, i),
  type: pick(['Full-time', 'Contract', 'Part-time'], i),
  location: pick([...CITIES, 'Remote'], i),
  applicants: 4 + ((i * 9) % 60),
  status: pick(['Open', 'Open', 'Closed', 'On Hold'], i),
  posted: day(i + 2),
}))

export const leaves = Array.from({ length: 26 }, (_, i) => {
  const p = person(i + 30)
  return {
    id: `LV-${160 + i}`,
    name: p.name,
    avatar: p.avatar,
    type: pick(['Annual', 'Sick', 'Casual', 'Unpaid', 'Maternity'], i),
    from: day(i + 1),
    to: day(i + 3),
    days: 1 + (i % 5),
    status: pick(['Approved', 'Pending', 'Rejected', 'Approved'], i),
  }
})

export const attendance = Array.from({ length: 24 }, (_, i) => {
  const p = person(i + 5)
  return {
    id: `AT-${180 + i}`,
    name: p.name,
    avatar: p.avatar,
    date: day(i),
    checkIn: `0${8 + (i % 2)}:${(i * 7) % 60 < 10 ? '0' : ''}${(i * 7) % 60} AM`,
    checkOut: `0${5 + (i % 2)}:${(i * 11) % 60 < 10 ? '0' : ''}${(i * 11) % 60} PM`,
    hours: `${7 + (i % 3)}h ${(i * 9) % 60}m`,
    status: pick(['Present', 'Present', 'Late', 'Work From Home', 'Absent'], i),
  }
})

export const tickets = Array.from({ length: 22 }, (_, i) => ({
  id: `TIC-${2200 + i}`,
  subject: pick(
    ['Cannot access payslip', 'VPN keeps disconnecting', 'Request new monitor',
     'Onboarding checklist bug', 'Payroll discrepancy', 'Calendar sync failing',
     'Access to analytics dashboard', 'Password reset loop'],
    i,
  ),
  requester: person(i + 40).name,
  priority: pick(['Low', 'Medium', 'High', 'Urgent'], i),
  agent: employees[(i * 6) % employees.length].name,
  created: day(i + 1),
  status: pick(['Open', 'In Progress', 'On Hold', 'Completed'], i),
}))

export const expenses = Array.from({ length: 20 }, (_, i) => ({
  id: `EXP-${260 + i}`,
  title: pick(['Team offsite', 'Software licence', 'Client dinner', 'Travel — conference',
    'Office supplies', 'Cloud hosting', 'Recruiter fee', 'Training course'], i),
  category: pick(['Travel', 'Software', 'Meals', 'Equipment', 'Services'], i),
  amount: 80 + ((i * 947) % 6000),
  date: day(i + 4),
  submittedBy: employees[(i * 3) % employees.length].name,
  status: pick(['Approved', 'Pending', 'Rejected'], i),
}))

export const users = employees.slice(0, 18).map((e, i) => ({
  id: `USR-${e.id}`,
  name: e.name,
  email: e.email,
  role: pick(['Admin', 'Manager', 'Employee', 'Recruiter', 'Finance'], i),
  lastActive: day(i + 1),
  status: e.status,
  avatar: e.avatar,
}))

export const activities = Array.from({ length: 14 }, (_, i) => ({
  id: `ACT-${i}`,
  who: employees[(i * 2) % employees.length].name,
  what: pick(
    ['approved a leave request', 'closed a deal', 'added a new candidate', 'updated a project',
     'submitted an expense', 'created an invoice', 'commented on a task', 'onboarded a new hire'],
    i,
  ),
  when: day(i),
}))
