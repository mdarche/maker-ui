import { Section } from 'maker-ui/layout'
import { SimpleForm } from './simple'
import { PasswordForm } from './password'
import { DynamicForm } from './dynamic'
import 'maker-ui/forms.css'
import { Tabs, TabPanel } from 'maker-ui/tabs'
import { AllFieldsForm } from './allFields'
import { PaginatedForm } from './pagination'
import { CustomForm } from './custom'
import { RepeaterForm } from './repeater'
import { GroupedForm } from './groups'
import { CalendarForm } from './calendar'
import { TestForm } from './test'
import 'maker-ui/tabs.css'
import './page.scss'

export default function FormPage() {
  return (
    <Section style={{ padding: '0 10%' }}>
      <Tabs>
        {/* <TabPanel title="Simple Form">
          <SimpleForm />
        </TabPanel> */}
        <TabPanel title="Password Form">
          <PasswordForm />
        </TabPanel>
        {/* <TabPanel title="Dynamic Form">
          <DynamicForm />
        </TabPanel> */}
        {/* <TabPanel title="All Fields">
          <AllFieldsForm />
        </TabPanel> */}
        {/* <TabPanel title="Paginated">
          <PaginatedForm />
        </TabPanel>
        <TabPanel title="Custom Field">
          <CustomForm />
        </TabPanel>
        <TabPanel title="Grouped Form">
          <GroupedForm />
        </TabPanel>
        <TabPanel title="Calendar Form">
          <CalendarForm />
        </TabPanel>
        <TabPanel title="Test Form">
          <TestForm />
        </TabPanel>
        <TabPanel title="Repeater Form">
          <RepeaterForm />
        </TabPanel> */}
      </Tabs>
      {/* <SimpleForm /> */}
      {/* <FormDemo /> */}
    </Section>
  )
}
