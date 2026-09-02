import { Form, FormFieldSet, Button, toast } from 'oks-ui'
import { PageHeader, Surface } from '../../Components/ui'

/**
 * Config-driven create/edit form.
 * config: { title, subtitle, groups: [{ title, fields: [FormFieldSet props] }], submitLabel }
 */
export default function FormPage({ config }) {
  return (
    <>
      <PageHeader title={config.title} subtitle={config.subtitle} />
      <Form
        onSubmit={() => toast.success(`${config.submitLabel ?? 'Saved'}`)}
        initialValues={config.initialValues}
        className="max-w-3xl"
      >
        <div className="flex flex-col gap-5">
          {config.groups.map((g) => (
            <Surface key={g.title} title={g.title} headerDivider>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {g.fields.map((f) => (
                  <FormFieldSet key={f.name} {...f} colSpan={f.full ? 2 : 1} />
                ))}
              </div>
            </Surface>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Button type="submit" color="primary" size="sm">
            {config.submitLabel ?? 'Save'}
          </Button>
          <Button type="reset" variant="bordered" color="default" size="sm">
            Reset
          </Button>
        </div>
      </Form>
    </>
  )
}
