import * as React from 'react'
import { Field as FormikField } from 'formik'
import { InputProps } from '../types'

interface RangeProps extends InputProps {}

export const Range = ({
  name,
  settings_range = { min: 0, max: 10 },
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
      min={settings_range.min}
      max={settings_range.max}
    />
  )
}
