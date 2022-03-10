import * as React from 'react'
import { Flex } from '@maker-ui/primitives'
import type { MakerProps } from '@maker-ui/css'
import { mergeSelectors } from '@maker-ui/utils'
import { FormikErrors, FormikTouched, useFormikContext } from 'formik'

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
  const [firstTouch, setFirstTouch] = React.useState(false)
  const { settings } = useForm()
  const {
    errors,
    touched,
  }: {
    errors: FormikErrors<any>
    touched: FormikTouched<any>
  } = useFormikContext()
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
    ? errors[name]
      ? true
      : false
    : errors[name] && touched[name]
    ? true
    : false
  const isComplete = !errors[name] && touched[name] ? true : false

  const attributes = {
    hasError,
    firstTouch,
    setFirstTouch,
  }

  function renderInputs() {
    /* Basic HTML Inputs */
    if (basicInputs.includes(type)) {
      return <Input {...attributes} {...props} />
    }
    /* Datepicker that supports ranges */
    if (props.type === 'datepicker') {
      return <DatePicker {...attributes} {...props} />
    }
    /* Select and Datalist inputs */
    if (props.type === 'select' || props.type === 'select-datalist') {
      return (
        <Select
          {...attributes}
          {...props}
          settings={props.settings as FieldSettings<'select'>}
        />
      )
    }
    /* Radio group input*/
    if (props.type === 'radio') {
      return (
        <Radio
          {...attributes}
          {...props}
          settings={props.settings as FieldSettings<'radio'>}
        />
      )
    }
    /* Checkbox group input*/
    if (props.type === 'checkbox') {
      return (
        <Checkbox
          {...attributes}
          {...props}
          settings={props.settings as FieldSettings<'checkbox'>}
        />
      )
    }
    /* Toggle input*/
    if (props.type === 'switch') {
      return (
        <Switch
          {...attributes}
          {...props}
          settings={props.settings as FieldSettings<'switch'>}
        />
      )
    }
    /* Range input*/
    if (props.type === 'range') {
      return (
        <Range
          {...attributes}
          {...props}
          settings={props.settings as FieldSettings<'range'>}
        />
      )
    }
    return null
  }

  const labelComponent = (
    <Label id={id} name={name} type={type} position={labelStyle} top>
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
        firstTouch ? 'touched' : undefined,
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
      {renderInputs()}
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
      {hasError ? <div className="form-error">{errors[name]}</div> : null}
    </Flex>
  )
}

Field.displayName = 'Field'
