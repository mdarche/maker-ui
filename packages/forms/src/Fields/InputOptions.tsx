import * as React from 'react'
import { Field as FormikField } from 'formik'
import type { InputProps, InputOption } from '../types'

export interface InputOptionProps extends InputProps {
  settings: {
    options: InputOption[]
  }
}
// For the radio and checkbox input components

export const InputOptions = ({
  name,
  cy,
  settings,
  hasError,
  ...props
}: InputOptionProps) => (
  <div
    role="group"
    aria-labelledby={`${name}-group`}
    className={hasError ? 'error' : undefined}>
    {settings?.options?.map(({ id, className, label, value }, index) => (
      <label key={index}>
        <FormikField
          id={id}
          data-cy={cy}
          className={className}
          name={name}
          value={value || label}
          {...props}
        />
        {label}
      </label>
    ))}
  </div>
)