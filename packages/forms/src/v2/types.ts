import React from 'react'
import { ImagePickerProps } from '../ImagePicker'

type LabelPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'right'
  | 'left'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'floating'

type ErrorPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

// Field Types

export type FieldType =
  | 'group'
  | 'page'
  | 'divider'
  | 'text'
  | 'textarea'
  | 'tel'
  | 'email'
  | 'password'
  | 'number'
  | 'url'
  | 'select'
  | 'date'
  | 'date-picker' // TODO
  | 'color-picker' // TODO
  | 'switch'
  | 'radio'
  | 'checkbox'
  | 'slider'
  | 'repeater' // TODO
  | 'color'
  | 'range'
  | 'file'
  | 'image-picker'
  | 'custom'

export interface ImageSettings
  extends Omit<ImagePickerProps, 'setFile' | 'setFiles'> {
  returnUrl?: boolean
}

export interface SwitchSettings {
  /** If true, the switch will show `on` and `off` text values */
  innerLabel?: boolean
  /** A custom label for the switch `on` state. Must have `innerLabel` active. */
  labelOn?: string | React.ReactNode
  /** A custom label for the switch `off` state. Must have `innerLabel` active. */
  labelOff?: string | React.ReactNode
  /** The switch background color for `on` state */
  activeColor?: string
  /** The switch background color for `off` state */
  inactiveColor?: string
  /** Renders the switch as disabled */
  disabled?: boolean
  /** The total height of the switch input */
  height?: number
  /** The padding between the switch slider and the edge of the input */
  padding?: number
  /** The radius of the switch container and slider if no `innerBorderRadius` is defined. This only applies to the `box` style. */
  borderRadius?: number
  /** The radius of the slider. This only applies to the `box` style. */
  innerBorderRadius?: number
  /** The switch style can be `circle` or `box` */
  style?: 'circle' | 'box'
}

export type CompareOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'lt'
  | 'contains'
  | 'exists'
  | 'notExists'

export interface Condition {
  field: string
  compare: CompareOperator
  value?: any
}

export type InputOption = {
  label: string
  value?: string | React.ReactNode
  className?: string
  id?: string
  disabled?: boolean
}

export interface FieldProps {
  key?: string
  name: string
  type: FieldType
  initialValue?: any
  className?: string
  label?: string | React.ReactElement
  instructions?: string | React.ReactElement
  component?: React.ReactElement
  placeholder?: string
  required?: boolean
  // Custom Zod validation that will be run during validation
  validation?: any
  labelPosition?: LabelPosition
  errorPosition?: ErrorPosition
  conditions?: Array<Condition[]>
  showValidation?: boolean
  inputProps?: any // for Cypress or any other custom props
  autoSave?: boolean | AutoSaveSettings
  colSpan?: number
  // For Radio, Checkbox, Select
  options?: InputOption[] | { [key: string]: string }
  // For range
  min?: number
  // For range
  max?: number
  // For switch
  switch?: SwitchSettings
  // For image
  image?: ImageSettings
  password?: {
    toggleCharacters?: boolean
    hideIcon?: React.ReactElement
    revealIcon?: React.ReactElement
    padding?: string | number | (string | number)[]
  }
}

// Form Types

export interface AutoSaveSettings {
  indicator?: React.ReactNode
  successIcon?: React.ReactNode
  errorIcon?: React.ReactNode
  timeout?: number
  position?: 'left' | 'right'
  padding?: number
}

export interface FormSettings {
  /** Shows validation for an individual field. Requires `validateFormOnBlur` to be true. */
  validateFieldOnBlur: boolean
  /** Validates all fields when an input is blurred  */
  validateFormOnBlur: boolean
  validateIcon: React.ReactElement
  columns: string | string[] | number
  gap: string | number | (string | number)[]
  labelStyle: LabelPosition
  errorStyle: ErrorPosition
  classNames?: FormClassNames
  placeholderColor?: string | string[]
  autoSave?: boolean | AutoSaveSettings
}

export interface FormClassNames {
  form?: string
  fieldGroup?: string
  fieldContainer?: string
  page?: string
  progress?: string
  pageButton?: string
  submitButton?: string
  // All individual inputs are handled in the field config
}

export interface FormValues {
  [key: string]: any
}

export interface FormErrors {
  [key: string]: any
}

// Form State

export interface FormState {
  settings: FormSettings
  fields?: any[]
  currentPage: number
  totalPages?: number
  formSuccess?: boolean
  formError?: boolean
  errors?: FormErrors
  values?: FormValues
  touched?: string[]
  submitCount?: number
  isSubmitting: boolean
  isValidating: boolean
}
