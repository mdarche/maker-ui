import { useField } from '@/hooks'
import { FieldInputProps } from '@/types'
import * as React from 'react'

// Select and Select-search
export const Select = ({ name }: FieldInputProps) => {
  const { field, error, setValue, validateField } = useField(name)

  return <div>Select</div>
}
