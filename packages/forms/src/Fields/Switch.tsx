import * as React from 'react'
import { Div, mergeSelectors } from 'maker-ui'
import { useField } from 'formik'
import { InputProps } from '../types'

interface SwitchProps extends InputProps {}

const initialProps = {
  innerLabel: false,
  labels: ['Yes', 'No'],
  activeColor: 'blue',
  inactiveColor: '#adadad',
  disabled: false,
}

/**
 * The `Switch` component is a custom boolean form field that simulates
 * the iOS switch Switch.
 */

export const Switch = ({
  id,
  type,
  settings_switch = initialProps,
  ...props
}: SwitchProps) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })

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
        width: 75,
        input: { opacity: 0 },
        label: {
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
          borderRadius: 30,
          margin: 0,
          minWidth: 75,
          minHeight: 40,
          padding: '1px 5px',
          transition: 'all ease .3s',
          background: settings_switch.inactiveColor,
          outline: 'none',
        },
        '.switch-inner': {
          display: 'block',
          background: '#fff',
          height: 30,
          width: 30,
          borderRadius: '50%',
          outline: 'none',
          transition: 'transform ease 0.3s',
        },
        '&.active': {
          label: {
            background: settings_switch.activeColor,
          },
          '.switch-inner': {
            transform: 'translateX(calc(5px + 100%))',
          },
        },
      }}>
      <input
        type="checkbox"
        {...field}
        id={id}
        disabled={settings_switch.disabled}
      />
      {id ? (
        <label
          className="switch-label"
          htmlFor={id}
          tabIndex={settings_switch.disabled ? -1 : 1}
          onKeyDown={e => {
            handleKeyPress(e)
          }}>
          <span
            className={mergeSelectors([
              settings_switch.disabled ? 'switch-disabled' : '',
              'switch-inner',
            ])}
            data-yes={
              settings_switch.labels ? settings_switch.labels[0] : 'Yes'
            }
            data-no={settings_switch.labels ? settings_switch.labels[1] : 'No'}
            tabIndex={-1}
          />
          <span className="switch" tabIndex={-1} />
        </label>
      ) : null}
    </Div>
  )
}
