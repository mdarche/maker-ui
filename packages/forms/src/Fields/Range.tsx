import * as React from 'react'
import { Field as FormikField } from 'formik'
import { InputProps, FieldSettings } from '../types'

interface RangeProps extends InputProps {
  settings: FieldSettings<'range'>
}

export const Range = ({
  name,
  settings = { min: 0, max: 10 },
  hasError,
  cy,
}: RangeProps) => {
  return (
    <FormikField
      as="input"
      type="range"
      data-cy={cy}
      name={name}
      className={hasError ? 'error' : undefined}
      min={settings.min}
      max={settings.max}
    />
  )
}
