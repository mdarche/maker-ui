import { Breakpoints } from '@maker-ui/style'
import * as React from 'react'
import type { Schema, ZodError } from 'zod'

type ResponsiveScale = string | number | (string | number)[]

export interface FileValidations {
  size: number
  types: string[]
}

export interface DropzoneSettings {
  className?: string
  component?: string | React.ReactElement
  activeComponent?: string | React.ReactElement
  position?: 'right' | 'left' | 'top' | 'bottom'
  showFileName?: boolean | 'bottom'
  width?: ResponsiveScale
  height?: ResponsiveScale
  icon?: false | React.ReactElement
  replaceWithPreview?: boolean
  hoverPreview?: boolean
  naked?: boolean
}

export interface ImagePickerProps {
  /** A className selector for the outermost image picker container */
  className?: string
  /** An ID selector for the outermost image picker container */
  id?: string
  /** An ID selector for the file upload input */
  inputId?: string
  /** An image URL or React component */
  preview?: string | React.ReactElement | false
  /** The size of the image preview. If square, use a number or array of numbers or an object
   * with responsive height and width values. */
  previewSize?:
    | ResponsiveScale
    | { height: ResponsiveScale; width: ResponsiveScale }
  /** Placeholder image, component, or SVG */
  placeholder?: React.ReactElement | string
  /** The file storage setter hook for single file uploads */
  setFile?: (f: File | undefined) => void
  /** The file storage setter hook for multiple file uploads */
  setFiles?: (f: File[] | undefined) => void
  /** A boolean that determines if the image preview should also be a hover dropzone.
   * Or an object of configurations for advanced layouts.
   */
  previewDropzone?:
    | false
    | { className?: string; component?: React.ReactElement }
  /** The position of the upload error message. */
  errorPosition?: 'bottom' | 'top' | 'side'
  /** Set to false if you don't need a dropzone. Otherwise you can use a configuration object
   * for advanced layouts.
   */
  dropzone?: false | DropzoneSettings
  /** A configuration object for file upload requirements. */
  validations?: FileValidations
  /** A custom component or string to be used inside the Remove Image button */
  removeImageComponent?: React.ReactElement | string
  /** Optional effect that runs when the image is removed. Helpful for removing cloudbased images as well. */
  onRemoveImage?: () => any
  /** Optional effect that runs when image files are added to state. */
  onUploadImage?: (url: Promise<string>) => any
  /** A custom cypress `data-cy` selector for the file input */
  cy?: string
}

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
  | 'color-picker' // TODO custom
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
  label: string | React.ReactNode
  value: string
  className?: string
  id?: string
  disabled?: boolean
  group?: string
}

export interface FieldInputProps {
  name: string
}

interface MinMax {
  min: number
  max: number
}

// type OptionalName = string | undefined
// type FieldName<T> = T extends 'page'
//   ? OptionalName
//   : T extends 'group'
//   ? OptionalName
//   : string

export interface FieldProps {
  key?: string
  type: FieldType
  // name: FieldName<FieldProps['type']> // TODO - FIgure this out
  name: string
  initialValue?: any
  className?: string
  label?: string | React.ReactElement
  instructions?: string | React.ReactElement
  component?: React.ReactElement
  placeholder?: string
  required?: boolean
  /** Custom Zod validation schema that will be run during validation */
  validation?: Schema
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
  range?: {
    multi?: boolean
    textInput?: boolean
    min?: number
    max?: number
    step?: number
    labelMin?: string | React.ReactElement
    labelMax?: string | React.ReactElement
    beforeInput?: string | React.ReactElement
    afterInput?: string | React.ReactElement
    /** A callback for accessing values as they change */
    onChange?: (m: MinMax) => void
  }
  select?: {
    multi?: boolean
    search?: boolean
    creatable?: boolean
    clearable?: boolean
    fixed?: InputOption[]
  }
  // For switch
  switch?: {
    /** A custom label for the switch `on` state. */
    labelOn?: string | React.ReactNode | boolean
    /** A custom label for the switch `off` state. */
    labelOff?: string | React.ReactNode | boolean
    /** Renders the switch as disabled */
    disabled?: boolean
    /** The switch style can be `circle` or `box` */
    style?: 'circle' | 'box'
  }
  // For image
  image?: ImageSettings
  // For Password
  password?: {
    toggleCharacters?: boolean
    iconHide?: React.ReactElement
    iconReveal?: React.ReactElement
  }
  subFields?: FieldProps[]
}

// Form Types

export interface AutoSaveSettings {
  saveIcon?: React.ReactElement
  successIcon?: React.ReactElement
  errorIcon?: React.ReactElement
  timeout?: number
  position?: 'left' | 'right'
  padding?: number
}

export interface FormSettings {
  /** Shows validation for an individual field. Requires `validateFormOnBlur` to be true. */
  validateFieldOnBlur: boolean
  validateIcon: React.ReactElement
  breakpoints?: Breakpoints
  columns: string | string[] | number
  gap: string | number | (string | number)[]
  labelPosition: LabelPosition
  errorPosition: ErrorPosition
  classNames?: FormClassNames
  placeholderColor?: string | string[]
  autoSave?: boolean | AutoSaveSettings
  /** If true, the submit button will be disabled until form validation passes. // FIgure this out by finding if all required fields have values
   */
  disableSubmit?: boolean
}

export interface FormClassNames {
  /** Applied to the root form element */
  form?: string
  /** Applied to all field groups */
  fieldGroup?: string
  /** Applied to all field containers (label and input) */
  fieldContainer?: string
  /** Applied to each form page container */
  page?: string
  /** Applied to the page progress bar container */
  progress?: string
  /** Applied to all pagination buttons */
  pageButton?: string
  /** Applied to the submit button. */
  submitButton?: string
}

export interface FormValues {
  [key: string]: any
}

export interface FormErrors {
  [key: string]: ZodError | string
}

// Form State

export type FormSchema = {
  [key: string]: {
    type: FieldType
    page: number
    required: boolean
    validation?: Schema
  }
}

export interface FormState {
  settings: FormSettings
  fields: FieldProps[]
  schema: FormSchema
  currentPage: number
  totalPages: number
  formSuccess?: boolean
  formError?: boolean
  errors: FormErrors
  values: FormValues
  touched: string[]
  submitCount: number
  isSubmitting: boolean
  isValidating: boolean
}
