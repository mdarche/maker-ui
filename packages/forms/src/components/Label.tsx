import * as React from 'react'
import type { FieldProps } from '@/types'

interface LabelProps {
  name: FieldProps['name']
  children: FieldProps['label']
  type: FieldProps['type']
}

export const Label = ({ name, children, type }: LabelProps) => {
  if (type === 'checkbox' || type === 'radio') {
    return (
      <div id={`${name}-group`} className="mkui_field_label">
        {children}
      </div>
    )
  }

  if (type === 'switch') {
    return (
      <div id={`${name}-label`} className="mkui_field_label">
        {children}
      </div>
    )
  }

  return (
    <label htmlFor={name} className="mkui_field_label">
      {children}
    </label>
  )
}
