import * as React from 'react'
import { Breakpoints } from '@maker-ui/style'
import { TransitionType } from '@maker-ui/transition'
import type { Schema, ZodError } from 'zod'

export interface FileValidation {
  size: number
  types: string[]
}

export interface FormSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  _type?: string
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
  /** Allows the user to select dates that occurred before today.
   * @default false
   */
  allowPastDates?: boolean
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
  /** An array of unavailable dates or date strings that will render disabled calendar days.
   *
   * For best results, format each date string as `YYYY-MM-DD` so the calendar does not consider
   * the time of day and timezone.
   */
  unavailable?: string[]
  /** An array of days (0 - 6) that will render disabled calendar days each week.
   * 0 is Sunday and 1 is Monday.
   * @example
   * To disable weekends, use: [0, 6]
   */
  unavailableDays?: number[]
  /** If true, all days outside of the `startDate` and `endDate` props will be hidden. */
  showRangeOnly?: boolean
  /**  Determines where the month navigation arrows should be positioned.
   * @default 'split'
   */
  arrowPos?: 'left' | 'right' | 'split'
  /** If true, the bottom of the calendar will show selected dates.
   * @default true
   */
  showSelections?: boolean
  /** The format of the selected dates, if visible.
   * @default 'ddd MMM DD YYYY'
   * @link https://day.js.org/docs/en/display/format
   */
  dateFormat?: string
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
  /** An IANA timezone identifier for validating available / unavailable time slots.
   * @default 'America/New_York'
   * @link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   */
  timezone?: string
  /** The start time for the time picker. Uses a 24 hour clock.
   * @default '9:00'
   */
  startTime?: string
  /** The last possible start time for the time picker. Uses a 24 hour clock.
   * @default '17:00'
   */
  endTime?: string
  /**
   * Allows you to customize how the time button labels are formatted.
   * @default 'h:mm A'
   * @link https://day.js.org/docs/en/display/format
   */
  timeFormat?: string
  /** The frequency at which times can be scheduled. This must be divisible by 15.
   * @default 30 // Meeting slots begin every 30 minutes
   */
  interval?: number
  /** The duration in minutes of each time slot. This must be divisible by 15.
   * @default 30 // Meetings last 30 minutes
   */
  duration?: number
  /** An optional message that will display above the time picker. */
  header?: string | React.ReactElement
  /** An array of times that should not be available for selection. */
  unavailableTimes?: string[]
  /** Renders the selected calendar date before the time picker.
   * @default true
   */
  showSelectedDate?: boolean
  /** The format of the selected date, if visible.
   * @default 'ddd MMM DD YYYY'
   * @link https://day.js.org/docs/en/display/format
   */
  dateFormat?: string
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
  /** Field specific label positioning. */
  labelPosition?: LabelPosition
  /** Field specific error positioning. */
  errorPosition?: ErrorPosition
  /** A custom set of conditions that determine if a field should render based on the value
   * of another field. This prop takes an array of arrays where the first array will be
   * evaluated as AND conditions and the second array will be evaluated as OR.
   */
  conditions?: Array<Condition[]>
  /** Renders a small validation icon next to the field if the field has no errors and has
   * been previously touched. */
  showValidation?: boolean
  /** Props applied directly to the form input which might be useful for testing libraries
   * like Cypress. */
  inputProps?: any // for Cypress or any other custom props
  /** If true and the field type is `input` honeypot styling will be automatically applied
   * to this field. */
  honeypot?: boolean
  /** If true, the form will automatically submit after this field has been touched. */
  autoSave?: boolean | AutoSaveSettings
  /** The number of columns this field should span. */
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
    /** The return value format on form submission. Can be a date object or an ISO date string.
     * @default 'date'
     */
    returnType?: 'date' | 'iso'
    /** Callback function that is invoked any time a date is changed or selected. */
    onChange?: (selection: DateSelection) => void
  }
  /** Custom settings for the image-picker field type */
  image?: ImagePickerProps
  /** Custom settings for the password field type */
  password?: {
    /** Renders a toggle that allows the user to see a non-masked version of the password. */
    toggle?: boolean
    /** Determines if the password toggle is absolutely positioned.  */
    absolute?: boolean
    /** An optional class selector for the password toggle button */
    className?: string
    /** Custom icon for the hide password button */
    iconHide?: React.ReactElement
    /** Custom icon forthe reveal password button */
    iconReveal?: React.ReactElement
  }
  text?: {
    /** Appears before the input */
    prepend?: string | React.ReactElement
    /** Appears after the input */
    append?: string | React.ReactElement
    /** If true, the masked / formatted value will be returned on form submission. */
    returnFormatted?: boolean
    /** Applies formatting to the input */
    format?:
      | 'currency'
      | 'currency-decimal-auto'
      | 'phone'
      | 'zip'
      | 'ssn'
      | 'credit-card'
      | ((s: string) => string)
  }
  /** Custom settings for the `repeater` field type */
  repeater?: {
    /** A custom label, icon, or React Element for the add button (inner content) */
    iconAdd?: React.ReactElement
    /** A custom label, icon, or React Element for the remove button (inner content) */
    iconRemove?: React.ReactElement
    /** The maximum number of rows that can be added */
    max?: number
    /** The minimum number of rows that must be added */
    min?: number
    /** Custom grid template columns for the repeater field. */
    columns?: number
    /** Custom grid template rows for the repeater field. */
    rows?: string
  }
  /** Custom settings for the `group` field type */
  group?: {
    /** Custom grid template columns for the group field. */
    columns?: number
    /** Custom grid template rows for the group field. */
    rows?: string
  }
  /** Nested fields if the field type is `group`, `repeater`, or `page`. */
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
  /** If you include this, required fields labels will have a custom required indicator
   * appended to the text. */
  requiredSymbol?: boolean | React.ReactElement
  /** Customize the pagination page transition
   * @default 'fade'
   */
  pageTransition?: TransitionType
  /** Customize the success page transition
   * @default 'fade'
   */
  successTransition?: TransitionType
  /** Custom function that is invoked each time a form page changes */
  onPageChange?: (page: number, values: FormValues) => void
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
  /** Replace the default field icons to make the form feel more custom  */
  icons?: {
    selectArrow?: React.ReactElement
    selectClose?: React.ReactElement
    upload?: React.ReactElement
    nextArrow?: React.ReactElement
    prevArrow?: React.ReactElement
    validate?: React.ReactElement
    remove?: React.ReactElement
    add?: React.ReactElement
  }
}

