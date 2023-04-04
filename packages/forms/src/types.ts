import { Breakpoints } from '@maker-ui/style'
import * as React from 'react'
import type { Schema, ZodError } from 'zod'

export interface FileValidation {
  size: number
  types: string[]
}

export interface DropzoneSettings {
  /** Custom component that replaces all dropzone styles as well as the `icon`, `label`,
   * and `activeLabel` props. This is useful for adding a custom Upload button, however,
   * you should use a regular div to achieve this effect because the dropzone already acts as a button.  */
  component?: string | React.ReactElement
  /** Classname for the root dropzone component */
  className?: string
  /** An inner label to be rendered below the `icon` prop when the dropzone is inactive. */
  label?: string | React.ReactElement
  /** An inner label to be rendered below the `icon` prop when the user is about to drop a file */
  activeLabel?: string | React.ReactElement
  /** The position of the dropzone relative to the placeholder or preview component */
  position?: 'right' | 'left' | 'top' | 'bottom'
  /** Renders the name of the file that was just added to the dropzone */
  showFileName?: boolean
  /** Renders a default upload icon or a custom React element */
  icon?: false | React.ReactElement
  replaceWithPreview?: boolean
  overlay?: boolean
  fileValidation?: FileValidation
  inputProps?: any
  /** The position of the upload error message. */
  errorPosition?: 'bottom' | 'top' | 'side'
}

export interface ImagePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'placeholder'> {
  /** An ID selector for the file upload input */
  inputProps?: any
  /** A custom image URL or React component. If false, the image preview will not render. */
  preview?: React.ReactElement | string | false
  /** A custom image URL or React component that is displayed before a file is selected and if the `preview` prop is undefined. */
  placeholder?: React.ReactElement | string
  /** A boolean that determines if the image preview should also be a hover dropzone.
   * You can also supply a React component that will be used as the hover overlay.
   */
  previewDropzone?: React.ReactElement | boolean
  /** The position of the upload error message. */
  errorPosition?: 'bottom' | 'top' | 'side'
  /** Set to false if you don't need a dropzone. Otherwise you can use a configuration object
   * for advanced layouts.
   */
  dropzone?: false | DropzoneSettings
  /** A configuration object for file upload requirements. */
  fileValidation?: FileValidation
  /** A custom component or string to be used inside the Remove Image button */
  componentRemove?:
    | React.ReactElement
    | string
    | ((attrs: any) => React.ReactElement)
  /** The file storage setter hook for single file uploads */
  setFile?: (f: File | undefined) => void
  /** The file storage setter hook for multiple file uploads */
  setFiles?: (f: File[] | undefined) => void
  /** Optional effect that runs when the image is removed. Helpful for removing cloudbased images as well. */
  onRemoveImage?: () => any
  /** Optional effect that runs when image files are added to state. */
  onUploadImage?: (url: Promise<string>) => any
}

export interface DateSelection {
  date?: Date | string
  startDate?: Date | string
  endDate?: Date | string
}

export interface CalendarProps {
  /** Earliest date that will be visible in the Calendar. Can be a Date or ISO string.
   * Required if `range` is true.  */
  startDate?: string | Date
  /** Latest date that will be visible in the Calendar. Can be a Date or ISO string.
   * Required if `range` is true. */
  endDate?: string | Date
  /** If true, the calendar will autoselect the next available date
   * @default false
   */
  autoSelect?: boolean
  /** If true, users can select a start and end date. */
  range?: boolean
  /** The maximum number of days that a user can select in their date range. */
  rangeMax?: number
  /** The minimum number of days that a user can select in their date range. */
  rangeMin?: number
  /** An array of unavailable dates or date strings that will render disabled calendar days. */
  unavailable?: string[]
  /** An array of days (0 - 6) that will render disabled calendar days each week.
   * 0 is Sunday and 1 is Monday.
   * @example
   * To disable weekends, use: [0, 6]
   */
  unavailableDays?: number[]
  /** Callback function that is invoked any time a date is changed or selected. */
  onChange?: (selection: DateSelection) => void
  /** If true, all days outside of the `startDate` and `endDate` props will be hidden. */
  showRangeOnly?: boolean
  /** A custom icon for the left month arrow. */
  arrowLeft?: string | React.ReactElement
  /** A custom icon for the right month arrow. */
  arrowRight?: string | React.ReactElement
  /**  Determines where the month navigation arrows should be positioned.
   * @default 'split'
   * @todo
   */
  arrowPos?: 'left' | 'right' | 'split'
  /** If true, the bottom of the calendar will show selected dates.
   * @default true
   */
  showSelections?: boolean
  /** Custom class selectors for the calendar and its inner components. */
  classNames?: {
    /** Root calendar className */
    calendar?: string
    /** Calendar heading / month navigation container */
    header?: string
    /** The month label  */
    headerMonth?: string
    /** The month previous / next buttons */
    headerButton?: string
    /** The month name cells across the top row of the calendar */
    dayName?: string
    /** The actual date cell */
    day?: string
  }
}

