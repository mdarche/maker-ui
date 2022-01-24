import * as React from 'react'
import { Div, mergeSelectors, merge } from 'maker-ui'
import { useField } from 'formik'
import { InputProps, FieldSettings } from '../types'

interface SwitchProps extends InputProps {
  settings: FieldSettings<'switch'>
}

const defaultSettings: FieldSettings<'switch'> = {
  innerLabel: false,
  labelOn: 'Yes',
  labelOff: 'No',
  activeColor: 'blue',
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
  ...props
}: SwitchProps) => {
  const [field, meta] = useField({ ...props, name, type: 'checkbox' })
  const config = merge(defaultSettings, settings)

  const padding = config.padding as number
  const minWidth = (config.height as number) * 4

  function handleKeyPress(e: React.KeyboardEvent<HTMLLabelElement>) {
    //@ts-ignore
    if (e.code !== 'Space') return
    e.preventDefault()
  }

  return (
    <Div
      className={mergeSelectors(['switch', meta.value ? 'active' : ''])}
      aria-labelledby={`${name}-label`}
      css={{
        position: 'relative',
        display: 'inline-block',
        input: {
          position: 'absolute',
          top: -5,
          left: -5,
          opacity: 0,
          outline: 0,
          zIndex: 100,
        },
        label: {
          position: 'relative',
          height: config.height,
          width: minWidth,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden',
          cursor: 'pointer',
          borderRadius:
            config.style === 'box' ? config.borderRadius : config.height,
          padding: '1px 5px',
          transition: 'all ease .3s',
          background: settings.inactiveColor,
          outline: 0,
        },
        '.switch-slider': {
          display: 'block',
          position: 'absolute',
          bottom: padding,
          top: padding,
          background: '#fff',
          zIndex: 1,
          height: `calc(100% - ${padding * 2}px)`,
          width:
            config.style === 'circle'
              ? (config.height as number) - padding * 2
              : undefined,
          borderRadius: config.style === 'circle' ? '50%' : config.borderRadius,
          left: padding,
          right: '50%',
          transition: 'all ease 0.3s',
          transitionProperty: 'left, right',
          '&.on': {
            left: '50%',
            right: padding,
          },
        },
        '&.active': {
          label: {
            background: config.activeColor,
          },
        },
      }}>
      <label
        className="switch-label"
        htmlFor={id || name}
        tabIndex={config.disabled ? -1 : 1}
        onKeyDown={(e) => {
          handleKeyPress(e)
        }}>
        <input
          id={id || name}
          type="checkbox"
          data-cy={cy}
          {...field}
          disabled={config.disabled}
        />
        {config.innerLabel ? (
          <>
            <span className="switch-on">{config?.labelOn}</span>
            <span className="switch-off">{config?.labelOff}</span>
          </>
        ) : null}
        <div
          className={mergeSelectors([
            'switch-slider',
            meta.value ? 'on' : 'off',
          ])}
        />
      </label>
    </Div>
  )
}
