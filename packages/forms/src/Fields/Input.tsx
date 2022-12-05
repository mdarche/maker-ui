import React, { useState } from 'react'
import { Field as FormikField } from 'formik'
import type { InputProps, PasswordSettings } from '../types'
import { Div } from '@maker-ui/primitives'
import { merge, Conditional } from '@maker-ui/utils'
import { HideIcon, RevealIcon } from '../Icons'

const defaultSettings: PasswordSettings = {
  hideIcon: <HideIcon />,
  revealIcon: <RevealIcon />,
  toggleCharacters: true,
  padding: 10,
}

interface TextProps extends InputProps {
  settings?: PasswordSettings
}

export const Input = ({
  id,
  name,
  type,
  hasError,
  settings,
  cy,
  ...props
}: TextProps) => {
  // Handle Password Toggle
  const [showPass, setShowPass] = useState(false)
  const isPass =
    type === 'password' && settings?.toggleCharacters ? true : false
  const s = isPass && settings ? merge(defaultSettings, settings) : undefined

  return (
    <Conditional
      condition={isPass}
      wrapper={(children) => (
        <Div
          className="input-wrapper"
          css={{
            position: 'relative',
            display: 'flex',
            input: { width: '100%' },
            button: {
              position: 'absolute',
              right: s?.padding,
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'none',
            },
          }}>
          {children}
          <button
            className="btn-password"
            type="button"
            onClick={() => setShowPass(!showPass)}>
            {showPass ? s?.hideIcon : s?.revealIcon}
          </button>
        </Div>
      )}>
      <FormikField
        id={id || name}
        name={name}
        data-cy={cy}
        as={type === 'textarea' ? 'textarea' : 'input'}
        className={hasError ? 'error' : undefined}
        type={isPass && showPass ? 'text' : type}
        {...props}
      />
    </Conditional>
  )
}
