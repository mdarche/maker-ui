import * as React from 'react'
import { Field as FormikField } from 'formik'
import { InputProps } from '../types'

interface CheckboxProps extends InputProps {}

export const Checkbox = ({ name, settings_checkbox }: CheckboxProps) => {
  return (
    <div role="group" aria-labelledby={`${name}-group`}>
      {settings_checkbox?.options?.map(
        ({ id, className, label, value }, index) => (
          <label key={index}>
            <FormikField
              id={id}
              className={className}
              type="checkbox"
              name={name}
              value={value || label}
            />
            {label}
          </label>
        )
      )}
    </div>
  )
}
