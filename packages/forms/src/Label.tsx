import * as React from 'react'
import { FieldProps } from './types'

interface LabelProps {
  id: FieldProps['id']
  children: FieldProps['label']
  type: FieldProps['type']
  position: FieldProps['labelStyle']
  top?: boolean
}

export const Label = ({
  id,
  children,
  type,
  position = 'top',
  top = false,
}: LabelProps) => {
  const isTop = top && ['top', 'center', 'left', 'floating'].includes(position)
  const isBottom = isTop && ['bottom', 'right'].includes(position)

  // TODO make sure type is supported

  return isTop || isBottom ? (
    <label htmlFor={id} className="form-label">
      {children}
    </label>
  ) : null
}
