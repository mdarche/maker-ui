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
const topPosition = ['top', 'center', 'left', 'floating']
const bottomPosition = ['bottom', 'right']

export const Label = ({
  id,
  name,
  children,
  type,
  position = 'top',
  top = false,
}: LabelProps) => {
  const isTop = top && topPosition.includes(position)
  const isBottom = !top && bottomPosition.includes(position)
  const show = isTop || isBottom

  if (nonLabelFields.includes(type)) {
    return null
  }

  if (type === 'checkbox') {
    return show ? <div id={`${name}-group`}>{children}</div> : null
  }

  if (type === 'switch') {
    return show ? <div id={`${name}-label`}>{children}</div> : null
  }

  return show ? (
    <label htmlFor={id} className="form-label">
      {children}
    </label>
  ) : null
}
