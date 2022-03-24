import { Section } from 'maker-ui'
import { Form, type FieldProps, Yup } from '@maker-ui/forms'
import { useState } from 'react'

const testFields: FieldProps[] = [
  {
    name: 'username',
    label: 'Your Username',
    type: 'text',
    initialValue: '',
    // validation: Yup.string().required('Required'),
    // autoSave: true,
  },
  {
    name: 'myrange',
    label: 'My Range',
    type: 'range',
    initialValue: 0,
    autoSave: true,
  },
  {
    name: 'myCheck',
    label: 'My Checkbox',
    type: 'checkbox',
    initialValue: '',
    settings: {
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ],
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
  },
  {
    name: 'select',
    id: 'mySelect',
    label: 'Pick an option',
    type: 'select',
    initialValue: [],
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
]

export default function FormsPage() {
  const [formSubmission, setFormSubmission] = useState<object>({})
  function onSubmitForm(values: object) {
    setFormSubmission(values)
  }
  return (
    <>
      <Section css={{ padding: '50px 0' }}>
        <Form.Provider
          fields={testFields}
          onSubmit={(vals) => onSubmitForm(vals)}>
          <Form>
            <Form.Submit>Submit</Form.Submit>
          </Form>
        </Form.Provider>
      </Section>
      <Section css={{ padding: '50px 0' }}>
        {JSON.stringify(formSubmission, null, ' ')}
      </Section>
    </>
  )
}
