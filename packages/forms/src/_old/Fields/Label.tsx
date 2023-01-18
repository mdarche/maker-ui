import * as React from 'react'
import type { FieldProps } from '../types'

interface LabelProps {
  id: FieldProps['id']
  name: FieldProps['name']
  children: FieldProps['label']
  type: FieldProps['type']
}

const nonLabelFields = ['']

export const Label = ({ id, name, children, type }: LabelProps) => {
  if (nonLabelFields.includes(type) || !children) {
    return null
  }

  if (type === 'checkbox' || type === 'radio') {
    return (
      <div id={`${name}-group`} className="field-label form-label">
        {children}
      </div>
    )
  }

  if (type === 'switch') {
    return (
      <div id={`${name}-label`} className="field-label form-label">
        {children}
      </div>
    )
  }

  return (
    <label htmlFor={id || name} className="field-label form-label">
      {children}
    </label>
  )
}
