import { Content, Grid, Main, Section } from 'maker-ui'
import { Form, type FieldProps, Yup } from '@maker-ui/forms'
import { useState } from 'react'

const fields1: FieldProps[] = [
  {
    name: 'username',
    label: 'Your Username',
    type: 'text',
    placeholder: 'Placeholder text',
    validation: Yup.string().required('Required'),
    colSpan: 1,
  },
  {
    name: 'pass',
    label: 'Your Password',
    type: 'password',
    placeholder: 'Password',
    // validation: Yup.string().required('Required'),
    settings: {
      toggleCharacters: true,
    },
    colSpan: 1,
    conditions: [[{ field: 'username', compare: 'eq', target: 'John' }]],
  },
  {
    name: 'myrange',
    label: 'My Range',
    type: 'range',
    colSpan: 1,
    // autoSave: true,
  },
  {
    name: 'myCheck',
    label: 'My Checkbox',
    type: 'checkbox',
    settings: {
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ],
    },
  },
  {
    name: 'mySwitch',
    label: 'My Switch',
    type: 'switch',
    initialValue: true,
    settings: {
      style: 'circle',
    },
  },
  {
    name: 'myRadio',
    label: 'My Radio',
    type: 'radio',
    settings: {
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ],
    },
  },
  {
    name: 'singleSelect',
    id: 'Single Select',
    label: 'Pick one option',
    type: 'select',
    initialValue: [],
    // autoSave: true,
    settings: {
      // isCreatableInput: true,
      placeholder: 'Select',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
        { label: 'Maybe So', value: 'maybe-so' },
      ],
    },
  },
  {
    name: 'multiSelect',
    id: 'Multi Select',
    label: 'Pick many options',
    type: 'select',
    initialValue: [{ label: 'Yes', value: 'yes' }],
    settings: {
      isMulti: true,
      placeholder: 'Select',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
        { label: 'Maybe So', value: 'maybe-so' },
      ],
    },
    // validation: Yup.array().min(3, 'Pick at least 3 tags'),
  },
  {
    name: 'profileImage',
    label: 'Profile Image',
    type: 'image-picker',
    settings: { inputId: 'testId' },
    conditions: [
      [
        {
          field: 'singleSelect',
          compare: 'contains',
          target: 'no',
        },
      ],
      [
        {
          field: 'myCheck',
          compare: 'contains',
          target: '1',
        },
      ],
    ],
    // validation: Yup.mixed().required('Required'),
  },
]

const fields2: FieldProps[] = [
  {
    name: 'first',
    label: 'First Name',
    type: 'text',
  },
]

export default function FormsPage() {
  const [success, setSuccess] = useState(false)
  const [error] = useState(false)

  // eslint-disable-next-line no-unused-vars
  function onSubmitForm(values: object, setSubmitting: (b: boolean) => void) {
    console.log(values)
    setTimeout(() => {
      setSuccess(true)
      setSubmitting(false)
    }, 1000)
  }

  return (
    <>
      <Content>
        <Main>
          <Section css={{ padding: '50px 0' }}>
            <Grid columns={2}>
              <Form.Provider
                success={success}
                error={error}
                fields={fields1}
                settings={{}}
                onSubmit={(vals, { setSubmitting }) => {
                  onSubmitForm(vals, setSubmitting)
                }}>
                <Form columns={2}>
                  <Form.Header>Form Header</Form.Header>
                  <div>Custom content inside the form</div>
                  <Form.Submit>Submit</Form.Submit>
                  <Form.Error>There was an error</Form.Error>
                  <Form.Footer>Form Footer</Form.Footer>
                  <Form.Success>Successful Form</Form.Success>
                </Form>
              </Form.Provider>
              <Form.Provider
                success={success}
                error={error}
                fields={fields2}
                settings={{}}
                onSubmit={(vals, { setSubmitting }) => {
                  onSubmitForm(vals, setSubmitting)
                }}>
                <Form columns={2}>
                  <Form.Header>Form 2 Header</Form.Header>
                  <Form.Submit>Submit</Form.Submit>
                  <Form.Error>There was an error</Form.Error>
                  <Form.Footer>Form 2 Footer</Form.Footer>
                  <Form.Success>Successful Form</Form.Success>
                </Form>
              </Form.Provider>
            </Grid>
          </Section>
        </Main>
      </Content>
    </>
  )
}
