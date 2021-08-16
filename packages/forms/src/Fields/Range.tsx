import * as React from 'react'
import { Field as FormikField } from 'formik'
import { InputProps } from '../types'

interface RangeProps extends InputProps {}

export const Range = ({
  name,
  settings_range = { min: 0, max: 10 },
  hasError,
}: RangeProps) => {
  return (
    <FormikField
      as="input"
      type="range"
      name={name}
      className={hasError ? 'error' : undefined}
      min={settings_range.min}
      max={settings_range.max}
    />
  )
}
