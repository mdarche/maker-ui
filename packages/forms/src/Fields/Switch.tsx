import * as React from 'react'
import { Div, mergeSelectors, merge } from 'maker-ui'
import { useField } from 'formik'
import { InputProps } from '../types'

interface SwitchProps extends InputProps {}

const defaultSettings: SwitchProps['settings_switch'] = {
  innerLabel: true,
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
  settings_switch = {},
  ...props
}: SwitchProps) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  const settings = merge(defaultSettings, settings_switch)

  const padding = settings.padding as number
  const minWidth = (settings.height as number) * 4

  function handleKeyPress(e: React.KeyboardEvent<HTMLLabelElement>) {
    //@ts-ignore
    if (e.code !== 'Space') return
    e.preventDefault()
  }

  return (
    <Div
      className={mergeSelectors(['switch', meta.value ? 'active' : ''])}
      css={{
        position: 'relative',
        display: 'inline-block',
        input: {
          position: 'absolute',
          top: -5,
          left: -5,
          opacity: 0,
          outline: 0,
        },
        label: {
          position: 'relative',
          height: settings.height,
          width: minWidth,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden',
          cursor: 'pointer',
          borderRadius:
            settings.style === 'box' ? settings.borderRadius : settings.height,
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
            settings.style === 'circle'
              ? (settings.height as number) - padding * 2
              : undefined,
          borderRadius:
            settings.style === 'circle' ? '50%' : settings.borderRadius,
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
            background: settings.activeColor,
          },
        },
      }}>
      {id ? (
        <label
          className="switch-label"
          htmlFor={id}
          tabIndex={settings.disabled ? -1 : 1}
          onKeyDown={e => {
            handleKeyPress(e)
          }}>
          <input
            type="checkbox"
            {...field}
            id={id}
            disabled={settings.disabled}
          />
          {settings.innerLabel ? (
            <>
              <span className="switch-on">{settings?.labelOn}</span>
              <span className="switch-off">{settings?.labelOff}</span>
            </>
          ) : null}
          <div
            className={mergeSelectors([
              'switch-slider',
              meta.value ? 'on' : 'off',
            ])}
          />
        </label>
      ) : null}
    </Div>
  )
}
