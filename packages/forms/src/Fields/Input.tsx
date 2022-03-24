import * as React from 'react'
import { Field as FormikField } from 'formik'
import type { InputProps } from '../types'

interface TextProps extends InputProps {}

export const Input = ({
  id,
  type,
  name,
  hasError,
  placeholder,
  cy,
}: TextProps) => {
  return (
    <FormikField
      id={id}
      data-cy={cy}
      as={type === 'textarea' ? 'textarea' : 'input'}
      name={name}
      className={hasError ? 'error' : undefined}
      placeholder={placeholder}
      type={type}></FormikField>
  )
}
