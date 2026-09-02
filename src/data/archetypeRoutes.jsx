/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { LIST_CONFIGS } from './lists'
import { SETTINGS_CONFIGS } from './settings'
import { REPORT_CONFIGS } from './reports'

const ListPage = lazy(() => import('../Pages/InnerPages/ListPage'))
const SettingsPage = lazy(() => import('../Pages/InnerPages/SettingsPage'))
const ReportPage = lazy(() => import('../Pages/InnerPages/ReportPage'))

export const listRoutePaths = Object.keys(LIST_CONFIGS)
export const settingsRoutePaths = Object.keys(SETTINGS_CONFIGS)
export const reportRoutePaths = Object.keys(REPORT_CONFIGS)

export const configuredRoutePaths = [
  ...listRoutePaths,
  ...settingsRoutePaths,
  ...reportRoutePaths,
]

export const archetypeRoutes = [
  ...listRoutePaths.map((p) => (
    <Route key={p} path={p} element={<ListPage config={LIST_CONFIGS[p]} />} />
  )),
  ...settingsRoutePaths.map((p) => (
    <Route key={p} path={p} element={<SettingsPage config={SETTINGS_CONFIGS[p]} />} />
  )),
  ...reportRoutePaths.map((p) => (
    <Route key={p} path={p} element={<ReportPage config={REPORT_CONFIGS[p]} />} />
  )),
]
