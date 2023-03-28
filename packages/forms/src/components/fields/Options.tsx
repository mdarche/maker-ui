import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useField } from 'src/hooks/useForm'
import { FieldInputProps } from '@/types'

// For the radio and checkbox input components
// TODO add setting for vertical options + columns

export const Options = ({ name }: FieldInputProps) => {
  const { field, error, setValue } = useField(name)
  // TODO use value to set active className
  return (
    <div
      role="group"
      aria-labelledby={`${name}-group`}
      className={cn(['mkui-option-input', error ? 'error' : undefined])}>
      {Array.isArray(field?.options)
        ? field?.options?.map((o) => (
            <label key={o.value}>
              {React.createElement(field.type, {
                id: o.id,
                name,
                className: o.className,
                disabled: o.disabled,
                value: o.value || o.label,
                onChange: () => setValue(o.value),
                ...(field.inputProps || {}),
              })}
              {o?.label}
            </label>
          ))
        : field?.options && typeof field.options === 'object'
        ? Object.keys(field.options).map((k) => (
            <label key={k}>
              {React.createElement(field.type, {
                name,
                value: k,
                onChange: () => setValue(k),
                ...(field.inputProps || {}),
              })}
              {/* @ts-ignore */}
              {field.options[k]}
            </label>
          ))
        : null}
    </div>
  )
}
