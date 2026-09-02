/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { LIST_CONFIGS } from './lists'
import { EXTRA_LIST_CONFIGS } from './listsExtra'
import { SETTINGS_CONFIGS } from './settings'
import { REPORT_CONFIGS } from './reports'

const ListPage = lazy(() => import('../Pages/InnerPages/ListPage'))
const SettingsPage = lazy(() => import('../Pages/InnerPages/SettingsPage'))
const ReportPage = lazy(() => import('../Pages/InnerPages/ReportPage'))

const ALL_LISTS = { ...LIST_CONFIGS, ...EXTRA_LIST_CONFIGS }

export const listRoutePaths = Object.keys(ALL_LISTS)
export const settingsRoutePaths = Object.keys(SETTINGS_CONFIGS)
export const reportRoutePaths = Object.keys(REPORT_CONFIGS)

export const configuredRoutePaths = [
  ...listRoutePaths,
  ...settingsRoutePaths,
  ...reportRoutePaths,
]

export const archetypeRoutes = [
  ...listRoutePaths.map((p) => (
    <Route key={p} path={p} element={<ListPage config={ALL_LISTS[p]} />} />
  )),
  ...settingsRoutePaths.map((p) => (
    <Route key={p} path={p} element={<SettingsPage config={SETTINGS_CONFIGS[p]} />} />
  )),
  ...reportRoutePaths.map((p) => (
    <Route key={p} path={p} element={<ReportPage config={REPORT_CONFIGS[p]} />} />
  )),
]
