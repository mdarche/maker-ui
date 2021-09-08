import * as React from 'react'
import { FormikHelpers, FormikValues } from 'formik'

export interface FormValues extends FormikValues {}
export interface FormHelpers extends FormikHelpers<any> {}

export { FormProviderProps } from './Provider'
export { FormSubmitButtonProps } from './SubmitButton'
export { FormPageButtonProps } from './PageButton'
export { FormPageProps } from './Page'
export { FormProgressProps } from './Progress'

export type PaginationElement =
  | string
  | React.ReactNode
  | ((currentPage: number) => React.ReactNode)

export type InputOption = {
  label: string
  value?: string
  className?: string
  id?: string
}

export type FieldProps = {
  /** Unique identifier for the field (required)*/
  name: string
  /** The field type (required) */
  type:
    | 'divider'
    | 'text'
    | 'textarea'
    | 'tel'
    | 'email'
    | 'password'
    | 'number'
    | 'url'
    | 'select'
    | 'select-datalist'
    | 'date'
    | 'datepicker' // TODO
    | 'switch'
    | 'radio'
    | 'checkbox'
    | 'slider'
    | 'repeater' // TODO
    | 'color'
    | 'range'
    | 'file'
  /** The input's initial value*/
  initialValue?: any
  /** Yup Validation rule for this field. See for details:
   * @link https://github.com/jquense/yup
   */
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
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
  /** The location of the field label */
  labelStyle?:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'right'
    | 'left'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'floating'
  /** The number of columns that the field should span */
  colSpan?: number
  /** If true, the field will render a validation icon after onTouch validation */
  showValidation?: boolean
  /** Settings for the switch field */
  settings_switch?: {
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
    /** The radius of the switch container and slider. This only applies to the `box` style. */
    borderRadius?: number
    /** The switch style can be `circle` or `box` */
    style?: 'circle' | 'box'
  }
  /** Settings for the datepicker field */
  settings_datepicker?: object
  /** Settings for the select and select-datalist fields */
  settings_select?: {
    /** An array of values for the select options */
    options: InputOption[]
  }
  /** Settings for the checkbox field */
  settings_checkbox?: {
    /** An array of values for the checkbox options */
    options: InputOption[]
  }
  /** Settings for the radio field */
  settings_radio?: {
    /** An array of values for the radio options */
    options: InputOption[]
  }
  /** Settings for the password field */
  settings_password?: {
    /** When true, the user can toggle the field between text and password to see the characters */
    toggleCharacters?: boolean // TODO
  }
  /** Settings for the range field */
  settings_range?: {
    min?: number
    max?: number
  }
  /** Settings for the text field */
  settings_text?: {
    /** An optional formatting mask for the text field*/
    mask?: 'phone' | 'zipcode' | 'credit-card' // TODO
  }
  /** Settings for the repeater field */
  settings_repeater?: object
  /** A cypress test selector */
  cy?: string
}

export interface InputProps extends FieldProps {
  hasError: boolean
  firstTouch: boolean
  setFirstTouch: (b: boolean) => void
}