export interface TimePickerProps {
  /** The start time for the time picker.
   * @default [9, 0] // 9:00 AM ([Hour,  Minute])
   */
  startTime?: Date | number[]
  /** The last possible start time for the time picker.
   * @default [18, 0] // 6:00 PM ([Hour,  Minute])
   */
  endTime?: Date | number[]
  /** The frequency at which times can be scheduled. This must be divisible by 15.
   * @default 30 // Meeting slots begin every 30 minutes
   */
  interval?: number
  /** The duration in minutes of each time slot. This must be divisible by 15.
   * @default 30 // Meetings last 30 minutes
   */
  duration?: number
  /** An optional message that will display above the time picker. */
  header?: string
  /** An array of times that should not be available for selection. */
  unavailableTimes?: string[]
  /** A callback that will be called when a time is selected. */
  onChange?: (time: Date) => void
  /** Custom class selectors for the time picker and its inner components */
  classNames?: {
    root?: string
    selected?: string
    ul?: string
    li?: string
    button?: string
  }
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

// --------- Field Types ----------

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
  | 'date-picker'
  | 'date-time-picker'
  | 'switch'
  | 'radio'
  | 'checkbox'
  | 'slider'
  | 'repeater' // TODO
  | 'color-picker' // TODO
  | 'gallery' // TODO
  | 'color'
  | 'range'
  | 'file'
  | 'image-picker'
  | 'custom'

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
  value: string
  icon?: React.ReactElement
  className?: string
  id?: string
  disabled?: boolean
  group?: string
  /** @internal only */
  index?: number
}

export interface FieldInputProps {
  name: string
}

interface MinMax {
  min: number
  max: number
}

export interface FieldProps {
  /** The field type. */
  type: FieldType
  /** The field name. This will be used as the key in all form data so it must be unique. */
  name: string
  /** The initial or default value for this field. */
  initialValue?: any
  /** A custom className selector for the field input. */
  className?: string
  /** A label for the field. This can be a string or a custom React element. */
  label?: string | React.ReactElement
  /** Instructions to be rendered below the label that further explain the field. */
  instructions?: string | React.ReactElement
  /** If `type` is set to `custom`, you can use this prop to supply your custom component field.
   * Make sure you properly set the custom component's value by using `setValue` from the
   * `useField` hook.
   */
  component?: React.ReactElement
  /** A placeholder string that can be used in basic text inputs or a select box. */
  placeholder?: string
  /** Whether or not the field is required. You can also use a string to set a custom required
   * validation error.
   */
  required?: boolean | string
  /** Custom Zod validation schema that will be run during validation */
  validation?: Schema
  labelPosition?: LabelPosition
  errorPosition?: ErrorPosition
  conditions?: Array<Condition[]>
  showValidation?: boolean
  inputProps?: any // for Cypress or any other custom props
  autoSave?: boolean | AutoSaveSettings

