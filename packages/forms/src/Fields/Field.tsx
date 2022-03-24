import * as React from 'react'
import { Flex } from '@maker-ui/primitives'
import type { MakerProps } from '@maker-ui/css'
import { mergeSelectors } from '@maker-ui/utils'
import { useField } from 'formik'

import { Input } from './Input'
import { Select } from './Select'
import { DatePicker } from './Datepicker'
import { Label } from './Label'
import { FieldProps } from '../types'
import { useForm } from '../FormProvider'
import { Switch } from './Switch'
import { Checkbox } from './Checkbox'
import { Radio } from './Radio'
import { Range } from './Range'
import { FieldSettings } from '..'
import { ImageField } from './ImageField'

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

const labelTop = ['top-right', 'top-left', 'top-center', 'left', 'floating']
const labelBottom = ['bottom-right', 'bottom-left', 'bottom-center', 'right']

interface FieldComponentProps extends FieldProps {
  breakpoints: MakerProps['breakpoints']
}

export const Field = (props: FieldComponentProps) => {
  const { settings } = useForm()
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
  } = props

  const hasError = settings.validateOnChange
    ? error
      ? true
      : false
    : error && touched
    ? true
    : false
  const isComplete = !error && touched ? true : false

  function renderFieldType() {
    /* Basic HTML Inputs */
    if (basicInputs.includes(type)) {
      return <Input {...{ ...props, hasError }} />
    }
    /* Datepicker that supports ranges */
    if (props.type === 'datepicker') {
      return <DatePicker {...{ ...props, hasError }} />
    }
    /* Imagepicker  */
    if (props.type === 'image-picker') {
      return (
        <ImageField
          {...{ ...props, hasError }}
          settings={props.settings as FieldSettings<'image-picker'>}
        />
      )
    }
    /* Select and Datalist inputs */
    if (props.type === 'select') {
      return (
        <Select
          {...{ ...props, hasError }}
          settings={props.settings as FieldSettings<'select'>}
        />
      )
    }
    /* Radio group input*/
    if (props.type === 'radio') {
      return (
        <Radio
          {...{ ...props, hasError }}
          settings={props.settings as FieldSettings<'radio'>}
        />
      )
    }
    /* Checkbox group input*/
    if (props.type === 'checkbox') {
      return (
        <Checkbox
          {...{ ...props, hasError }}
          settings={props.settings as FieldSettings<'checkbox'>}
        />
      )
    }
    /* Toggle input*/
    if (props.type === 'switch') {
      return (
        <Switch
          {...{ ...props, hasError }}
          settings={props.settings as FieldSettings<'switch'>}
        />
      )
    }
    /* Range input*/
    if (props.type === 'range') {
      return (
        <Range
          {...{ ...props, hasError }}
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
        hasError ? 'error' : undefined,
        touched ? 'touched' : undefined,
        `label-${labelStyle}`,
        `error-${errorStyle}`,
      ])}
      css={{
        position: 'relative',
        gridColumn: colSpan ? ['1 / -1', `span ${colSpan}`] : '1 / -1',
      }}>
      {labelTop.includes(labelStyle as string) ? labelComponent : null}
      {description ? (
        <div className="field-description">{description}</div>
      ) : null}
      {renderFieldType()}
      {labelBottom.includes(labelStyle as string) ? labelComponent : null}
      {showValidation ? (
        <div
          className={mergeSelectors([
            'validate-icon',
            isComplete ? 'valid' : '',
          ])}>
          {settings?.validateIcon}
        </div>
      ) : null}
      {hasError ? <div className="form-error">{error}</div> : null}
    </Flex>
  )
}

Field.displayName = 'Field'
