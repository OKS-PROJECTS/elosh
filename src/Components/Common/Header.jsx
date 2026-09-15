import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  TextField,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Badge,
  Avatar,
  Tooltip,
} from 'oks-ui'
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  LayoutGrid,
  Maximize,
  MessageSquare,
  Settings,
  User,
  LogOut,
} from 'lucide-react'
import { avatarUrl } from '../../lib/format'

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light',
  )
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark')
    else document.documentElement.removeAttribute('data-theme')
    try {
      localStorage.setItem('elosh-theme', next)
    } catch {
      /* ignore */
    }
  }
  return { theme, toggle }
}

const NOTIFICATIONS = [
  { id: 1, title: 'Leave request approved', time: '2m ago' },
  { id: 2, title: 'New candidate applied — Product Designer', time: '1h ago' },
  { id: 3, title: 'Payroll run scheduled for Friday', time: '3h ago' },
  { id: 4, title: 'Anthony Lewis commented on Office Management', time: 'Yesterday' },
]

export default function Header({ onMenuClick, onCollapseToggle }) {
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

  return (
    <header
      className="flex h-[60px] shrink-0 items-center gap-2 border-b px-3 sm:px-4"
      style={{ background: 'var(--app-header-bg)', borderColor: 'var(--app-header-border)' }}
    >
      <Button
        isIconOnly
        variant="ghost"
        color="default"
        size="sm"
        aria-label="Toggle menu"
        className="lg:hidden"
        onPress={onMenuClick}
      >
        <Menu size={18} />
      </Button>
      <Button
        isIconOnly
        variant="ghost"
        color="default"
        size="sm"
        aria-label="Collapse sidebar"
        className="hidden lg:inline-flex"
        onPress={onCollapseToggle}
      >
        <Menu size={18} />
      </Button>

      <div className="hidden w-full max-w-xs md:block">
        <TextField
          size="sm"
          variant="filled"
          placeholder="Search in Elosh"
          aria-label="Search"
          startIcon={<Search size={15} />}
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Tooltip content="Apps" placement="bottom">
          <Button isIconOnly variant="ghost" color="default" size="sm" aria-label="Apps">
            <LayoutGrid size={18} />
          </Button>
        </Tooltip>

        <Tooltip content="Messages" placement="bottom">
          <Button
            isIconOnly
            variant="ghost"
            color="default"
            size="sm"
            aria-label="Messages"
            onPress={() => navigate('/apps/chat')}
          >
            <MessageSquare size={18} />
          </Button>
        </Tooltip>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="ghost" color="default" size="sm" aria-label="Notifications">
              <Badge content={NOTIFICATIONS.length} color="danger" size="sm" shape="circle">
                <Bell size={18} />
              </Badge>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Notifications" className="w-80">
            <DropdownSection title="Notifications">
              {NOTIFICATIONS.map((n) => (
                <DropdownItem key={n.id} title={n.title} description={n.time} />
              ))}
            </DropdownSection>
            <DropdownItem key="all" title="View all notifications" onAction={() => navigate('/pages/timeline')} />
          </DropdownMenu>
        </Dropdown>

        <Tooltip content={theme === 'dark' ? 'Light mode' : 'Dark mode'} placement="bottom">
          <Button
            isIconOnly
            variant="ghost"
            color="default"
            size="sm"
            aria-label="Toggle theme"
            onPress={toggle}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </Tooltip>

        <Tooltip content="Fullscreen" placement="bottom">
          <Button
            isIconOnly
            variant="ghost"
            color="default"
            size="sm"
            aria-label="Fullscreen"
            className="hidden sm:inline-flex"
            onPress={() => {
              if (document.fullscreenElement) document.exitFullscreen()
              else document.documentElement.requestFullscreen?.()
            }}
          >
            <Maximize size={17} />
          </Button>
        </Tooltip>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button
              className="ml-1 rounded-full transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: 'var(--app-accent)' }}
              aria-label="Account menu"
            >
              <Avatar size={32} src={avatarUrl(7)} name="Adrian Park" />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Account">
            <DropdownItem key="me" title="Adrian Park" description="adrian@elosh.app" isReadOnly />
            <DropdownItem
              key="profile"
              title="My Profile"
              startContent={<User size={15} />}
              onAction={() => navigate('/pages/profile')}
            />
            <DropdownItem
              key="settings"
              title="Settings"
              startContent={<Settings size={15} />}
              onAction={() => navigate('/settings/profile')}
            />
            <DropdownItem
              key="logout"
              title="Sign out"
              color="danger"
              startContent={<LogOut size={15} />}
              onAction={() => navigate('/auth/login')}
            />
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}
