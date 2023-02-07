import * as React from 'react'
import type { FieldProps } from '@/types'

interface LabelProps {
  name: FieldProps['name']
  children: FieldProps['label']
  type: FieldProps['type']
}

export const Label = ({ name, children, type }: LabelProps) => {
  const isSwitch = type === 'switch'
  if (type === 'checkbox' || type === 'radio' || isSwitch) {
    return (
      <div
        id={isSwitch ? `${name}-label` : `${name}-group`}
        className="mkui-field-label">
        {children}
      </div>
    )
  }

  return (
    <label htmlFor={`field-${name}`} className="mkui-field-label">
      {children}
    </label>
  )
}
