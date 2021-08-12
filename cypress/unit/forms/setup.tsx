import { Form, Yup, FieldProps, FormHelpers } from '@maker-ui/forms'
import { FormProviderProps } from '@maker-ui/forms/dist/Provider'
import { FormProps } from '@maker-ui/forms/dist/Form'
import { SubmitButtonProps } from '@maker-ui/forms/dist/SubmitButton'

export interface FormValues {
  username: string
  password: string
}

export const FormSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

// Cover all field types
export const formFields: FieldProps[] = [
  {
    name: 'username',
    id: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    errorPosition: 'bottom-right',
    validation: Yup.string().required('Required'),
    required: true,
    initialValue: '',
  },
  {
    name: 'telephone',
    id: 'telephone',
    label: 'telephone',
    placeholder: 'Add a telephone',
    type: 'tel',
    errorPosition: 'bottom-right',
    validation: Yup.string().required('Required'),
    initialValue: '',
  },
  {
    name: 'email',
    id: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'tel',
    errorPosition: 'bottom-right',
    validation: Yup.string().required('Required'),
    initialValue: '',
  },
  {
    name: 'password',
    id: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    errorPosition: 'bottom-right',
    validation: Yup.string().required('Required'),
    required: true,
    initialValue: '',
  },
]

export interface TestFormProps {
  providerProps?: FormProviderProps
  formProps?: FormProps
  submitProps?: SubmitButtonProps
}

export const BasicForm = ({
  providerProps,
  formProps,
  submitProps,
}: TestFormProps) => (
  <Form.Provider
    data-cy="wrapper"
    fields={formFields}
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
