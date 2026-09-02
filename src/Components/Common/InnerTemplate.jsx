import { Suspense, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Drawer, Loader } from 'oks-ui'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { useIsDesktop } from '../../lib/useMediaQuery'

export default function InnerTemplate() {
  const isDesktop = useIsDesktop()
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="flex h-full w-full overflow-hidden" style={{ background: 'var(--app-bg)' }}>
      {isDesktop && (
        <div className="shrink-0">
          <Sidebar collapsed={collapsed} />
        </div>
      )}

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="left"
        width={252}
        classNames={{ body: 'p-0' }}
      >
        <Sidebar onNavigate={() => setDrawerOpen(false)} />
      </Drawer>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() => setDrawerOpen(true)}
          onCollapseToggle={() => setCollapsed((c) => !c)}
        />
        <main ref={mainRef} className="app-scroll min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6">
            <Suspense
              fallback={
                <div className="flex h-64 items-center justify-center">
                  <Loader />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