export interface FormClassNames {
  /** Applied to the root form element */
  form?: string
  /** Applied to all field groups */
  fieldGroup?: string
  /** Applied to all field containers (label and input) */
  fieldContainer?: string
  /** Applied to all field labels */
  fieldLabel?: string
  /** Applied to all field instructions */
  fieldInstructions?: string
  /** Applied to all field errors */
  fieldError?: string
  /** Applied to each form page container */
  page?: string
  /** Applied to the previous page button */
  prevButton?: string
  /** Applied to the next page button */
  nextButton?: string
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

export type FormValues<T = Record<string, any>> = {
  [K in keyof T]: T[K]
}

export interface FormErrors {
  [key: string]: ZodError | string
}

export interface FormHelpers {
  /** The number of times the form has been submitted */
  submitCount: number
  /** A function that sets the submit state to true or false. This is useful if your
   * Form.SubmitButton uses the lifecycle prop and your submit handler is asynchronous.
   */
  setIsSubmitting: (value: boolean) => void
  /** Calling this function will remove data from the form's current session and revert back
   * to the initial field props, or the new initial fields if generated dynamically.
   */
  resetForm: () => void
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
  resetCount: number
  isSubmitting: boolean
  isValidating: boolean
}

/**
 * This seems dumb but we will someday need it to style forms visually with GUI page builder.
 */
export interface FormStyles {
  form?: {
    gap?: string | number
    columns?: string
    iconFill?: string
    placeholderColor?: string
  }
  label?: {
    color?: string
    fontSize?: string | number
    padding?: string | number
  }
  error?: {
    color?: string
    fontSize?: string | number
    padding?: string | number
  }
  instructions?: {
    color?: string
    fontSize?: string | number
    padding?: string | number
  }
  input?: {
    bg?: string
    height?: string | number
    fontSize?: string | number
    padding?: string | number
    border?: string
    borderRadius?: string | number
  }
  textArea?: {
    height?: string | number
  }
  select?: {
    columns?: number
    padding?: string | number
    borderActive?: string
    // Value
    valueColor?: string
    valueBg?: string
    // Highlight
    highlightColor?: string
    highlightBg?: string
    // Count indicator
    countColor?: string
    countBg?: string
    countFontSize?: string | number
    // Group Label
    groupColor?: string
    groupBg?: string
    groupPadding?: string | number
    groupFontSize?: string | number
  }
  switch?: {
    bg?: string
    bgActive?: string
    height?: string | number
    padding?: string | number
    borderRadius?: string | number
    labelColor?: string
    labelColorActive?: string
  }
  calendar?: {
    width?: string | number
    gap?: string | number
    borderRadius?: string | number
    rangeBorderRadius?: string | number
    bg?: string
    colorActive?: string
    colorMuted?: string
    fontSize?: string | number
    monthFontSize?: string | number
    dayFontSize?: string | number
    timeFontSize?: string | number
    timeGap?: string | number
    timeWidth?: string | number
    timeHeight?: string | number
    arrowHeight?: string | number
  }
  range?: {
    inputWidth?: string | number
    thumbColor?: string
  }
  upload?: {
    previewSize?: string | number
    previewWidth?: string | number
    previewHeight?: string | number
    iconFill?: string
    iconHeight?: string | number
    dropzoneBorder?: string
    dropzoneBorderRadius?: string | number
    dropzoneBg?: string
    dropzoneFontSize?: string | number
    dropzoneWidth?: string | number
    dropzoneHeight?: string | number
    dropzoneSize?: string | number
  }
  option?: {
    margin?: string | number
    marginWrapper?: string | number
  }
  pagination?: {}
}
