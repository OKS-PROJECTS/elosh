import { useState } from 'react'
import {
  Button,
  Modal,
  Drawer,
  Form,
  FormFieldSet,
  Checkbox,
  SwitchField,
  RangeField,
  SelectField,
  TextField,
  TextAreaField,
  Calendar,
  toast,
} from 'oks-ui'
import { PageHeader, Surface } from '../../Components/ui'

export default function KitchenSink() {
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [range, setRange] = useState(40)

  return (
    <>
      <PageHeader title="Kitchen Sink" subtitle="Interactive oks-ui primitives — overlays, forms, pickers." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Surface title="Overlays">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" color="primary" onPress={() => setModal(true)}>
              Open modal
            </Button>
            <Button size="sm" variant="bordered" color="default" onPress={() => setDrawer(true)}>
              Open drawer
            </Button>
            <Button size="sm" variant="soft" color="primary" onPress={() => toast.success('Toast fired')}>
              Fire toast
            </Button>
          </div>
        </Surface>

        <Surface title="Toggles & range">
          <div className="flex w-full flex-col gap-4">
            <SwitchField name="notify" label="Email notifications" showStateText checkedText="On" uncheckedText="Off" />
            <Checkbox label="Subscribe to the weekly digest" />
            <RangeField
              name="capacity"
              label={`Capacity — ${range}%`}
              min={0}
              max={100}
              value={range}
              onChange={setRange}
            />
          </div>
        </Surface>

        <Surface title="Form fields">
          <Form onSubmit={() => toast.success('Submitted')} className="flex w-full flex-col gap-4">
            <TextField label="Full name" placeholder="Aria Bennett" />
            <SelectField
              label="Department"
              placeholderOption="Select a department"
              options={[
                { label: 'Engineering', value: 'eng' },
                { label: 'Design', value: 'design' },
                { label: 'Product', value: 'product' },
              ]}
            />
            <TextAreaField label="Notes" showLengthCounter maxLength={200} />
            <FormFieldSet type="otp" name="code" label="Verification code" length={4} />
            <Button type="submit" size="sm" color="primary">
              Submit
            </Button>
          </Form>
        </Surface>

        <Surface title="Calendar">
          <Calendar />
        </Surface>
      </div>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title="Invite a teammate"
        actions={
          <>
            <Button size="sm" variant="bordered" color="default" onPress={() => setModal(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              color="primary"
              onPress={() => {
                setModal(false)
                toast.success('Invitation sent')
              }}
            >
              Send invite
            </Button>
          </>
        }
      >
        <Form className="flex flex-col gap-4">
          <TextField label="Email" type="email" placeholder="name@company.com" />
          <SelectField
            label="Role"
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'Manager', value: 'manager' },
              { label: 'Employee', value: 'employee' },
            ]}
          />
        </Form>
      </Modal>

      <Drawer isOpen={drawer} onClose={() => setDrawer(false)} position="right" title="Filters">
        <div className="flex flex-col gap-4">
          <SelectField
            label="Status"
            options={[
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ]}
          />
          <RangeField name="score" label="Min score" min={0} max={100} />
          <Button size="sm" color="primary" onPress={() => setDrawer(false)}>
            Apply
          </Button>
        </div>
      </Drawer>
    </>
  )
}
