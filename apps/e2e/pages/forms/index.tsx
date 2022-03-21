import { Section } from 'maker-ui'
import { Form, type FieldProps, Yup } from '@maker-ui/forms'

const testFields: FieldProps[] = [
  {
    name: 'username',
    label: 'Your Username',
    type: 'text',
    initialValue: '',
    validation: Yup.string().required('Required'),
  },
  {
    name: 'myrange',
    label: 'My Range',
    type: 'range',
    initialValue: 0,
  },
  {
    name: 'profileImage',
    label: 'Profile Image',
    type: 'image-picker',
    initialValue: '',
    // validation: Yup.object().shape({
    //   file: Yup.mixed().required('File is required'),
    // }),
  },
]

export default function FormsPage() {
  function onSubmitForm(values: any) {
    console.log(values)
  }
  return (
    <Section>
      <Form.Provider
        fields={testFields}
        onSubmit={(vals) => onSubmitForm(vals)}>
        <Form>
          <Form.Submit>Submit</Form.Submit>
        </Form>
      </Form.Provider>
    </Section>
  )
}
