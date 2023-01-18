import React, { useState } from 'react'
import { merge, cn, Conditional } from '@maker-ui/utils'

import { useField, useForm } from '@/hooks'
import { FieldProps } from '@/types'
import { HideIcon, RevealIcon } from './Icons'

const passwordSettings: FieldProps['password'] = {
  hideIcon: <HideIcon />,
  revealIcon: <RevealIcon />,
  toggleCharacters: true,
}

interface InputProps {
  name: string
}

export const Input = ({ name }: InputProps) => {
  const { settings } = useForm()
  const { field, error, value, setValue, validateField } = useField(name)
  const [showPass, setShowPass] = useState(false)

  const isPass = !!(
    field?.type === 'password' && field?.password?.toggleCharacters
  )
  const s = isPass ? merge(passwordSettings, field?.password || {}) : undefined

  const el = field?.type === 'textarea' ? 'textarea' : 'input'
  const attrs = {
    id: field?.name,
    name: field?.name,
    className: cn(['mkui_input', error ? 'error' : undefined]),
    type: isPass && showPass ? 'text' : field?.type,
    value,
    onChange: (e: any) => setValue(e.target.value, true),
    onBlur: settings?.validateFieldOnBlur ? () => validateField() : undefined,
    ...(field?.type === 'range' ? { min: field?.min, max: field?.max } : {}),
    ...(field?.inputProps || {}),
  }

  return (
    <Conditional
      condition={isPass}
      wrapper={(children) => (
        <div className="mkui_password_wrapper">
          {children}
          <button
            className="mkui_btn_password"
            type="button"
            onClick={() => setShowPass(!showPass)}>
            {showPass ? s?.hideIcon : s?.revealIcon}
          </button>
        </div>
      )}>
      {React.createElement(el, attrs)}
    </Conditional>
  )
}
