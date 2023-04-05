import * as React from 'react'
import { Form } from '../src'
import type { FieldProps, FormSettings } from '../src/types'

interface TestFormProps {
  settings?: FormSettings
  validationSchema?: FormProviderProps['validationSchema']
  fields?: FieldProps[]
}

const ValidateIcon = () => <div data-cy="validate">OK</div>

const TestForm = ({
  settings,
  validationSchema,
  fields = formFields,
}: TestFormProps) => (
  <Form.Provider
    data-cy="wrapper"
    fields={fields}
    validationSchema={validationSchema}
    settings={settings}
    onSubmit={(values) => {
      console.log('Submitted', values)
    }}>
    <Form id="form-1" data-cy="form">
      <Form.Submit data-cy="submit">Submit</Form.Submit>
    </Form>
  </Form.Provider>
)

const formFields: FieldProps[] = [
  {
    name: 'username',
    label: 'Your Username',
    type: 'text',
    validation: Yup.string().min(5).required('Required'),
    initialValue: '',
  },
  {
    name: 'telephone',
    label: 'Your Telephone',
    type: 'tel',
    validation: Yup.string().required('Required'),
    placeholder: 'phone number',
    initialValue: '',
    showValidation: true,
  },
]

const sansValidationFields: FieldProps[] = [
  {
    name: 'username',
    label: 'Your Username',
    type: 'text',
    initialValue: '',
  },
  {
    name: 'telephone',
    label: 'Your Telephone',
    type: 'tel',
    initialValue: '',
  },
]

describe('FormProvider', () => {
  it('validates fields on blur by default with validateOnBlur setting for Formik provider', () => {
    cy.mount(<TestForm />)
    cy.get('[type=text]').click().blur().wait(100)
    cy.get('.field-error').should('exist')
  })

  it('overrides the validateOnBlur setting for Formik provider', () => {
    cy.mount(<TestForm settings={{ validateOnBlur: false }} />)
    cy.get('[type=text]').click().blur().wait(100)
    cy.get('.field-error').should('not.exist')
  })

  it('does not validate field onChange by default', () => {
    cy.mount(<TestForm />)
    cy.get('[type=text]').type('m')
    cy.get('.field-error').should('not.exist')
  })

  it('validates field onChange via validateOnChange setting for Formik provider', () => {
    cy.mount(<TestForm settings={{ validateOnChange: true }} />)
    cy.get('.field-error').should('not.exist')
    cy.get('[type=text]').type('m')
    cy.get('.field-error').should('exist')
  })

  it('renders a custom field validate icon', () => {
    cy.mount(<TestForm settings={{ validateIcon: <ValidateIcon /> }} />)
    cy.get('[type=tel]').type('90830435567').blur()
    cy.get('[data-cy=validate').should('exist')
  })

  // TODO visual test
  it('renders a custom placeholder input text color', () => {
    cy.mount(<TestForm settings={{ placeholderColor: '#ff0000' }} />)
    cy.get('[type=tel]')
  })

  it('formats the default grid columns', () => {
    cy.viewport(1200, 800)
    cy.mount(<TestForm settings={{ columns: 2 }} />)
    cy.get('.form-grid')
      .should('have.css', 'grid-template-columns')
      .should((val) => {
        expect(val).to.eq('577px 577px')
      })
    cy.viewport(600, 800)
    cy.get('.form-grid')
      .should('have.css', 'grid-template-columns')
      .should((val) => {
        expect(val).to.eq('584px')
      })
  })

  it('formats the default grid gap', () => {
    cy.mount(<TestForm settings={{ gap: 30 }} />)
    cy.get('.form-grid').should('have.css', 'grid-gap', '30px 30px')
  })

  // TODO visual regression test
  it('renders the default labelStyle', () => {
    cy.mount(<TestForm settings={{ labelStyle: 'bottom-right' }} />)
  })

  // TODO visual regression test
  it('renders the default errorStyle', () => {
    cy.mount(<TestForm settings={{ errorStyle: 'top-center' }} />)
    cy.get('[data-cy=submit]').click()
  })

  it('configures field schema validation via validationSchema prop', () => {
    cy.mount(
      <TestForm
        fields={sansValidationFields}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Required'),
        })}
      />
    )
    cy.get('[data-cy=submit]').click()
    cy.get('.field-error').should('have.length', 1)
  })
})
