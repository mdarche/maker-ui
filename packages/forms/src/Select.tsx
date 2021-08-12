import * as React from 'react'
import { FieldProps } from './types'

interface OptionProps {
  options?: FieldProps['selectOptions']
  initial?: string
  datalist?: boolean
  id?: string
}

interface OptionWrapperProps {
  children: React.ReactNode
  wrapper?: boolean
  id?: string
}

const OptionWrapper = ({ wrapper, id, children }: OptionWrapperProps) =>
  wrapper ? <datalist id={`list-${id}`}>{children}</datalist> : <>{children}</>

export const OptionList = ({ options, id, initial, datalist }: OptionProps) => {
  // TODO conditional check the options for object vs array of strings
  return (
    <OptionWrapper id={id} wrapper={datalist}>
      {initial ? <option>{initial}</option> : null}
      {/* @ts-ignore */}
      {options?.map((i, index) => (
        <option key={index}>{i}</option>
      ))}
    </OptionWrapper>
  )
}
