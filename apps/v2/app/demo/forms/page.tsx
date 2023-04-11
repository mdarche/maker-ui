'use client'
import { Section } from 'maker-ui'
import { FormDemo } from './forms'
import { SimpleForm } from './simple'
import { DynamicForm } from './dynamic'
import 'maker-ui/forms.css'
import { Tabs } from 'maker-ui/tabs'
import { AllFieldsForm } from './allFields'
import { PaginatedForm } from './pagination'
import { CustomForm } from './custom'
import './forms.scss'
import { GroupedForm } from './groups'

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
        <Tabs.Panel title="Paginated">
          <PaginatedForm />
        </Tabs.Panel>
        <Tabs.Panel title="Custom Field">
          <CustomForm />
        </Tabs.Panel>
        <Tabs.Panel title="Grouped Form">
          <GroupedForm />
        </Tabs.Panel>
      </Tabs>
      {/* <SimpleForm /> */}
      {/* <FormDemo /> */}
    </Section>
  )
}
