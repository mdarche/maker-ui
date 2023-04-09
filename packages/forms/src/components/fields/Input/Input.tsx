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
  const { settings, resetCount } = useForm()
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

  /**
   * Handle local state on form reset
   */
  useEffect(() => {
    if (resetCount > 0) {
      setInputValue(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCount])

  /**
   * Handle form input speed by saving via deferred value in the background
   */
  useEffect(() => {
    if (deferredValue === inputValue) {
      setValue(deferredValue, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredValue])

  const attrs = {
    id: `field-${field?.name}`,
    name: field?.name,
    placeholder: field?.placeholder,
    className: cn([
      el === 'textarea' ? 'mkui-textarea' : 'mkui-input',
      error ? 'error' : undefined,
    ]),
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
