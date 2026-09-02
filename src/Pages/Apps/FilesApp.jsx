import { Button, Progress } from 'oks-ui'
import { Folder, FileText, FileSpreadsheet, FileImage, Upload, MoreVertical } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { date } from '../../lib/format'

const FOLDERS = [
  { name: 'Contracts', files: 24 },
  { name: 'Payroll', files: 56 },
  { name: 'Recruitment', files: 38 },
  { name: 'Policies', files: 12 },
]
const FILES = [
  { name: 'Employee Handbook 2026.pdf', type: 'pdf', size: '3.2 MB' },
  { name: 'August Payroll.xlsx', type: 'xls', size: '820 KB' },
  { name: 'Offer — Aria Bennett.pdf', type: 'pdf', size: '210 KB' },
  { name: 'Org Chart.png', type: 'img', size: '1.1 MB' },
  { name: 'Benefits Overview.pdf', type: 'pdf', size: '640 KB' },
  { name: 'Q3 Headcount.xlsx', type: 'xls', size: '410 KB' },
]
const ICON = { pdf: FileText, xls: FileSpreadsheet, img: FileImage }

export default function FilesApp() {
  return (
    <>
      <PageHeader
        title="File Manager"
        actions={<Button size="sm" color="primary" startContent={<Upload size={14} />}>Upload</Button>}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {FOLDERS.map((f) => (
          <Surface key={f.name} bodyClassName="p-4">
            <Folder size={22} style={{ color: 'var(--app-accent)' }} />
            <div className="mt-2 text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
              {f.name}
            </div>
            <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
              {f.files} files
            </div>
          </Surface>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
        <Surface title="Recent files" bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {FILES.map((file, i) => {
              const Icon = ICON[file.type]
              return (
                <li key={i} className="flex items-center gap-3 p-3.5">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-md"
                    style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-muted)' }}
                  >
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                      {file.name}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
                      {file.size} · {date(new Date(2026, 7, 18 - i), 'dd MMM')}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" color="default" isIconOnly aria-label="More">
                    <MoreVertical size={15} />
                  </Button>
                </li>
              )
            })}
          </ul>
        </Surface>
        <Surface title="Storage">
          <div className="text-2xl font-bold" style={{ color: 'var(--app-heading)' }}>
            64.2 GB
          </div>
          <div className="text-xs" style={{ color: 'var(--app-fg-muted)' }}>
            of 100 GB used
          </div>
          <Progress className="mt-3" value={64} color="primary" size="sm" aria-label="Storage used" />
        </Surface>
      </div>
    </>
  )
}
