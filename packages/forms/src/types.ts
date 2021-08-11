import { FormikHelpers, FormikValues } from 'formik'

export interface FormValues extends FormikValues {}
export interface FormHelpers extends FormikHelpers<any> {}

export interface FieldProps {
  name: string
  id: string
  initialValue: any
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
  mask?: 'phone' | 'zipcode' | 'credit-card'
  required?: boolean
  errorPosition?: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
  labelPosition?: 'top' | 'left' | 'right' | 'bottom' | 'center'
  colSpan?: number | 'full'
  validateIcon?: boolean
  passwordToggle?: boolean
  selectOptions?:
    | string[]
    | { label: string; initial?: boolean; className?: string; id?: string }[]
  initialOption?: string
  datePickerProps?: object
  validation?: object
}