  colSpan?: number
  /**  Options for the `radio`, `checkbox`, and `select` field types */
  options?: InputOption[] | { [key: string]: string }
  /** Custom settings for the `range` field type */
  range?: {
    /** If true, the field value will be a min/max range powered by 2 slider buttons.     */
    multi?: boolean
    /** Renders an interactive text input that shows the range value(s)*/
    textInput?: boolean
    /** The range minimum  */
    min?: number
    /** The range maximum */
    max?: number
    /** The range input's step attribute  */
    step?: number
    /** A custom string or React element for the Min label.  */
    labelMin?: string | React.ReactElement
    /** A custom string or React element for the Max label.  */
    labelMax?: string | React.ReactElement
    /** A slot to render a custom element before the input */
    beforeInput?: string | React.ReactElement
    /** A slot to render a custom element after the input */
    afterInput?: string | React.ReactElement
    /** A callback for accessing values as they change */
    onChange?: (m: MinMax) => void
  }
  /** Custom settings for the `select` field type */
  select?: {
    /** Allows you to select multiple options
     * @default false
     */
    multi?: boolean
    /** The maximum number of options that can be selected */
    max?: number
    /** Renders a simple search bar to find a specific option
     * @default true
     */
    search?: boolean
    /**Allows the user to create their own option value. You must also set `search` to true.
     * @default false
     */
    creatable?: boolean
    /** Determines the form output. For `value` it returns a string value (or array of string
     * values if `multi` is true) and for `object` the form returns the original `InputOption`
     * @default 'object'
     */
    returnType?: 'value' | 'object'
    /** Hides the select dropdown when the user clicks or focuses off the select element.
     * @default true
     */
    hideOnBlur?: boolean
    /** A callback for accessing values as they change. This will return a value or object
     *  (potentially as an array) depending on the `multi` and `returnType` settings. */
    onChange?: (i: string | string[] | InputOption | InputOption[]) => void
    /** Custom className selectors for nested Select components */
    classNames?: {
      root?: string
      control?: string
      selectedValue?: string
      search?: string
      options?: string
      optionValue?: string
      group?: string
      groupLabel?: string
      groupCount?: string
      clear?: string
      arrow?: string
    }
  }
  /** Custom settings for the switch field type  */
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
  /** Custom settings for the `date-picker` and `date-time-picker` field types */
  calendar?: {
    /** Calendar props for complete control over the Calendar component */
    date?: CalendarProps
    /** Time picker props for complete control over the TimePicker component */
    time?: TimePickerProps
  }
  /** Custom settings for the image-picker field type */
  image?: ImagePickerProps
  /** Custom settings for the password field type */
  password?: {
    /** Renders a toggle that allows the user to see a non-masked version of the password. */
    toggleCharacters?: boolean
    /** Custom icon for the hide password button */
    iconHide?: React.ReactElement
    /** Custom icon forthe reveal password button */
    iconReveal?: React.ReactElement
  }
  /** Nested fields if the field type is `group` or `page` */
  subFields?: FieldProps[]
}

// -------- Form Types --------

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
  /** A custom React element that will be used instead of the default checkmark for valid fields. */
  validateIcon: React.ReactElement
  /** Breakpoints that dictate when form columns will collapse according to the `columns` prop. */
  breakpoints?: Breakpoints
  columns: string | string[] | number
  gap: string | number | (string | number)[]
  /** The form's default field label position
   * @default 'top-left'
   */
  labelPosition: LabelPosition
  /** The form's default field error position
   * @default 'bottom-right'
   */
  errorPosition: ErrorPosition
  /** Custom className selectors for various form elements. */
  classNames?: FormClassNames
  /** The color of the placeholder text for text inputs */
  placeholderColor?: string | string[]
  /** Custom settings or a simple boolean that enables instant field validation and auto-submit */
  autoSave?: boolean | AutoSaveSettings
  /** If true, the submit button will be disabled until form validation passes. // FIgure this out by finding if all required fields have values
   */
  disableSubmit?: boolean
  /** Inner contents of the Previous page button */
  prevButton?: string | React.ReactElement
  /** Inner contents of the Next page button */
  nextButton?: string | React.ReactElement
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
  /** Applied to the pagination button container */
  pagination?: string
  /** Applied to all pagination buttons */
  pageButton?: string
  /** Applied to the submit button. */
  submitButton?: string
}
export interface FormConditions {
  [key: string]: Array<Condition[]> | undefined
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
    required: boolean | string
    validation?: Schema
  }
}

export interface FormState {
  formId: string
  settings: FormSettings
  fields: FieldProps[]
  schema: FormSchema
  conditions: FormConditions
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
