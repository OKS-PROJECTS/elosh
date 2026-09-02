# Changelog

All notable changes to Elosh are documented here. Format based on
[Keep a Changelog](https://keepachangelog.com/); this project adheres to SemVer.

> Requires oks-ui ^1.1.2

## [Unreleased]

### Added
- App shell: recursive sidebar (oks-ui `Nav`), header control cluster, mobile drawer,
  scroll-to-top on navigation.
- `--app-*` design-token layer ported from the reference; light + dark themes; global
  oks-ui patches (`.oksChart`, donut centre, bordered-button contrast).
- Composition layer (`src/Components/ui/`): Surface, PageHeader, StatCard, DataTable,
  MiniTable, EntityCell, ChartCard, DonutCard, StatusChip, TrendChip.
- Config-driven archetypes: ListPage, SettingsPage, ReportPage, DashboardPage, FormPage.
- Dashboards: Employee (high fidelity), Admin, HR, Recruitment, Payroll, Finance, Deals,
  Leads, Super Admin, and five AI Center pages.
- Apps: Chat, Email (3-pane), Calendar, Kanban board, Notes, To Do, File Manager.
- List/CRUD pages across HRM, CRM, Recruitment, Finance, Administration, Content.
- Settings panels, admin reports, component gallery + kitchen sink.
- Auth split-screen (sign in / up, forgot / reset password, 2-step, lock) and
  standalone 404 / 500 / maintenance pages.

## [0.1.0]

- Project scaffold.
