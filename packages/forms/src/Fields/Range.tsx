import * as React from 'react'
import { Field as FormikField } from 'formik'
import type { InputProps, FieldSettings } from '../types'

interface RangeProps extends InputProps {
  settings: FieldSettings<'range'>
}

export const Range = ({
  id,
  name,
  settings = { min: 0, max: 10 },
  hasError,
  cy,
  ...props
}: RangeProps) => {
  return (
    <FormikField
      id={id || name}
      as="input"
      data-cy={cy}
      name={name}
      className={hasError ? 'error' : undefined}
      min={settings.min}
      max={settings.max}
      {...props}
    />
  )
}
