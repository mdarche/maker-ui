import * as React from 'react'

import { FieldProps } from '../types'
import { Field } from '../Field'
import { DatePickerField } from './Datepicker'
import { Select } from './Select'

export function renderFields(fields: FieldProps[]) {
  const basicInputs = [
    'text',
    'email',
    'tel',
    'password',
    'url',
    'date',
    'file',
    'color',
    'textarea',
  ]

  return fields.map((props: FieldProps) => {
    if (basicInputs.includes(props.type)) {
      return <Field key={props.id} {...props} />
    }
    if (props.type === 'datepicker') {
      return <DatePickerField key={props.id} {...props} />
    }
    if (props.type === 'select' || props.type == 'select-datalist') {
      return <Select key={props.id} {...props} />
    }
    return null
  })
}

export function getRequired(fields?: FieldProps[]) {
  return fields?.reduce((filtered: string[], { name, required }) => {
    if (required) {
      filtered.push(name)
    }
    return filtered
  }, [])
}
