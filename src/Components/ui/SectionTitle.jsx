export default function SectionTitle({ children, actions }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-semibold" style={{ color: 'var(--app-heading)' }}>
        {children}
      </h2>
      {actions}
    </div>
  )
}
