import React, { useDeferredValue, useEffect, useState } from 'react'
import { merge, cn, Conditional } from '@maker-ui/utils'

import { useField, useForm } from '@/context'
import { HideIcon, RevealIcon } from '../../Icons'
import { formatNumber, maskString } from './mask'
import type { FieldInputProps, FieldProps } from '@/types'

const passSettings: FieldProps['password'] = {
  iconHide: <HideIcon />,
  iconReveal: <RevealIcon />,
  toggle: false,
}

export const Input = ({ name }: FieldInputProps) => {
  const { settings, resetCount } = useForm()
  const { field, error, value, setValue, validateField, setTouched } =
    useField(name)
  const [inputValue, setInputValue] = useState<string>(value)
  const [showPass, setShowPass] = useState(false)
  const deferredValue = useDeferredValue(inputValue)

  const isPass = field?.type === 'password'
  const ps = isPass ? merge(passSettings, field?.password || {}) : undefined
  const el = field?.type === 'textarea' ? 'textarea' : 'input'
  const isFormatted = !!field?.text?.format

  function format(v: string) {
    if (field?.type === 'number' && value === 0) return ''
    if (!isFormatted) return v
    if (typeof field?.text?.format === 'function') {
      return field?.text?.format(v)
    }
    return maskString(v, field?.text?.format!)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFormatted) {
      setInputValue(
        field?.text?.returnFormatted
          ? e.target.value
          : e.target.value.replace(
              field?.text?.format === 'currency' ? /[\s,\-()]/g : /[\s,.\-()]/g,
              ''
            )
      )
    } else {
      setInputValue(e.target.value)
    }
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
      setValue(deferredValue)
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
    value: format(inputValue),
    onChange: handleChange,
    onBlur: () => {
      setTouched()
      if (field?.text?.format === 'currency') {
        setInputValue(formatNumber(inputValue, field?.type === 'text'))
      }
      if (settings?.validateFieldOnBlur) {
        validateField()
      }
    },
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
          {ps?.toggle && (
            <button
              className={cn([
                'mkui-btn-password',
                ps?.absolute ? 'absolute' : undefined,
                ps?.className,
              ])}
              type="button"
              onClick={() => setShowPass(!showPass)}>
              {showPass ? ps?.iconHide : ps?.iconReveal}
            </button>
          )}
        </div>
      )}>
      {field?.text?.prepend || field?.text?.append ? (
        <div className="mkui-input-wrapper">
          {field?.text?.prepend}
          {React.createElement(el, attrs)}
          {field?.text?.append}
        </div>
      ) : (
        React.createElement(el, attrs)
      )}
    </Conditional>
  )
}
