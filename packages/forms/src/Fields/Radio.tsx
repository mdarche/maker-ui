import * as React from 'react'
import { Field as FormikField } from 'formik'
import { InputProps } from '../types'

interface RadioProps extends InputProps {}

export const Radio = ({ name, settings_radio }: RadioProps) => {
  return (
    <div role="group" aria-labelledby={`${name}-group`}>
      {settings_radio?.options?.map(
        ({ id, className, label, value }, index) => (
          <label key={index}>
            <FormikField
              id={id}
              className={className}
              type="radio"
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
