import { FormikHelpers, FormikValues } from 'formik'

export interface FormValues extends FormikValues {}
export interface FormHelpers extends FormikHelpers<FormikValues> {}

export interface FieldProps {
  name: string
  id: string
  containerClass?: string
  label?: string
  description?: string
  placeholder?: string
  type:
    | 'text'
    | 'tel'
    | 'email'
    | 'password'
    | 'url'
    | 'select'
    | 'select-datalist'
    | 'date'
    | 'datepicker'
    | 'toggle'
    | 'textarea'
    | 'radio'
    | 'checkbox'
    | 'slider'
    | 'repeater'
    | 'color'
    | 'file'
    | 'custom'
  mask?: boolean
  required?: boolean
  errorPosition?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
  colSpan?: number | 'full'
  validationIcon?: boolean
  togglePassword?: boolean
  selectOptions?: string[]
  initialOption?: string
  datePickerProps?: object
  validation?: object
}
