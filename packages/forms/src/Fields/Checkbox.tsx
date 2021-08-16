import * as React from 'react'
import { Field } from 'formik'
import { InputProps } from '../types'

interface CheckboxProps extends InputProps {}

export const Checkbox = ({ name, settings_checkbox }: CheckboxProps) => {
  return (
    <div role="group" aria-labelledby={`"${name}-group"`}>
      {settings_checkbox?.options?.map(({ label, value }) => (
        <label key={value}>
          <Field type="checkbox" name={name} value={value} />
          {label}
        </label>
      ))}
    </div>
  )
}
