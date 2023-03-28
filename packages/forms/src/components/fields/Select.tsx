import React, { useState, useEffect } from 'react'
import { cn } from '@maker-ui/utils'
import { useField } from '@/hooks'
import { FieldInputProps, InputOption } from '@/types'
import { ArrowIcon, CloseIcon } from '../Icons'

function convertToKey(input: string): string {
  const cleanedInput = input.replace(/[^a-zA-Z0-9\s]/g, '').trim()
  const key = cleanedInput.replace(/\s+/g, '-')
  return key
}

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
  // Local state for search input and keyboard mgmt
  const [isOpen, setIsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [selectedOptions, setSelectedOptions] = useState<InputOption[]>([])
  const classNames = field?.select?.classNames
  const filteredOptions = searchText?.length
    ? options.filter(
        ({ label }) =>
          typeof label === 'string' &&
          label.toLowerCase().includes(searchText.toLowerCase())
      )
    : options
  const groups = [...new Set(filteredOptions.map((option) => option.group))]

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
    setIsOpen(true)
    setHighlightedIndex(-1)
  }

  const handleOptionSelect = (option: InputOption) => {
    setSearchText('')
    setSelectedOptions((s) => [...s, option])
    setIsOpen(false)
  }

  const handleSelectClick = () => {
    setIsOpen(!isOpen)
  }

  const handleClear = () => {
    setSelectedOptions([])
    setIsOpen(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        setHighlightedIndex(
          (highlightedIndex - 1 + filteredOptions.length) %
            filteredOptions.length
        )
        break
      case 'ArrowDown':
        event.preventDefault()
        setHighlightedIndex((highlightedIndex + 1) % filteredOptions.length)
        break
      case 'Enter':
        event.preventDefault()
        if (filteredOptions.length > 0 && highlightedIndex !== -1) {
          const selectedOption = filteredOptions[highlightedIndex]
          handleOptionSelect(selectedOption)
          setIsOpen(false)
          setHighlightedIndex(-1)
        }
        break
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
      default:
        break
    }
  }

  return (
    <div
      id={`field-${name}`}
      className={cn(['mkui-select', classNames?.root])}
      onKeyDown={handleKeyDown}
      tabIndex={0}>
      <div
        className={cn(['mkui-select-control', classNames?.control])}
        onClick={handleSelectClick}>
        <div className={cn(['mkui-select-value-container'])}>
          {selectedOptions.length ? (
            <div className={cn(['mkui-select-value'])}>
              {/* <div className={cn(['mkui-select-value-label'])}>
                {selectedOptions.map((option) => option.label).join(', ')}
              </div> */}
            </div>
          ) : null}
          {field?.select?.search || field?.select?.creatable ? (
            <input
              className={cn(['mkui-select-search', classNames?.search])}
              type="text"
              value={searchText}
              placeholder={field?.placeholder || 'Select an option'}
              onChange={handleInputChange}
            />
          ) : !selectedOptions.length ? (
            <span className="placeholder">
              {field?.placeholder || 'Select an option'}
            </span>
          ) : null}
        </div>
        <div className="mkui-select-indicators">
          {searchText.length || selectedOptions.length ? (
            <div
              className={cn(['mkui-select-clear', classNames?.clear])}
              onClick={handleClear}>
              <CloseIcon />
            </div>
          ) : null}
          <div className={cn(['mkui-select-arrow', classNames?.arrow])}>
            <ArrowIcon />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={cn(['mkui-select-options', classNames?.options])}>
          {filteredOptions.length ? (
            groups.map((group, i) => {
              const filteredGroupOptions = filteredOptions.filter(
                (option) => option.group === group || !option.group
              )
              return (
                <div key={`${group}-${i}`} className={classNames?.group}>
                  {group && (
                    <div
                      className={cn([
                        'mkui-group-label flex align-center justify-between',
                        classNames?.groupLabel,
                      ])}>
                      <span>{group}</span>
                      <div className="group-count"></div>
                    </div>
                  )}
                  <ul>
                    {filteredGroupOptions.map((option) => (
                      <li
                        key={option.value}
                        className={cn([
                          'mkui-select-option',
                          classNames?.optionValue,
                          option?.disabled ? 'disabled' : '',
                        ])}
                        value={option.value}
                        onClick={
                          option?.disabled
                            ? undefined
                            : () => handleOptionSelect(option)
                        }>
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })
          ) : searchText.length && field?.select?.creatable ? (
            <li
              onClick={() =>
                handleOptionSelect({
                  label: searchText,
                  value: convertToKey(searchText),
                })
              }>
              Create "{searchText}"
            </li>
          ) : (
            <li>No options found</li>
          )}
        </div>
      )}
    </div>
  )
}
