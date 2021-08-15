import * as React from 'react'
import { Field as FormikField } from 'formik'
import { InputProps } from '../types'

interface TextProps extends InputProps {}

export const TextField = ({
  id,
  type,
  name,
  hasError,
  placeholder,
  firstTouch,
  setFirstTouch,
}: TextProps) => {
  return (
    <FormikField
      id={id}
      onFocus={() => (!firstTouch ? setFirstTouch(true) : undefined)}
      onClick={() => (!firstTouch ? setFirstTouch(true) : undefined)}
      as={type === 'textarea' ? 'textarea' : 'input'}
      name={name}
      className={hasError ? 'error' : undefined}
      placeholder={placeholder}
      type={type}></FormikField>
  )
}
