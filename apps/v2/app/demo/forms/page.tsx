import { Section } from 'maker-ui'
import { FormDemo } from './forms'
import { SimpleForm } from './simple'
import 'maker-ui/forms.css'

export default function FormPage() {
  return (
    <Section style={{ padding: '0 10%' }}>
      <SimpleForm />
      {/* <FormDemo /> */}
    </Section>
  )
}
