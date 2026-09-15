# Changelog

All notable changes to Elosh are documented here. Format based on
[Keep a Changelog](https://keepachangelog.com/); this project adheres to SemVer.

> Requires oks-ui ^1.1.2

## [1.2.0] — 2026-09-15

Every primary action on the deep app pages (Chat, Email, Notes, Kanban, Calendar,
Files) now does something real instead of being a dead button — and a genuinely
serious oks-ui bug is fixed along the way.

### Added
- **Email**: working Compose (modal → new Sent item), per-folder filtering
  (Inbox/Starred/Sent/Drafts/Trash with live counts), inline Reply, and Delete
  (moves to Trash); empty-folder state.
- **Chat**: live search filtering threads by name; each thread now has its own
  distinct conversation history instead of all threads sharing one.
- **Notes**: "New note" creates and selects a real note; title/body are now
  editable in place; delete note.
- **Kanban**: "Add card" opens a form (title, project, priority, assignee) and
  adds a real card to the To Do column.
- **Calendar**: "New event" opens a form (title, date via `DatePickerField`,
  colour) and adds a real, correctly-dated event to the month grid and the
  Upcoming list.
- **File Manager**: "Upload" opens a real `FileField` dropzone; uploaded files
  are added to Recent Files with a formatted size; the "more" action now removes
  a file from the list.

### Fixed
- **Confirmed and fixed a blocker-severity oks-ui bug**: bare field components
  (`TextField`, `SelectField`, `TextAreaField`, `DatePickerField`) silently do
  not register with `<Form>` — only `FormFieldSet` does. Every form built with
  bare fields inside a `<Form onSubmit>` was submitting `undefined` for every
  field while still showing a success toast (Compose email sent to "New
  recipient" with "(no subject)", new Kanban cards with a blank title, calendar
  events dated to today instead of the picked date). Rebuilt every affected form
  — Email compose/reply, Kanban add-card, Calendar new-event, and the component
  gallery's own form-fields demo — with `FormFieldSet`. Logged upstream as
  OKS-UI-FEEDBACK B10.
- **A second occurrence of the `Checkbox` `width:100%` bug** (see 1.1.0): the
  Login page's "Remember me" checkbox was squeezing "Forgot password?" into a
  wrapped, squashed column next to it — reported live by a user screenshot.
  Fixed the same way (`w-auto shrink-0`); updated OKS-UI-FEEDBACK B9 to note a
  labelled `Checkbox` is just as affected as an unlabelled one.

## [1.1.0] — 2026-09-15

Step 6b design-quality sweep: states, dark mode, and a real mobile pass on the
deep app pages, plus one worked FormPage example.

### Added
- `FormPage` archetype wired to a real route (`/hrm/employees/new`) — the
  Employees list's "Add employee" now navigates to a genuine create form
  instead of a toast; `FormPage` gained an optional `backTo` affordance.

### Fixed
- **`Checkbox` inside a flex row collapsed its siblings** — oks-ui's `Checkbox`
  wrapper is `width: 100%` unconditionally, which ate ~93% of a To Do list row
  at wide viewports, squeezing the task label into a single-character column.
  Fixed with an explicit `w-auto shrink-0` override; logged upstream (oks-ui
  feedback B9).
- Chat and Email are now real single-pane-on-mobile experiences: the thread/
  mail list shows first below the `lg` breakpoint, tapping an item reveals the
  conversation/reading pane with a "Back" affordance, matching the desktop
  side-by-side layout at `lg` and up. Previously the reading pane showed
  unconditionally, so mobile users had no way to browse other threads/mail.
- Every raw "nav row" `<button>` (chat threads, email folders/mail, notes)
  now has explicit hover and focus-visible states; the email folder list
  gained a working active-selection state (previously nothing indicated the
  current folder).
- Plain inline text links (auth footers, "forgot password") now have a
  consistent hover/focus treatment via a shared `.elosh-link` class.
- The two-step verification page's "Resend code" affordance is now a real
  oks-ui `Button` instead of an unstyled raw `<button>`.

## [1.0.1] — 2026-09-15

### Fixed
- Employee Dashboard profile banner now matches the reference's single-line
  info row instead of a hand-invented 4-column icon grid (Step 6a fidelity pass).
- `PageHeader` composes oks-ui's `<PageTitle>` instead of a raw `<h1>` (Rule 1).

## [1.0.0] — 2026-09-02

Every `NAV_ROUTES` entry resolves to a real page — `ComingSoon` survives only as the
`path="*"` catch-all. Lint + build green; zero JS errors and zero horizontal overflow
(375px) across all routes. Published to `OKS-PROJECTS` with a GitHub Pages demo.

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
