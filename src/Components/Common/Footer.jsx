import { Link } from 'react-router-dom'
import { Chip } from 'oks-ui'
import pkg from '../../../package.json'

export const REPO_URL = 'https://github.com/OKS-PROJECTS/elosh'

export default function Footer() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 text-xs sm:px-6"
      style={{ borderColor: 'var(--app-border)', color: 'var(--app-fg-muted)' }}
    >
      <span>
        © {new Date().getFullYear()} Elosh. Built entirely with{' '}
        <a
          href="https://www.npmjs.com/package/oks-ui"
          className="font-medium"
          style={{ color: 'var(--app-accent)' }}
          target="_blank"
          rel="noreferrer"
        >
          oks-ui
        </a>
        .
      </span>
      <div className="flex items-center gap-3">
        <Link to="/settings/profile" className="hover:underline">
          Settings
        </Link>
        <Link to="/content/faq" className="hover:underline">
          Support
        </Link>
        <a href={REPO_URL} className="hover:underline" target="_blank" rel="noreferrer">
          Repository
        </a>
        <Chip size="sm" variant="soft" color="default">
          v{pkg.version}
        </Chip>
      </div>
    </footer>
  )
}
