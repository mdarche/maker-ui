import * as React from 'react'
import { Flex } from '@maker-ui/primitives'
import type { MakerProps } from '@maker-ui/css'
import { mergeSelectors, merge } from '@maker-ui/utils'
import { useField, useFormikContext } from 'formik'

import { Input } from './Input'
import { Select } from './Select'
import { Label } from './Label'
import { useForm } from '../Form/FormProvider'
import { Switch } from './Switch'
import { Range } from './Range'
import { FieldSettings } from '..'
import { ImageField } from './ImageField'
import { type InputOptionProps, InputOptions } from './InputOptions'
import type {
  AutoSaveSettings,
  FieldProps,
  PasswordSettings,
  SelectSettings,
  SwitchSettings,
} from '../types'

const basicInputs = [
  'text',
  'textarea',
  'email',
  'number',
  'tel',
  'password',
  'url',
  'date',
  'file',
  'color',
]

const defaultAutoSave: AutoSaveSettings = {
  indicator: <div>Test</div>,
  successIcon: <div>Success</div>,
  position: 'right',
}

const positionTop = ['top-right', 'top-left', 'top-center', 'left', 'floating']
const positionBottom = ['bottom-right', 'bottom-left', 'bottom-center', 'right']

interface FieldComponentProps extends FieldProps {
  breakpoints: MakerProps['breakpoints']
}

export const Field = (props: FieldComponentProps) => {
  const { settings } = useForm()
  const { submitForm } = useFormikContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, { touched, error }] = useField(props.name)
  const {
    name,
    id,
    colSpan,
    type,
    labelStyle = settings?.labelStyle,
    errorStyle = settings?.errorStyle,
    label,
    description,
    containerClass,
    showValidation,
    breakpoints,
    autoSave,
    component,
    cy,
  } = props

  const hasError = settings.validateFieldOnBlur
    ? error && touched
      ? true
      : false
    : error
    ? true
    : false

  const isComplete = !error && touched ? true : false

  // Let's figure out autosave
  const hasAutoSave = autoSave || settings.autoSave
  const autoSaveSettings = () => {
    if (!hasAutoSave) return undefined
    let local = typeof autoSave === 'boolean' || !autoSave ? {} : autoSave
    let global =
      typeof settings.autoSave === 'boolean' || !settings.autoSave
        ? {}
        : settings.autoSave
    return merge.all([defaultAutoSave, global, local])
  }

  const saveOnBlur = hasAutoSave ? { onBlur: submitForm } : {}
  const attributes = {
    name,
    id,
    type,
    cy,
    hasError,
    settings,
    ...saveOnBlur,
  }

  function renderFieldType() {
    /* Custom React inputs */
    if (type === 'custom' && component) {
      return component
    }
    /* Basic HTML Inputs */
    if (basicInputs.includes(type)) {
      return (
        <Input {...attributes} settings={props?.settings as PasswordSettings} />
      )
    }
    /* Datepicker that supports ranges */
    // if (props.type === 'datepicker') {
    //   return <DatePicker {...attributes} />
    // }
    /* Imagepicker  */
    if (props.type === 'image-picker') {
      return (
        <ImageField
          {...attributes}
          settings={props.settings as FieldSettings<'image-picker'>}
        />
      )
    }
    /* Select and Datalist inputs */
    if (props.type === 'select') {
      return (
        <Select {...attributes} settings={props.settings as SelectSettings} />
      )
    }
    /* Radio and Checkbox group inputs*/
    if (props.type === 'radio' || props.type === 'checkbox') {
      return (
        <InputOptions
          {...attributes}
          settings={props.settings as InputOptionProps['settings']}
        />
      )
    }
    /* Toggle input*/
    if (props.type === 'switch') {
      return (
        <Switch {...attributes} settings={props.settings as SwitchSettings} />
      )
    }
    /* Range input*/
    if (props.type === 'range') {
      return (
        <Range
          {...attributes}
          settings={props.settings as FieldSettings<'range'>}
        />
      )
    }
    return null
  }

  const labelComponent = (
    <Label
      // @ts-ignore
      id={type === 'image-picker' ? props.settings?.inputId : id}
      name={name}
      type={type}>
      {label}
    </Label>
  )

  // Return a Divider slot
  if (type === 'divider') {
    return (
      <div id={id} className={mergeSelectors(['divider', containerClass])}>
        {label}
      </div>
    )
  }

  // Return the appropriate field
  return (
    <Flex
      key={id}
      breakpoints={breakpoints}
      className={mergeSelectors([
        'field-container',
        containerClass,
        error ? 'error' : undefined,
        touched ? 'touched' : undefined,
        `label-${labelStyle}`,
        `error-${errorStyle}`,
      ])}
      css={{
        position: 'relative',
        gridColumn: colSpan ? ['1 / -1', `span ${colSpan}`] : '1 / -1',
      }}>
      {positionTop.includes(labelStyle as string) ? labelComponent : null}
      {description ? (
        <div className="field-description">{description}</div>
      ) : null}
      {renderFieldType()}
      {positionBottom.includes(labelStyle as string) ? labelComponent : null}
      {showValidation ? (
        <div
          className={mergeSelectors([
            'validate-icon',
            isComplete ? 'valid' : '',
          ])}>
          {settings?.validateIcon}
        </div>
      ) : null}
      {hasError ? <div className="form-error field-error">{error}</div> : null}
    </Flex>
  )
}

Field.displayName = 'Field'
