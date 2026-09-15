/* FormPage archetype configs, keyed by path. Fields are FormFieldSet props. */

export const FORM_CONFIGS = {
  '/hrm/employees/new': {
    title: 'Add Employee',
    subtitle: 'Create a new employee record.',
    submitLabel: 'Add employee',
    backTo: '/hrm/employees',
    groups: [
      {
        title: 'Personal details',
        fields: [
          { type: 'text', name: 'firstName', label: 'First name', validation: { rules: { required: true } } },
          { type: 'text', name: 'lastName', label: 'Last name', validation: { rules: { required: true } } },
          { type: 'email', name: 'email', label: 'Work email', full: true, validation: { rules: { required: true, email: true } } },
          { type: 'phone', name: 'phone', label: 'Phone' },
          {
            type: 'datepicker',
            name: 'joined',
            label: 'Joining date',
          },
        ],
      },
      {
        title: 'Employment',
        fields: [
          {
            type: 'select',
            name: 'department',
            label: 'Department',
            validation: { rules: { required: true } },
            options: [
              { label: 'Engineering', value: 'engineering' },
              { label: 'Design', value: 'design' },
              { label: 'Product', value: 'product' },
              { label: 'Sales', value: 'sales' },
              { label: 'People Ops', value: 'people-ops' },
            ],
          },
          { type: 'text', name: 'designation', label: 'Designation', validation: { rules: { required: true } } },
          {
            type: 'select',
            name: 'location',
            label: 'Location',
            options: [
              { label: 'Austin', value: 'austin' },
              { label: 'Toronto', value: 'toronto' },
              { label: 'Remote', value: 'remote' },
            ],
          },
          {
            type: 'select',
            name: 'employmentType',
            label: 'Employment type',
            options: [
              { label: 'Full-time', value: 'full-time' },
              { label: 'Contract', value: 'contract' },
              { label: 'Part-time', value: 'part-time' },
            ],
          },
        ],
      },
    ],
  },
}
