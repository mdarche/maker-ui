import React, { useState, useEffect, useRef } from 'react'
import { useField } from '@/hooks'
import { FieldInputProps, InputOption } from '@/types'
import { cn } from '@maker-ui/utils'

function formatOptions(
  options?: InputOption[] | { [key: string]: string }
): InputOption[] {
  if (!options) return []
  if (options && Array.isArray(options) && options.length) {
    return options
  }

  return Object.entries(options).map(([key, value]) => ({
    label: value,
    value: key,
  }))
}

// Select and Select-search
export const Select = ({ name }: FieldInputProps) => {
  const { field, error, setValue, validateField } = useField(name)
  const options = formatOptions(field?.options)
  const [selectedOptions, setSelectedOptions] = useState<InputOption[]>([])
  const [textValue, setTextValue] = useState<string>('')
  const selectRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    // Filter options based on search term
    const options = selectRef.current?.options

    if (options) {
      for (let i = 0; i < options.length; i++) {
        const option = options[i]
        const label = option.textContent?.toLowerCase()

        if (label && label.includes(textValue.toLowerCase())) {
          option.style.display = ''
        } else {
          option.style.display = 'none'
        }
      }
    }
  }, [textValue])

  const handleOptionClick = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options
    const selectedOptions = []

    for (let i = 0; i < options.length; i++) {
      const option = options[i]

      if (option.selected) {
        selectedOptions.push({ value: option.value, label: option.label })
      }
    }

    setSelectedOptions(selectedOptions)
    setValue(selectedOptions)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value)
  }

  const attrs = {
    ref: selectRef,
    multiple: field?.select?.multi || undefined,
    onChange: handleOptionClick,
  }

  return (
    <div className={cn(['mkui-select'])}>
      {field?.select?.search || field?.select?.creatable ? (
        <input type="text" value={textValue} onChange={handleTextChange} />
      ) : null}
      <select {...attrs}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {field?.select?.creatable && <option key="newopt">{}</option>}
      </select>
    </div>
  )
}
