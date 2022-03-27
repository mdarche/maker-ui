import { Section } from 'maker-ui'
import { Form, type FieldProps, Yup, useField } from '@maker-ui/forms'
import { useState } from 'react'

export const MyCustomComponent = () => {
  const [field, meta, { setValue }] = useField('customComponent')
  return (
    <>
      <button onClick={() => setValue('value 1')}>Value 1</button>
      <button onClick={() => setValue('value 2')}>Value 2</button>
      <button onClick={() => setValue('value 3')}>Value 3</button>
    </>
  )
}

const testFields: FieldProps[] = [
  {
    name: 'username',
    label: 'Your Username',
    type: 'text',
    initialValue: '',
    validation: Yup.string().required('Required'),
    colSpan: 1,
    // autoSave: true,
  },
  {
    name: 'pass',
    label: 'Your Password',
    type: 'password',
    initialValue: '',
    // validation: Yup.string().required('Required'),
    colSpan: 1,
    settings: {
      toggleCharacters: true,
    },
    // autoSave: true,
  },
  {
    name: 'myrange',
    label: 'My Range',
    type: 'range',
    autoSave: true,
    initialValue: 0,
    colSpan: 1,
    // autoSave: true,
  },
  {
    name: 'myCheck',
    label: 'My Checkbox',
    type: 'checkbox',
    initialValue: '',
    colSpan: 1,
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
    colSpan: 1,
    settings: {
      style: 'circle',
    },
  },
  {
    name: 'myRadio',
    label: 'My Radio',
    type: 'radio',
    initialValue: '',
    settings: {
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ],
    },
    colSpan: 1,
  },
  {
    name: 'select',
    id: 'mySelect',
    label: 'Pick an option',
    type: 'select',
    initialValue: [],
    // autoSave: true,
    settings: {
      // isCreatableInput: true,
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
    // validation: Yup.mixed().required('Required'),
  },
  {
    name: 'customComponent',
    label: 'A Custom component',
    type: 'custom',
    initialValue: '',
    component: <MyCustomComponent />,
  },
]

export default function FormsPage() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const [formSubmission, setFormSubmission] = useState<object>({})
  function onSubmitForm(values: object) {
    setFormSubmission(values)
    // setError(true)
    setSuccess(true)
  }
  return (
    <>
      <Section css={{ padding: '50px 0' }}>
        <Form.Provider
          success={success}
          error={error}
          fields={testFields}
          onSubmit={(vals) => {
            console.log(vals)
            onSubmitForm(vals)
          }}>
          <Form columns={['1fr 1fr']}>
            <Form.Header>Form Header</Form.Header>
            <Form.Submit>Submit</Form.Submit>
            <Form.Error>There was an error</Form.Error>
            <Form.Footer>Form Footer</Form.Footer>
            <Form.Success>Successful Form</Form.Success>
          </Form>
        </Form.Provider>
      </Section>
      <Section css={{ padding: '50px 0' }}>
        {JSON.stringify(formSubmission, null, ' ')}
      </Section>
    </>
  )
}
