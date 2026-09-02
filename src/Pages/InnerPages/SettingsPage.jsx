import { useState } from 'react'
import { Tabs, Tab, Form, FormFieldSet, Button, toast } from 'oks-ui'
import { PageHeader, Surface } from '../../Components/ui'
import { useIsDesktop } from '../../lib/useMediaQuery'

/**
 * Config-driven settings panel.
 * config: { title, subtitle, sections: [{ key, title, fields: [FormFieldSet props] }] }
 */
export default function SettingsPage({ config }) {
  const isDesktop = useIsDesktop()
  const [tab, setTab] = useState(config.sections[0].key)

  return (
    <>
      <PageHeader title={config.title} subtitle={config.subtitle} />
      <Surface bodyClassName="p-0">
        <Tabs
          isVertical={isDesktop}
          variant={isDesktop ? 'light' : 'underlined'}
          selectedKey={tab}
          onSelectionChange={setTab}
          classNames={{ base: 'md:flex-row', panel: 'flex-1 p-5' }}
        >
          {config.sections.map((s) => (
            <Tab key={s.key} title={s.title}>
              <Form
                onSubmit={() => toast.success('Settings saved')}
                initialValues={s.initialValues}
                className="max-w-2xl"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {s.fields.map((f) => (
                    <FormFieldSet key={f.name} {...f} colSpan={f.full ? 2 : 1} />
                  ))}
                </div>
                <div className="mt-6 flex gap-2">
                  <Button type="submit" color="primary" size="sm">
                    Save changes
                  </Button>
                  <Button type="reset" variant="bordered" color="default" size="sm">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Tab>
          ))}
        </Tabs>
      </Surface>
    </>
  )
}
