import * as React from 'react'
import { Div, mergeSelectors } from 'maker-ui'
import { FormikErrors, FormikTouched, useFormikContext } from 'formik'

import { Input } from './Input'
import { Select } from './Select'
import { DatePicker } from './Datepicker'
import { Label } from './Label'
import { FieldProps } from '../types'
import { useForm } from '../Provider'
import { Switch } from './Switch'
import { Checkbox } from './Checkbox'
import { Radio } from './Radio'
import { Range } from './Range'

function labelClass(s: string) {
  return s
}

function errorClass(s: string) {
  return s
}

const basicInputs = [
  'text',
  'textarea',
  'email',
  'tel',
  'password',
  'url',
  'date',
  'file',
  'color',
]

export const Field = (props: FieldProps) => {
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
  } = props

  const hasError = errors[name] && touched[name] ? true : false
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
      return <Select {...attributes} {...props} />
    }
    /* Radio group input*/
    if (props.type === 'radio') {
      return <Radio {...attributes} {...props} />
    }
    /* Checkbox group input*/
    if (props.type === 'checkbox') {
      return <Checkbox {...attributes} {...props} />
    }
    /* Toggle input*/
    if (props.type === 'switch') {
      return <Switch {...attributes} {...props} />
    }
    /* Range input*/
    if (props.type === 'range') {
      return <Range {...attributes} {...props} />
    }
    /* Image & Gallery input*/
    /* Custom component */
    return null
  }

  return (
    <Div
      key={id}
      className={mergeSelectors([
        'field-container',
        containerClass,
        hasError ? 'error' : undefined,
        firstTouch ? 'touched' : undefined,
        labelClass(labelStyle as string),
        errorClass(errorStyle as string),
      ])}
      css={{
        gridColumn: colSpan !== undefined ? `span ${colSpan}` : undefined,
      }}>
      <Label id={id} name={name} type={type} position={labelStyle} top>
        {label}
      </Label>
      {description ? (
        <div className="field-description">{description}</div>
      ) : null}
      {renderInputs()}
      <Label id={id} name={name} type={type} position={labelStyle}>
        {label}
      </Label>
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
    </Div>
  )
}

Field.displayName = 'Field'

/**
 * @todo
 * - create error position classes
 * - create label position classes
 * - create partials: Text, Select, Radio, Checkbox
 */
