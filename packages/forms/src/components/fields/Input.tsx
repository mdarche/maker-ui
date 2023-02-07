import React, { useState } from 'react'
import { merge, cn, Conditional } from '@maker-ui/utils'

import { useField, useForm } from '@/hooks'
import { FieldInputProps, FieldProps } from '@/types'
import { HideIcon, RevealIcon } from '../Icons'

const passwordSettings: FieldProps['password'] = {
  hideIcon: <HideIcon />,
  revealIcon: <RevealIcon />,
  toggleCharacters: true,
}

export const Input = ({ name }: FieldInputProps) => {
  const { fields, settings } = useForm()
  const { field, error, value, setValue, validateField } = useField(name)
  const [showPass, setShowPass] = useState(false)

  const isPass = !!(
    field?.type === 'password' && field?.password?.toggleCharacters
  )
  const ps = isPass ? merge(passwordSettings, field?.password || {}) : undefined

  console.log('Fields are', fields)
  const el = field?.type === 'textarea' ? 'textarea' : 'input'
  const attrs = {
    id: `field-${field?.name}`,
    name: field?.name,
    className: cn(['mkui-input', error ? 'error' : undefined]),
    type: isPass && showPass ? 'text' : field?.type,
    value,
    onChange: (e: any) => setValue(e.target.value, true),
    onBlur: settings?.validateFieldOnBlur ? () => validateField() : undefined,
    ...(field?.type === 'range' && {
      min: field?.range?.min,
      max: field?.range?.max,
    }),
    ...(field?.inputProps || {}),
  }

  return (
    <Conditional
      condition={isPass}
      wrapper={(children) => (
        <div className="mkui-password-wrapper">
          {children}
          <button
            className="mkui-btn-password"
            type="button"
            onClick={() => setShowPass(!showPass)}>
            {showPass ? ps?.hideIcon : ps?.revealIcon}
          </button>
        </div>
      )}>
      {React.createElement(el, attrs)}
    </Conditional>
  )
}
