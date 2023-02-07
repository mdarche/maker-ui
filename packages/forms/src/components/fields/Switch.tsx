import * as React from 'react'
import { cn, merge } from '@maker-ui/utils'

import { useField } from '@/hooks'
import type { FieldInputProps, SwitchSettings } from '@/types'

const defaultSettings: SwitchSettings = {
  inner_label: false,
  label_on: 'Yes',
  label_off: 'No',
  color_active: '#1cbf1c',
  color_muted: '#adadad',
  disabled: false,
  height: 40,
  padding: 4,
  border_radius: 3,
  style: 'box',
}

/**
 * The `Switch` component is a custom boolean form field that simulates
 * the iOS switch Switch.
 */

export const Switch = ({ name }: FieldInputProps) => {
  const { field, value, setValue } = useField(name)
  const config = merge(defaultSettings, field?.switch || {})
  // const hasError = !!error

  // const padding = config.padding as number
  // const minWidth =
  //   config.style === 'box' ? config.height * 4 : config.height * 2 - padding * 2

  function handleKeyPress(e: React.KeyboardEvent<HTMLLabelElement>) {
    if (e.code !== 'Space') return
    e.preventDefault()
  }
  return (
    <div
      className={cn(['mkui-switch', value ? 'active' : ''])}
      aria-labelledby={`${name}-label`}>
      <label
        className="mkui-switch-label"
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
        {config.inner_label ? (
          <>
            <span className="mkui-switch-on">{config?.label_on}</span>
            <span className="mkui-switch-off">{config?.label_off}</span>
          </>
        ) : null}
        <div className={cn(['mkui-switch-slider', value ? 'on' : 'off'])} />
      </label>
    </div>
  )
}
