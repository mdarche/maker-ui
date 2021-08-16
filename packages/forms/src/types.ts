import { FormikHelpers, FormikValues } from 'formik'
import React from 'react'

export interface FormValues extends FormikValues {}
export interface FormHelpers extends FormikHelpers<any> {}

export type PaginationElement =
  | string
  | React.ReactNode
  | ((currentPage: number) => React.ReactNode)

export interface SwitchSettings {
  innerLabel?: boolean
  labels?: string[]
  labelTrue?: string | React.ReactNode
  labelFalse?: string | React.ReactNode
  activeColor?: string
  inactiveColor?: string
  disabled?: boolean
}

export interface SelectSettings {
  options?:
    | string[]
    | { label: string; initial?: boolean; className?: string; id?: string }[]
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
  options?:
    | string[]
    | { label: string; initial?: boolean; className?: string; id?: string }[]
  selectOptions?:
    | string[]
    | { label: string; initial?: boolean; className?: string; id?: string }[]
  initialOption?: string
  settings_select?: SelectSettings
  settings_switch?: SwitchSettings
  settings_datepicker?: object
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
