import * as React from 'react'
import { mount } from '@cypress/react'
import { FieldProps, Form } from '@maker-ui/forms'

const TestForm = ({ fields }: { fields: FieldProps[] }) => {
  const [submitted, setSubmitted] = React.useState(false)
  return (
    <>
      {submitted ? <div data-cy="success">Success</div> : null}
      <Form.Provider fields={fields} onSubmit={values => setSubmitted(true)}>
        <Form>
          <Form.Submit data-cy="submit">Submit</Form.Submit>
        </Form>
      </Form.Provider>
    </>
  )
}

describe('Field components', () => {
  // Check form state assertion
  beforeEach(() => {
    cy.get('[data-cy=success]').should('not.exist')
  })
  // Submit form assertion
  afterEach(() => {
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').should('exist')
  })

  // Text Field
  it('renders a text field', () => {
    mount(
      <TestForm
        fields={[{ name: 'text', id: 'text', initialValue: '', type: 'text' }]}
      />
    )
    cy.get('input[type=text]').type('mike')
  })

  // Textarea
  it('renders a textarea field', () => {
    mount(
      <TestForm
        fields={[
          {
            name: 'textarea',
            id: 'textarea',
            initialValue: '',
            type: 'textarea',
          },
        ]}
      />
    )
    cy.get('textarea').type('mike')
  })

  // Tel Field
  it('renders a tel field', () => {
    mount(
      <TestForm
        fields={[{ name: 'tel', id: 'tel', initialValue: '', type: 'tel' }]}
      />
    )
    cy.get('input[type=tel]').type('8675309')
  })

  // Email Field
  it('renders an email field', () => {
    mount(
      <TestForm
        fields={[
          { name: 'email', id: 'email', initialValue: '', type: 'email' },
        ]}
      />
    )
    cy.get('input[type=email]').type('mike@test.com')
  })

  // Password Field
  it('renders a password field', () => {
    mount(
      <TestForm
        fields={[
          { name: 'pass', id: 'pass', initialValue: '', type: 'password' },
        ]}
      />
    )
    cy.get('input[type=password]').type('12345')
  })

  // URL Field
  it('renders a url field', () => {
    mount(
      <TestForm
        fields={[{ name: 'url', id: 'url', initialValue: '', type: 'url' }]}
      />
    )
    cy.get('input[type=url]').type('https://gmail.com')
  })

  // Select Field
  it('renders a select field', () => {
    mount(
      <TestForm
        fields={[
          {
            name: 'select',
            id: 'select',
            initialValue: '',
            type: 'select',
            selectOptions: ['option-1', 'option-2', 'option-3'],
          },
        ]}
      />
    )
    cy.get('select').select('option-1')
  })

  // Select Datalist Field
  it.only('renders a select-datalist field', () => {
    mount(
      <TestForm
        fields={[
          {
            name: 'select',
            id: 'select',
            initialValue: '',
            type: 'select-datalist',
            selectOptions: ['option-1', 'option-2', 'option-3'],
          },
        ]}
      />
    )
    cy.get('input[list=list-select]').type('option-1')
  })

  // Date Field
  it('renders a date field', () => {
    mount(
      <TestForm
        fields={[{ name: 'date', id: 'date', initialValue: '', type: 'date' }]}
      />
    )
    cy.get('input[type=date]').type('1991-08-08')
  })

  it('renders a datepicker field', () => {})

  it('renders a toggle field', () => {})

  it('renders a radio field', () => {
    mount(
      <TestForm
        fields={[
          { name: 'radio', id: 'radio', initialValue: '', type: 'radio' },
        ]}
      />
    )
    cy.get('input[type=radio]')
  })

  it('renders a checkbox field', () => {})

  // Color Field
  it('renders a color field', () => {
    mount(
      <TestForm
        fields={[
          { name: 'color', id: 'color', initialValue: '', type: 'color' },
        ]}
      />
    )
    cy.get('input[type=color]')
      .click()
      .invoke('val', '#ff0000')
      .trigger('change')
  })

  // File Field
  it.only('renders a file upload field', () => {
    mount(
      <TestForm
        fields={[{ name: 'file', id: 'file', initialValue: '', type: 'file' }]}
      />
    )
    cy.get('input[type=file]')
  })

  it('renders a repeater field', () => {})

  it('renders a range field', () => {
    mount(
      <TestForm
        fields={[{ name: 'file', id: 'file', initialValue: '', type: 'file' }]}
      />
    )
    cy.get('input[type=file]')
  })
})

describe('Field settings', () => {
  it('renders placeholder on text fields', () => {})
  it('sets an initial option for select fields', () => {})
  it('renders an array of strings for select options', () => {})
  it('renders a array of objects with custom selectors for select options', () => {})
  it('renders a custom field container class', () => {})
  it('renders a label string', () => {})
  it('renders a label component', () => {})
  it('renders a description', () => {})
  it('hides the validate icon', () => {})
  it('shows the validate icon', () => {})
  it('renders the field width according to its colSpan')
  it('accepts custom datepicker props')
})

describe('Field label position', () => {
  it('renders a "top" label', () => {})
  it('renders a "bottom" label', () => {})
  it('renders a "left" label', () => {})
  it('renders a "right" label', () => {})
  it('renders a "center" label', () => {})
  it('renders a "floating" label', () => {})
})

describe('Field error position', () => {
  it('renders a "top-right" error', () => {})
  it('renders a "top-left" error', () => {})
  it('renders a "bottom-left" error', () => {})
  it('renders a "bottom-right" error', () => {})
  it('renders a "bottom-center" error', () => {})
})
