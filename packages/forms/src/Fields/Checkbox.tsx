import * as React from 'react'
import { Field as FormikField } from 'formik'
import type { InputProps, FieldSettings } from '../types'

interface CheckboxProps extends InputProps {
  settings: FieldSettings<'checkbox'>
}

export const Checkbox = ({ name, cy, settings }: CheckboxProps) => {
  return (
    <div role="group" aria-labelledby={`${name}-group`}>
      {settings?.options?.map(({ id, className, label, value }, index) => (
        <label key={index}>
          <FormikField
            id={id}
            data-cy={cy}
            className={className}
            type="checkbox"
            name={name}
            value={value || label}
          />
          {label}
        </label>
      ))}
    </div>
  )
}
