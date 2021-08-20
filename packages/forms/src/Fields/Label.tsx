import * as React from 'react'
import { FieldProps } from '../types'

interface LabelProps {
  id: FieldProps['id']
  name: FieldProps['name']
  children: FieldProps['label']
  type: FieldProps['type']
  position: FieldProps['labelStyle']
  top?: boolean
}

const nonLabelFields = ['radio']

export const Label = ({ id, name, children, type }: LabelProps) => {
  if (nonLabelFields.includes(type)) {
    return null
  }

  if (type === 'checkbox') {
    return (
      <div id={`${name}-group`} className="form-label">
        {children}
      </div>
    )
  }

  if (type === 'switch') {
    return (
      <div id={`${name}-label`} className="form-label">
        {children}
      </div>
    )
  }

  return (
    <label htmlFor={id} className="form-label">
      {children}
    </label>
  )
}
