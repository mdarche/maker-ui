import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { useField } from '@/context'
import { FieldInputProps } from '@/types'
import { formatOptions } from '../Select/helper'

// For the radio and checkbox input components
// TODO add setting for vertical options + columns

export const Options = ({ name }: FieldInputProps) => {
  const { field, value, error, setValue } = useField(name)
  const options = formatOptions(field?.options)

  const isRadio = field?.type === 'radio'
  const attrs = {
    role: !isRadio ? 'group' : undefined,
    'aria-labelledby': `${name}-group`,
    className: cn(['mkui-option-group', error ? 'error' : undefined]),
  }

  const handleCheckboxChange = (optionValue: string) => {
    if (Array.isArray(value)) {
      if (value.includes(optionValue)) {
        setValue(value.filter((v) => v !== optionValue))
      } else {
        setValue([...value, optionValue])
      }
    } else {
      setValue([optionValue])
    }
  }

  const isChecked = (optionValue: string) => {
    if (isRadio) return undefined
    return Array.isArray(value) && value.includes(optionValue)
  }

  return (
    <div {...attrs}>
      {field &&
        options?.map((o) => {
          const id = `${name}-${o.value}`
          return (
            <div
              className="mkui-option-wrapper flex align-center"
              key={o.value}>
              <input
                type={field.type}
                {...{
                  id,
                  className: isRadio ? 'mkui-radio' : 'mkui-checkbox',
                  checked: isChecked(o.value),
                  name: isRadio ? name : id,
                  disabled: o.disabled,
                  value: o.value,
                  onChange: () =>
                    isRadio ? setValue(o.value) : handleCheckboxChange(o.value),
                  ...(field.inputProps || {}),
                }}
              />
              <label htmlFor={id}>{o.label}</label>
              <br />
            </div>
          )
        })}
    </div>
  )
}
