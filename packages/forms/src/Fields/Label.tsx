import * as React from 'react'
import { FieldProps } from '../types'

interface LabelProps {
  id: FieldProps['id']
  children: FieldProps['label']
  type: FieldProps['type']
  position: FieldProps['labelStyle']
  top?: boolean
}

const nonLabelFields = ['radio', 'checkbox', 'toggle']
const topPosition = ['top', 'center', 'left', 'floating']
const bottomPosition = ['bottom', 'right']

export const Label = ({
  id,
  children,
  type,
  position = 'top',
  top = false,
}: LabelProps) => {
  const isTop = top && topPosition.includes(position)
  const isBottom = !top && bottomPosition.includes(position)

  if (nonLabelFields.includes(type)) {
    return null
  }

  return isTop || isBottom ? (
    <label htmlFor={id} className="form-label">
      {children}
    </label>
  ) : null
}
