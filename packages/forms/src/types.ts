import * as React from 'react'
import { FormikHelpers, FormikValues } from 'formik'

export interface FormValues extends FormikValues {}
export interface FormHelpers extends FormikHelpers<any> {}

export type PaginationElement =
  | string
  | React.ReactNode
  | ((currentPage: number) => React.ReactNode)

type InputOption = {
  label: string | React.ReactNode
  value?: string
  className?: string
  id?: string
}

export interface SwitchSettings {
  innerLabel?: boolean
  labelOn?: string | React.ReactNode
  labelOff?: string | React.ReactNode
  activeColor?: string
  inactiveColor?: string
  disabled?: boolean
  height?: number
  padding?: number
  borderRadius?: number
  style?: 'circle' | 'box'
}

export interface SelectSettings {
  options?: InputOption
  initialOption?: string
}

export interface FieldProps {
  /** Unique identifier for the field */
  name: string
  /** The inputs initial value */
  initialValue: any
  /** The field type */
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
    | 'switch'
    | 'radio'
    | 'checkbox'
    | 'slider'
    | 'repeater' // TODO
    | 'color'
    | 'range' // TODO
    | 'file'
    | 'custom' // TODO
  /* Yup Validation rule */
  validation?: any
  /** A custom id selector for the input field */
  id?: string
  /** A custom class selector for the field container*/
  containerClass?: string
  /** The field's label string or React component */
  label?: string | React.ReactNode
  /** Additional helper text that will be rendered alongside the field */
  description?: string
  /** Placeholder text for all text-based inputs */
  placeholder?: string
  /** A boolean that helps the form identify required fields */
  required?: boolean
  /** The location of any field validation error messages */
  errorStyle?:
    | 'top-right'
    | 'top-left'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
  /** The location of the field label */
  labelStyle?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'floating'
  /** The number of columns that the field should span */
  colSpan?: number | 'full'
  /** If true, the field will render a validation icon after onTouch validation */
  showValidation?: boolean
  settings_select?: {
    options: InputOption[]
    initial?: string
  }
  settings_switch?: SwitchSettings
  settings_datepicker?: object
  settings_checkbox?: {
    options: InputOption[]
  }
  settings_radio?: {
    options: InputOption[]
  }
  settings_password?: {
    toggleCharacters?: boolean
  }
  settings_text?: {
    mask?: 'phone' | 'zipcode' | 'credit-card'
  }
  settings_repeater?: object
}

export interface InputProps extends FieldProps {
  hasError: boolean
  firstTouch: boolean
  setFirstTouch: (b: boolean) => void
}
