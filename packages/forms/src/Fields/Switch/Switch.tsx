import * as React from 'react'
import { Div } from '@maker-ui/primitives'
import { mergeSelectors, merge } from '@maker-ui/utils'
import { useField } from 'formik'
import type { InputProps, SwitchSettings } from '../../types'
import styles from './Switch.styles'

interface SwitchProps extends InputProps {
  settings: SwitchSettings
}

const defaultSettings: SwitchSettings = {
  innerLabel: false,
  labelOn: 'Yes',
  labelOff: 'No',
  activeColor: '#1cbf1c',
  inactiveColor: '#adadad',
  disabled: false,
  height: 40,
  padding: 4,
  borderRadius: 3,
  style: 'box',
}

/**
 * The `Switch` component is a custom boolean form field that simulates
 * the iOS switch Switch.
 */

export const Switch = ({
  id,
  type,
  name,
  settings = {},
  cy,
  hasError,
  ...props
}: SwitchProps) => {
  const [field, { value }, { setValue }] = useField(name)
  const config = merge(defaultSettings, settings)

  const padding = config.padding as number
  const minWidth =
    config.style === 'box' ? config.height * 4 : config.height * 2 - padding * 2

  function handleKeyPress(e: React.KeyboardEvent<HTMLLabelElement>) {
    //@ts-ignore
    if (e.code !== 'Space') return
    e.preventDefault()
  }

  console.log('Current Switch value is', value)

  return (
    <Div
      className={mergeSelectors(['switch', value ? 'active' : ''])}
      aria-labelledby={`${name}-label`}
      css={merge(
        {
          label: {
            height: config.height,
            width: minWidth,
            borderRadius:
              config.style === 'box' ? config.borderRadius : config.height,
            background: config.inactiveColor,
          },
          '.switch-slider': {
            bottom: padding,
            top: padding,
            height: `calc(100% - ${padding * 2}px)`,
            width:
              config.style === 'circle'
                ? (config.height as number) - padding * 2
                : undefined,
            borderRadius:
              config.style === 'circle'
                ? '50%'
                : config.innerBorderRadius || config.borderRadius,
            left: padding,
            '&.on': {
              right: padding,
            },
          },
          '&.active': {
            label: {
              background: config.activeColor,
            },
          },
        },
        styles as object
      )}>
      <label
        className="switch-label"
        htmlFor={id || name}
        tabIndex={config.disabled ? -1 : 1}
        onKeyDown={(e) => {
          handleKeyPress(e)
        }}>
        {/* @ts-ignore */}
        <input
          id={id || name}
          type="checkbox"
          name={name}
          data-cy={cy}
          value={value}
          onClick={() => setValue(!value)}
          {...props}
          disabled={config.disabled}
        />
        {config.innerLabel ? (
          <>
            <span className="switch-on">{config?.labelOn}</span>
            <span className="switch-off">{config?.labelOff}</span>
          </>
        ) : null}
        <div
          className={mergeSelectors(['switch-slider', value ? 'on' : 'off'])}
        />
      </label>
    </Div>
  )
}
