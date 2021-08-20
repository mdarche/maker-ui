import { Form, Yup, FieldProps } from '@maker-ui/forms'
import { FormProviderProps } from '@maker-ui/forms/dist/Provider'
import { FormProps } from '@maker-ui/forms/dist/Form'
import { SubmitButtonProps } from '@maker-ui/forms/dist/SubmitButton'

export interface FormValues {
  username: string
  password: string
}

export const formFields: FieldProps[] = [
  {
    name: 'username',
    label: 'Your Username',
    placeholder: 'Enter your username',
    type: 'text',
    errorStyle: 'bottom-right',
    validation: Yup.string().required('Required'),
    required: true,
    initialValue: '',
  },
  {
    name: 'telephone',
    label: 'Your Telephone',
    placeholder: 'Add a telephone',
    type: 'tel',
    errorStyle: 'bottom-right',
    validation: Yup.string().required('Required'),
    initialValue: '',
  },
]

export interface TestFormProps {
  providerProps?: FormProviderProps
  formProps?: FormProps
  submitProps?: SubmitButtonProps
  fields?: FieldProps[]
}

export const BasicForm = ({
  providerProps,
  formProps,
  submitProps,
  fields = formFields,
}: TestFormProps) => (
  <Form.Provider
    data-cy="wrapper"
    fields={fields}
    onSubmit={(values: FormValues) => {
      console.log('Submitted', values)
    }}
    {...providerProps}>
    <Form id="form-1" data-cy="form" {...formProps}>
      <Form.Submit data-cy="submit" {...submitProps}>
        Submit
      </Form.Submit>
    </Form>
  </Form.Provider>
)
