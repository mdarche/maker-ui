import * as React from 'react'
import { cn, merge } from '@maker-ui/utils'

import { useField } from '@/hooks'
import type { FieldInputProps, FieldProps } from '@/types'

const defaultSettings: FieldProps['switch'] = {
  labelOn: 'Yes',
  labelOff: 'No',
  disabled: false,
  style: 'box',
}

/**
 * The `Switch` component is a custom boolean form field that simulates
 * the iOS switch Switch.
 */
export const Switch = ({ name }: FieldInputProps) => {
  const { field, value, setValue } = useField(name)
  const config = merge(defaultSettings, field?.switch || {})
  const isCircle = config?.style === 'circle'

  function handleKeyPress(e: React.KeyboardEvent<HTMLLabelElement>) {
    if (e.code !== 'Space') return
    e.preventDefault()
  }
  return (
    <div
      className={cn(['mkui-switch', config.style])}
      aria-labelledby={`${name}-label`}>
      <label
        className={cn(['mkui-switch-label', value ? 'active' : undefined])}
        htmlFor={name}
        tabIndex={config.disabled ? -1 : 1}
        onKeyDown={(e) => handleKeyPress(e)}>
        <input
          id={name}
          type="checkbox"
          name={name}
          value={value}
          onClick={() => setValue(!value)}
          {...field?.inputProps}
          disabled={config.disabled}
        />

        {!isCircle && config?.labelOn && (
          <span className="mkui-switch-on">{config.labelOn}</span>
        )}
        {!isCircle && config?.labelOff && (
          <span className="mkui-switch-off">{config.labelOff}</span>
        )}
        <div className={cn(['mkui-switch-slider', value ? 'on' : 'off'])} />
      </label>
    </div>
  )
}
