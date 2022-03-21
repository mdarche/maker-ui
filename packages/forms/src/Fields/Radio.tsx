import * as React from 'react'
import { Field as FormikField } from 'formik'
import type { InputProps, FieldSettings } from '../types'

interface RadioProps extends InputProps {
  settings: FieldSettings<'radio'>
}

export const Radio = ({ name, cy, settings }: RadioProps) => {
  return (
    <div role="group" aria-labelledby={`${name}-group`}>
      {settings?.options?.map(({ id, className, label, value }, index) => (
        <label key={index}>
          <FormikField
            id={id}
            data-cy={cy}
            className={className}
            type="radio"
            name={name}
            value={value || label}
          />
          {label}
        </label>
      ))}
    </div>
  )
}
