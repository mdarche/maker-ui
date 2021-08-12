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
    | 'textarea'
    | 'tel'
    | 'email'
    | 'password'
    | 'url'
    | 'select'
    | 'select-datalist'
    | 'date'
    | 'datepicker'
    | 'toggle'
    | 'radio'
    | 'checkbox'
    | 'slider'
    | 'repeater'
    | 'color'
    | 'range' // TODO
    | 'file'
    | 'custom' // TODO
  mask?: 'phone' | 'zipcode' | 'credit-card' // TODO
  required?: boolean
  errorStyle?:
    | 'top-right'
    | 'top-left'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
  labelStyle?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'floating'
  colSpan?: number | 'full'
  validateIcon?: boolean
  passwordToggle?: boolean
  selectOptions?:
    | string[]
    | { label: string; initial?: boolean; className?: string; id?: string }[]
  initialOption?: string
  datePickerProps?: object
  /* Yup Validation rule */
  validation?: any
}
