import * as React from 'react'
import { Flex } from '@maker-ui/primitives'
import type { MakerProps } from '@maker-ui/css'
import { Spinner } from '@maker-ui/loaders'
import { mergeSelectors, merge, ConditionalWrapper } from '@maker-ui/utils'
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
import { AutoSave } from './AutoSave'
import { ErrorIcon, ValidateIcon } from '../Icons'
import type {
  AutoSaveSettings,
  FieldProps,
  PasswordSettings,
  SelectSettings,
  SwitchSettings,
} from '../types'
import { evaluateConditions } from './conditions'

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
  indicator: (
    <Spinner type="classic" size={20} colors={{ primary: '#d2d2d2' }} />
  ),
  successIcon: <ValidateIcon css={{ height: 20, fill: '#3aca3a' }} />,
  errorIcon: <ErrorIcon css={{ height: 20, fill: '#e93030' }} />,
  timeout: 2500,
  position: 'left',
  padding: 30,
}

const positionTop = ['top-right', 'top-left', 'top-center', 'left', 'floating']
const positionBottom = ['bottom-right', 'bottom-left', 'bottom-center', 'right']

interface FieldComponentProps extends FieldProps {
  breakpoints: MakerProps['breakpoints']
}

export const Field = (props: FieldComponentProps) => {
  const { settings, fields, error: formError } = useForm()
  const { submitForm, values } = useFormikContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, { touched, error }, { setError }] = useField(props.name)

  const {
    name,
    id,
    colSpan,
    type,
    labelStyle = settings?.labelStyle,
    errorStyle = settings?.errorStyle,
    initialValue,
    label,
    description,
    containerClass,
    showValidation,
    breakpoints,
    autoSave,
    component,
    placeholder,
    conditions,
    cy,
  } = props
  const fieldArray = fields?.map(({ name, type }) => ({ name, type }))
  const hasError = settings.validateFieldOnBlur
    ? error && touched
      ? true
      : false
    : error
    ? true
    : false

  const isComplete = !error && touched ? true : false

  const hasAutoSave = autoSave || settings.autoSave
  const autoSaveSettings = () => {
    let local = typeof autoSave === 'boolean' || !autoSave ? {} : autoSave
    let global =
      typeof settings.autoSave === 'boolean' || !settings.autoSave
        ? {}
        : settings.autoSave
    return merge.all([defaultAutoSave, global, local]) as AutoSaveSettings
  }

  const saveOnBlur = hasAutoSave ? { onBlur: submitForm } : {}
  const attributes = {
    name,
    id,
    type,
    cy,
    hasError,
    settings,
    placeholder: basicInputs.includes(type) ? placeholder : undefined,
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
        <Select
          {...attributes}
          initialValue={initialValue}
          settings={props.settings as SelectSettings}
        />
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

  const shouldRender =
    !conditions || evaluateConditions(conditions, values as object, fieldArray)

  return shouldRender ? (
    <Flex
      key={id}
      breakpoints={breakpoints}
      className={mergeSelectors([
        'field-container',
        containerClass,
        hasError ? 'error' : undefined,
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
      <ConditionalWrapper
        condition={hasAutoSave === true}
        wrapper={(c) => (
          <AutoSave
            name={name}
            formError={formError ? true : false}
            settings={autoSaveSettings()}>
            {c}
          </AutoSave>
        )}>
        <>{renderFieldType()}</>
      </ConditionalWrapper>
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
  ) : colSpan ? (
    <div />
  ) : null
}

Field.displayName = 'Field'
