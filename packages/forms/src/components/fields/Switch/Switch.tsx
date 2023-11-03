import * as React from 'react'
import { cn, merge } from '@maker-ui/utils'

import { useField } from '@/context'
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
 *
 * @todo style this for better keyboard management
 */
export const Switch = ({ name }: FieldInputProps) => {
  const { field, value, setValue } = useField(name)
  const settings = merge(defaultSettings, field?.switch || {})
  const isCircle = settings?.style === 'circle'

  function handleKeyPress(e: React.KeyboardEvent<HTMLLabelElement>) {
    if (e.code !== 'Space') return
    e.preventDefault()
  }
  return (
    <div
      className={cn(['mkui-switch', settings.style])}
      aria-labelledby={`${name}-label`}>
      <label
        className={cn(['mkui-switch-label', value ? 'active' : undefined])}
        htmlFor={name}
        tabIndex={settings.disabled ? -1 : 1}
        onKeyDown={(e) => handleKeyPress(e)}>
        <input
          id={name}
          type="checkbox"
          name={name}
          value={value}
          onClick={() => setValue(!value)}
          {...field?.inputProps}
          disabled={settings.disabled}
        />

        {!isCircle && settings?.labelOn && (
          <span className="mkui-switch-on">{settings.labelOn}</span>
        )}
        {!isCircle && settings?.labelOff && (
          <span className="mkui-switch-off">{settings.labelOff}</span>
        )}
        <div className={cn(['mkui-switch-slider', value ? 'on' : 'off'])} />
      </label>
    </div>
  )
}
