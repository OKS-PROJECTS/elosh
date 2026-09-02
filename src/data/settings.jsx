/* Settings archetype configs, keyed by path. Fields are FormFieldSet props. */

const profileFields = [
  { type: 'text', name: 'firstName', label: 'First name', validation: { rules: { required: true } } },
  { type: 'text', name: 'lastName', label: 'Last name' },
  { type: 'email', name: 'email', label: 'Work email', full: true },
  { type: 'phone', name: 'phone', label: 'Phone' },
  {
    type: 'select',
    name: 'timezone',
    label: 'Timezone',
    options: [
      { label: '(GMT-06:00) Central Time', value: 'ct' },
      { label: '(GMT+00:00) London', value: 'lon' },
      { label: '(GMT+05:30) India', value: 'ist' },
    ],
  },
  { type: 'textarea', name: 'bio', label: 'Bio', full: true },
]

export const SETTINGS_CONFIGS = {
  '/settings/profile': {
    title: 'Profile Settings',
    subtitle: 'Your personal details and preferences.',
    sections: [
      {
        key: 'personal',
        title: 'Personal',
        initialValues: { firstName: 'Adrian', lastName: 'Park', email: 'adrian@elosh.app', phone: '+1 512 555 0142' },
        fields: profileFields,
      },
      {
        key: 'employment',
        title: 'Employment',
        fields: [
          { type: 'text', name: 'title', label: 'Job title' },
          { type: 'text', name: 'department', label: 'Department' },
          { type: 'text', name: 'manager', label: 'Reporting to' },
          { type: 'datepicker', name: 'joined', label: 'Joined on' },
        ],
      },
    ],
  },
  '/settings/security': {
    title: 'Security Settings',
    subtitle: 'Password, sessions and two-factor authentication.',
    sections: [
      {
        key: 'password',
        title: 'Password',
        fields: [
          { type: 'password', name: 'current', label: 'Current password', full: true },
          { type: 'password', name: 'next', label: 'New password' },
          { type: 'password', name: 'confirm', label: 'Confirm password' },
        ],
      },
      {
        key: '2fa',
        title: 'Two-factor',
        fields: [
          { type: 'switch', name: 'totp', label: 'Authenticator app', checkedText: 'On', uncheckedText: 'Off' },
          { type: 'switch', name: 'sms', label: 'SMS backup codes' },
        ],
      },
    ],
  },
  '/settings/notifications': {
    title: 'Notification Settings',
    subtitle: 'Choose what Elosh emails and pushes you about.',
    sections: [
      {
        key: 'email',
        title: 'Email',
        fields: [
          { type: 'switch', name: 'leaveEmail', label: 'Leave request updates' },
          { type: 'switch', name: 'payrollEmail', label: 'Payroll runs' },
          { type: 'switch', name: 'mentionsEmail', label: 'Mentions & comments' },
          { type: 'switch', name: 'digestEmail', label: 'Weekly digest' },
        ],
      },
      {
        key: 'push',
        title: 'Push',
        fields: [
          { type: 'switch', name: 'leavePush', label: 'Leave approvals' },
          { type: 'switch', name: 'ticketPush', label: 'Assigned tickets' },
        ],
      },
    ],
  },
  '/settings/business': {
    title: 'Business Settings',
    subtitle: 'Company profile used across the app.',
    sections: [
      {
        key: 'company',
        title: 'Company',
        initialValues: { legalName: 'Elosh Inc.', website: 'https://elosh.app' },
        fields: [
          { type: 'text', name: 'legalName', label: 'Legal name' },
          { type: 'text', name: 'website', label: 'Website' },
          { type: 'text', name: 'ein', label: 'Tax ID' },
          { type: 'text', name: 'hq', label: 'Headquarters', full: true },
        ],
      },
    ],
  },
  '/settings/localization': {
    title: 'Localization',
    subtitle: 'Language, currency and formats.',
    sections: [
      {
        key: 'formats',
        title: 'Formats',
        fields: [
          {
            type: 'select',
            name: 'language',
            label: 'Language',
            options: [
              { label: 'English (US)', value: 'en-US' },
              { label: 'English (UK)', value: 'en-GB' },
              { label: 'Português', value: 'pt' },
            ],
          },
          {
            type: 'select',
            name: 'currency',
            label: 'Default currency',
            options: [
              { label: 'USD — US Dollar', value: 'USD' },
              { label: 'EUR — Euro', value: 'EUR' },
              { label: 'GBP — Pound', value: 'GBP' },
            ],
          },
          {
            type: 'select',
            name: 'dateFormat',
            label: 'Date format',
            options: [
              { label: 'DD MMM YYYY', value: 'dmy' },
              { label: 'MM/DD/YYYY', value: 'mdy' },
              { label: 'YYYY-MM-DD', value: 'iso' },
            ],
          },
          {
            type: 'select',
            name: 'weekStart',
            label: 'Week starts on',
            options: [
              { label: 'Sunday', value: 'sun' },
              { label: 'Monday', value: 'mon' },
            ],
          },
        ],
      },
    ],
  },
  '/settings/preferences': {
    title: 'Preferences',
    subtitle: 'App behaviour and defaults.',
    sections: [
      {
        key: 'general',
        title: 'General',
        fields: [
          { type: 'switch', name: 'compact', label: 'Compact tables' },
          { type: 'switch', name: 'sidebarCollapsed', label: 'Collapse sidebar by default' },
          { type: 'switch', name: 'confirmDelete', label: 'Confirm before deleting' },
        ],
      },
    ],
  },
  '/settings/appearance': {
    title: 'Appearance',
    subtitle: 'Theme and density.',
    sections: [
      {
        key: 'theme',
        title: 'Theme',
        fields: [
          {
            type: 'radio',
            name: 'theme',
            label: 'Colour mode',
            options: [
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
              { label: 'System', value: 'system' },
            ],
          },
        ],
      },
    ],
  },
  '/settings/connected-apps': {
    title: 'Connected Apps',
    subtitle: 'Third-party integrations.',
    sections: [
      {
        key: 'integrations',
        title: 'Integrations',
        fields: [
          { type: 'switch', name: 'slack', label: 'Slack' },
          { type: 'switch', name: 'gcal', label: 'Google Calendar' },
          { type: 'switch', name: 'github', label: 'GitHub' },
          { type: 'switch', name: 'quickbooks', label: 'QuickBooks' },
        ],
      },
    ],
  },
  '/settings/billing': {
    title: 'Billing',
    subtitle: 'Plan, payment method and invoices.',
    sections: [
      {
        key: 'plan',
        title: 'Plan',
        fields: [
          {
            type: 'select',
            name: 'plan',
            label: 'Current plan',
            options: [
              { label: 'Growth — $49/user/mo', value: 'growth' },
              { label: 'Enterprise — contact sales', value: 'ent' },
            ],
          },
          { type: 'text', name: 'seats', label: 'Seats' },
        ],
      },
    ],
  },
  '/settings/api-keys': {
    title: 'API Keys',
    subtitle: 'Programmatic access to Elosh.',
    sections: [
      {
        key: 'keys',
        title: 'Keys',
        fields: [
          { type: 'text', name: 'name', label: 'Key name' },
          {
            type: 'select',
            name: 'scope',
            label: 'Scope',
            options: [
              { label: 'Read only', value: 'read' },
              { label: 'Read & write', value: 'rw' },
            ],
          },
        ],
      },
    ],
  },
  '/ai/settings': {
    title: 'AI Settings',
    subtitle: 'Configure Elosh AI features.',
    sections: [
      {
        key: 'features',
        title: 'Features',
        fields: [
          { type: 'switch', name: 'insights', label: 'Attendance insights' },
          { type: 'switch', name: 'forecast', label: 'Payroll forecasting' },
          { type: 'switch', name: 'hiring', label: 'Hiring recommendations' },
          {
            type: 'select',
            name: 'model',
            label: 'Model',
            options: [
              { label: 'Balanced', value: 'balanced' },
              { label: 'Precise', value: 'precise' },
            ],
          },
        ],
      },
    ],
  },
}
