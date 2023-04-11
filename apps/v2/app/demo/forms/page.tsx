'use client'
import { Section } from 'maker-ui'
import { FormDemo } from './forms'
import { SimpleForm } from './simple'
import { DynamicForm } from './dynamic'
import 'maker-ui/forms.css'
import { Tabs } from 'maker-ui/tabs'
import { AllFieldsForm } from './allFields'

export default function FormPage() {
  return (
    <Section style={{ padding: '0 10%' }}>
      <Tabs>
        <Tabs.Panel title="Simple Form">
          <SimpleForm />
        </Tabs.Panel>
        <Tabs.Panel title="Dynamic Form">
          <DynamicForm />
        </Tabs.Panel>
        <Tabs.Panel title="All Fields">
          <AllFieldsForm />
        </Tabs.Panel>
      </Tabs>
      {/* <SimpleForm /> */}
      {/* <FormDemo /> */}
    </Section>
  )
}
