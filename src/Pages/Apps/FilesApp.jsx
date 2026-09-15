import { useState } from 'react'
import { Button, Progress, Modal, FileField, toast } from 'oks-ui'
import { Folder, FileText, FileSpreadsheet, FileImage, File as FileIcon, Upload, MoreVertical } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { date } from '../../lib/format'

const FOLDERS = [
  { name: 'Contracts', files: 24 },
  { name: 'Payroll', files: 56 },
  { name: 'Recruitment', files: 38 },
  { name: 'Policies', files: 12 },
]
const SEED_FILES = [
  { id: 1, name: 'Employee Handbook 2026.pdf', type: 'pdf', size: '3.2 MB' },
  { id: 2, name: 'August Payroll.xlsx', type: 'xls', size: '820 KB' },
  { id: 3, name: 'Offer — Aria Bennett.pdf', type: 'pdf', size: '210 KB' },
  { id: 4, name: 'Org Chart.png', type: 'img', size: '1.1 MB' },
  { id: 5, name: 'Benefits Overview.pdf', type: 'pdf', size: '640 KB' },
  { id: 6, name: 'Q3 Headcount.xlsx', type: 'xls', size: '410 KB' },
]
const ICON = { pdf: FileText, xls: FileSpreadsheet, img: FileImage, other: FileIcon }

const kindOf = (name) => {
  const ext = name.split('.').pop().toLowerCase()
  if (ext === 'pdf') return 'pdf'
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'xls'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'img'
  return 'other'
}
const formatSize = (bytes) => (bytes > 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.round(bytes / 1e3)} KB`)

export default function FilesApp() {
  const [files, setFiles] = useState(SEED_FILES)
  const [uploadOpen, setUploadOpen] = useState(false)

  const handleUpload = (uploaded) => {
    if (!uploaded.length) return
    const additions = uploaded.map((f) => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      type: kindOf(f.name),
      size: formatSize(f.size),
    }))
    setFiles((cur) => [...additions, ...cur])
    setUploadOpen(false)
    toast.success(`${uploaded.length} file${uploaded.length > 1 ? 's' : ''} uploaded`)
  }

  return (
    <>
      <PageHeader
        title="File Manager"
        actions={
          <Button size="sm" color="primary" startContent={<Upload size={14} />} onPress={() => setUploadOpen(true)}>
            Upload
          </Button>
        }
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
            {files.map((file, i) => {
              const Icon = ICON[file.type]
              return (
                <li key={file.id} className="flex items-center gap-3 p-3.5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
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
                  <Button
                    size="sm"
                    variant="ghost"
                    color="default"
                    isIconOnly
                    aria-label="More"
                    onPress={() => {
                      setFiles((cur) => cur.filter((f) => f.id !== file.id))
                      toast.success('File removed')
                    }}
                  >
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

      <Modal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload files">
        <FileField
          label="Files"
          ui="dropzone"
          isDroppable
          maxFiles={5}
          showFileList
          onChange={handleUpload}
        />
      </Modal>
    </>
  )
}
