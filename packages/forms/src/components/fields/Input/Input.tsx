import React, { useDeferredValue, useEffect, useState } from 'react'
import { merge, cn, Conditional } from '@maker-ui/utils'

import { useField, useForm } from '@/hooks'
import type { FieldInputProps, FieldProps } from '@/types'
import { HideIcon, RevealIcon } from '../../Icons'

const passwordSettings: FieldProps['password'] = {
  iconHide: <HideIcon />,
  iconReveal: <RevealIcon />,
  toggleCharacters: true,
}

export const Input = ({ name }: FieldInputProps) => {
  const { settings } = useForm()
  const { field, error, value, setValue, validateField } = useField(name)
  const [inputValue, setInputValue] = useState(value)
  const deferredValue = useDeferredValue(inputValue)
  const [showPass, setShowPass] = useState(false)

  const isPass = !!(
    field?.type === 'password' && field?.password?.toggleCharacters
  )
  const ps = isPass ? merge(passwordSettings, field?.password || {}) : undefined

  const el = field?.type === 'textarea' ? 'textarea' : 'input'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (deferredValue === inputValue) {
      setValue(deferredValue, true)
    }
  }, [deferredValue])

  const attrs = {
    id: `field-${field?.name}`,
    name: field?.name,
    placeholder: field?.placeholder,
    className: cn(['mkui-input', error ? 'error' : undefined]),
    type: isPass && showPass ? 'text' : field?.type,
    value: inputValue,
    onChange: handleChange,
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
      trueWrapper={(children) => (
        <div className="mkui-password-wrapper">
          {children}
          <button
            className="mkui-btn-password"
            type="button"
            onClick={() => setShowPass(!showPass)}>
            {showPass ? ps?.iconHide : ps?.iconReveal}
          </button>
        </div>
      )}>
      {React.createElement(el, attrs)}
    </Conditional>
  )
}
