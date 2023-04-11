import * as React from 'react'
import type { FieldProps, FormSettings } from '@/types'

interface LabelProps {
  name: FieldProps['name']
  children: FieldProps['label']
  type: FieldProps['type']
  symbol?: FormSettings['requiredSymbol']
}

/**
 * Renders a label for a field. If the field is a checkbox or radio, the label
 * will be rendered as a group label. If the field is a switch, the label will
 * be rendered as a switch label.
 */
export const Label = ({ name, children, symbol, type }: LabelProps) => {
  const isSwitch = type === 'switch'
  const isGroup = type === 'checkbox' || type === 'radio' || isSwitch

  const renderSymbol = () => {
    return symbol === true ? (
      <span className="mkui-required-symbol">*</span>
    ) : (
      symbol
    )
  }

  return isGroup ? (
    <div
      id={isSwitch ? `${name}-label` : `${name}-group`}
      className="mkui-field-label">
      {children}
      {symbol && renderSymbol()}
    </div>
  ) : (
    <label htmlFor={`field-${name}`} className="mkui-field-label">
      {children} {symbol && renderSymbol()}
    </label>
  )
}
