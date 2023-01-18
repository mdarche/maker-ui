import * as React from 'react'

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
  inner_label?: boolean
  /** A custom label for the switch `on` state. Must have `innerLabel` active. */
  label_on?: string | React.ReactNode
  /** A custom label for the switch `off` state. Must have `innerLabel` active. */
  label_off?: string | React.ReactNode
  /** The switch background color for `on` state */
  color_active?: string
  /** The switch background color for `off` state */
  color_muted?: string
  /** Renders the switch as disabled */
  disabled?: boolean
  /** The total height of the switch input */
  height?: number
  /** The padding between the switch slider and the edge of the input */
  padding?: number
  /** The radius of the switch container and slider if no `innerBorderRadius` is defined. This only applies to the `box` style. */
  border_radius?: number
  /** The radius of the slider. This only applies to the `box` style. */
  inner_border_radius?: number
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
  label: string | React.ReactNode
  value: string
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
  subFields?: FieldProps[]
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
  /** Validates all touched fields when an input is blurred  */
  validateFormOnBlur: boolean
  validateIcon: React.ReactElement
  columns: string | string[] | number
  gap: string | number | (string | number)[]
  labelPosition: LabelPosition
  errorPosition: ErrorPosition
  classNames?: FormClassNames
  placeholderColor?: string | string[]
  autoSave?: boolean | AutoSaveSettings
  /** If true, the submit button will be disabled until form validation passes. This
   * prop requires validateFormOnBlur to be `true`.
   */
  disableSubmit?: boolean
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

export type FormSchema = {
  [key: string]: {
    type: FieldType
    page: number
    required: boolean
    validation?: any
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
