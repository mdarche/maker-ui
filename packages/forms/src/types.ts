import * as React from 'react'
import { FormikHelpers, FormikValues } from 'formik'

export interface FormValues extends FormikValues {}
export interface FormHelpers extends FormikHelpers<any> {}

export type PaginationElement =
  | string
  | React.ReactNode
  | ((currentPage: number) => React.ReactNode)

type InputOption =
  | string[]
  | {
      label: string | React.ReactNode
      value?: string
      initial?: boolean
      className?: string
      id?: string
    }[]

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
    | 'switch'
    | 'radio'
    | 'checkbox'
    | 'slider'
    | 'repeater'
    | 'color'
    | 'range' // TODO
    | 'file'
    | 'custom' // TODO
  required?: boolean
  errorStyle?:
    | 'top-right'
    | 'top-left'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
  labelStyle?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'floating'
  colSpan?: number | 'full'
  showValidation?: boolean
  options?: InputOption
  selectOptions?: InputOption
  initialOption?: string
  settings_select?: {
    options?: InputOption
    initial?: string
  }
  settings_switch?: SwitchSettings
  settings_datepicker?: object
  settings_checkbox?: {
    options?: {
      label: string | React.ReactNode
      value: string
    }[]
  }
  settings_password?: {
    toggleCharacters?: boolean
  }
  settings_text?: {
    mask?: 'phone' | 'zipcode' | 'credit-card'
  }
  settings_repeat?: object
  /* Yup Validation rule */
  validation?: any
}

export interface InputProps extends FieldProps {
  hasError: boolean
  firstTouch: boolean
  setFirstTouch: (b: boolean) => void
}
