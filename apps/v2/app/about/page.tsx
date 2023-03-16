import { Section } from 'maker-ui'
import { Form } from './form'
import './datepicker.css'

export default function AboutPage() {
  return (
    <Section
      css={{
        padding: 50,
        '.mkui-calendar': {
          width: 500,
        },
      }}>
      <h1>About Page</h1>
      <p>Lorem ipsum</p>
      <Form />
    </Section>
  )
}
