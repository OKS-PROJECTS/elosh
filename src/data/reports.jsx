import { EntityCell, StatusChip } from '../Components/ui'
import { money, date } from '../lib/format'
import * as db from './mock'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const series12 = (base, step) => months.map((m, i) => ({ month: m, value: base + i * step + (i % 3) * step }))

export const REPORT_CONFIGS = {
  '/admin/reports/expenses': {
    title: 'Expense Report',
    subtitle: 'Company spend by month and category.',
    chart: {
      title: 'Monthly spend',
      type: 'column',
      data: series12(12000, 1400),
      x: 'month',
      series: [{ key: 'value', name: 'Spend' }],
      dataFormat: { prefix: '$', format: 'compact' },
    },
    columns: [
      { key: 'title', header: 'Expense', sortable: true },
      { key: 'category', header: 'Category' },
      { key: 'amount', header: 'Amount', align: 'end', render: (r) => money(r.amount) },
      { key: 'date', header: 'Date', render: (r) => date(r.date) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: db.expenses,
    searchKeys: ['title', 'category'],
  },
  '/admin/reports/invoices': {
    title: 'Invoice Report',
    subtitle: 'Billed vs collected over the year.',
    chart: {
      title: 'Billed vs collected',
      type: 'area',
      data: months.map((m, i) => ({ month: m, billed: 40000 + i * 3000, collected: 35000 + i * 2800 })),
      x: 'month',
      series: [{ key: 'billed', name: 'Billed' }, { key: 'collected', name: 'Collected' }],
      dataFormat: { prefix: '$', format: 'compact' },
    },
    columns: [
      { key: 'id', header: 'Invoice' },
      { key: 'client', header: 'Client', render: (r) => <EntityCell name={r.client} square /> },
      { key: 'amount', header: 'Amount', align: 'end', render: (r) => money(r.amount) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: db.invoices,
    searchKeys: ['id', 'client'],
  },
  '/admin/reports/payroll': {
    title: 'Payroll Report',
    subtitle: 'Gross payroll cost by month.',
    chart: {
      title: 'Payroll cost',
      type: 'column',
      data: series12(210000, 6000),
      x: 'month',
      series: [{ key: 'value', name: 'Gross payroll' }],
      dataFormat: { prefix: '$', format: 'compact' },
    },
    columns: [
      { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} src={r.avatar} /> },
      { key: 'department', header: 'Department' },
      { key: 'salary', header: 'Annual', align: 'end', render: (r) => money(r.salary) },
    ],
    rows: db.employees,
    searchKeys: ['name', 'department'],
  },
  '/admin/reports/attendance': {
    title: 'Attendance Report',
    subtitle: 'Attendance rate trend.',
    chart: {
      title: 'Attendance rate',
      type: 'line',
      data: months.map((m, i) => ({ month: m, value: 92 + (i % 4) })),
      x: 'month',
      series: [{ key: 'value', name: 'Rate %' }],
    },
    columns: [
      { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} src={r.avatar} /> },
      { key: 'date', header: 'Date', render: (r) => date(r.date) },
      { key: 'hours', header: 'Hours', align: 'end' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: db.attendance,
    searchKeys: ['name'],
  },
  '/admin/reports/leave': {
    title: 'Leave Report',
    subtitle: 'Leave days taken by type.',
    chart: {
      title: 'Leave days by month',
      type: 'column',
      data: series12(20, 4),
      x: 'month',
      series: [{ key: 'value', name: 'Days' }],
    },
    columns: [
      { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} src={r.avatar} /> },
      { key: 'type', header: 'Type' },
      { key: 'days', header: 'Days', align: 'end' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: db.leaves,
    searchKeys: ['name', 'type'],
  },
  '/admin/reports/employees': {
    title: 'Employee Report',
    subtitle: 'Headcount growth and distribution.',
    chart: {
      title: 'Headcount',
      type: 'area',
      data: series12(120, 6),
      x: 'month',
      series: [{ key: 'value', name: 'Employees' }],
    },
    columns: [
      { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} sub={r.email} src={r.avatar} /> },
      { key: 'department', header: 'Department' },
      { key: 'designation', header: 'Designation' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: db.employees,
    searchKeys: ['name', 'department'],
  },
  '/crm/analytics': {
    title: 'CRM Analytics',
    subtitle: 'Pipeline and conversion trends.',
    chart: {
      title: 'Pipeline value by month',
      type: 'area',
      data: series12(180000, 22000),
      x: 'month',
      series: [{ key: 'value', name: 'Pipeline' }],
      dataFormat: { prefix: '$', format: 'compact' },
    },
    columns: [
      { key: 'name', header: 'Deal', sortable: true },
      { key: 'company', header: 'Company' },
      { key: 'value', header: 'Value', align: 'end', render: (r) => money(r.value) },
      { key: 'stage', header: 'Stage', render: (r) => <StatusChip status={r.stage} /> },
    ],
    rows: db.deals,
    searchKeys: ['name', 'company'],
  },
}
