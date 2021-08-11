import * as React from 'react'

import { FieldProps } from './types'
import { Field } from './Field'
import { DatePickerField } from './Datepicker'

export function renderFields(fields: FieldProps[]) {
  const fieldInputs = [
    'text',
    'email',
    'tel',
    'password',
    'url',
    'select',
    'select-datalist',
    'date',
    'file',
    'color',
    'textarea',
  ]

  return fields.map((props: FieldProps) => {
    if (fieldInputs.includes(props.type)) {
      return <Field key={props.id} {...props} />
    }
    if (props.type === 'datepicker') {
      return <DatePickerField key={props.id} />
    }
    return null
  })
}
