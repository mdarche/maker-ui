import * as React from 'react'
import { FormikHelpers, FormikValues } from 'formik'
import type { Props as ReactSelectProps } from 'react-select'
import { ImagePickerProps } from './ImagePicker'

export interface FormValues extends FormikValues {}
export interface FormHelpers extends FormikHelpers<any> {}

export type { FormProviderProps } from './FormProvider'
export type { FormSubmitButtonProps } from './SubmitButton'
export type { FormPageButtonProps } from './PageButton'
export type { FormPageProps } from './Page'
export type { FormProgressProps } from './Progress'

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

/**
 * https://stackoverflow.com/questions/56949513/typescript-type-of-a-property-dependent-on-another-property-within-the-same-obj
 */

type FieldType =
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
  | 'datepicker' // TODO
  | 'switch'
  | 'radio'
  | 'checkbox'
  | 'slider'
  | 'repeater' // TODO
  | 'color'
  | 'range'
  | 'file'
  | 'image-picker'

export interface SelectSettings extends ReactSelectProps {
  isCreatable?: boolean
  isCreatableInput?: boolean
  options: InputOption[]
  isSearchable?: boolean
  isClearable?: boolean
  blurInputOnSelect?: boolean
  captureMenuScroll?: boolean
  closeMenuOnSelect?: boolean
  closeMenuOnScroll?: boolean
  isDisabled?: boolean
  isMulti?: boolean
  delimiter?: string
  placeholder?: string | number | boolean
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
  /** The radius of the switch container and slider. This only applies to the `box` style. */
  borderRadius?: number
  /** The switch style can be `circle` or `box` */
  style?: 'circle' | 'box'
}

export type FieldSettings<T> = T extends 'text'
  ? { mask?: 'phone' | 'zipcode' | 'credit-card' }
  : T extends 'select'
  ? SelectSettings
  : T extends 'radio'
  ? { options: InputOption[] }
  : T extends 'checkbox'
  ? { options: InputOption[] }
  : T extends 'range'
  ? { min?: number; max?: number }
  : T extends 'password'
  ? {
      /** Display a button that lets you toggle password visibility */
      toggleCharacters?: boolean
    }
  : T extends 'switch'
  ? SwitchSettings
  : T extends 'image-picker'
  ? Omit<ImagePickerProps, 'setFile' | 'setFiles'>
  : undefined

export interface FieldProps {
  /** Unique identifier for the field (required)*/
  name: string
  /** The field type (required) */
  type: FieldType
  /** Custom settings depending on the field's `type` attribute */
  settings?: FieldSettings<FieldProps['type']>
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
  /** A cypress test selector */
  cy?: string
}

export interface InputProps extends FieldProps {
  hasError: boolean
}
