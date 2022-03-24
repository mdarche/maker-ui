import * as React from 'react'
import { Field as FormikField } from 'formik'
import type { InputProps } from '../types'

interface TextProps extends InputProps {}

export const Input = ({
  id,
  name,
  type,
  hasError,
  cy,
  validation,
  ...props
}: TextProps) => (
  <FormikField
    id={id || name}
    name={name}
    data-cy={cy}
    as={type === 'textarea' ? 'textarea' : 'input'}
    className={hasError ? 'error' : undefined}
    type={type}
    {...props}
  />
)
