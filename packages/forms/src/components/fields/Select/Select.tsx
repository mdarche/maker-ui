import React, { useState, useEffect, useRef } from 'react'
import { cn, merge } from '@maker-ui/utils'
import { useField } from '@/hooks'
import { FieldInputProps, FieldProps, InputOption } from '@/types'
import { ArrowIcon, CloseIcon } from '../../Icons'
import { containsValue, convertValue, formatOptions } from './helper'

const defaultSettings: FieldProps['select'] = {
  multi: false,
  search: true,
  creatable: false,
  returnType: 'object',
  hideOnBlur: true,
}

/**
 * Renders a select field with optional search and multi-select capabilities
 *
 * @note The initial value must be InputOption or InputOption[] for select
 * @todo Persist returnType `value` for multi page forms
 */
export const Select = ({ name }: FieldInputProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { field, error, value, setValue, validateField } = useField(name)
  const options = formatOptions(field?.options)
  const settings = merge(defaultSettings, field?.select || {})
  // Local state for search input and keyboard mgmt
  const [isOpen, setIsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [selectedOptions, setSelectedOptions] = useState<InputOption[]>(
    value ? (Array.isArray(value) ? value : [value]) : []
  )
  const classNames = settings?.classNames
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

  const handleClear = (
    e: React.MouseEvent<HTMLButtonElement>,
    value?: string
  ) => {
    e.stopPropagation()
    if (value) {
      setSelectedOptions((s) => s.filter((option) => option.value !== value))
    } else {
      setSelectedOptions([])
    }
    ref.current?.focus()
    setIsOpen(false)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>
  ) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(
          (highlightedIndex - 1 + filteredOptions.length) %
            filteredOptions.length
        )
        break
      case 'ArrowDown':
        console.log('here')
        e.preventDefault()
        setHighlightedIndex((highlightedIndex + 1) % filteredOptions.length)
        break
      case 'Enter':
        e.preventDefault()
        if (filteredOptions.length > 0 && highlightedIndex !== -1) {
          const selectedOption = filteredOptions[highlightedIndex]
          handleOptionSelect(selectedOption)
          setIsOpen(false)
          setHighlightedIndex(-1)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
      default:
        break
    }
  }

  /**
   * Save value to the form provider
   */
  useEffect(() => {
    if (selectedOptions.length) {
      setValue(
        convertValue(settings.multi, settings.returnType, selectedOptions)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions])

  return (
    <div
      id={`field-${name}`}
      ref={ref}
      className={cn(['mkui-select', classNames?.root])}
      onKeyDown={handleKeyDown}
      tabIndex={0}>
      <div
        className={cn(['mkui-select-control', classNames?.control])}
        onClick={handleSelectClick}>
        <div className={cn(['mkui-select-value-container'])}>
          {selectedOptions.map((option, i) => (
            <div
              key={option.value}
              className={cn(['mkui-select-value selected', option?.className])}>
              {option.label}
              <button
                className="mkui-select-value-clear naked"
                onClick={(e) => handleClear(e, option.value)}>
                <CloseIcon style={{ height: 8 }} />
              </button>
            </div>
          ))}
          {settings?.search || settings?.creatable ? (
            <input
              className={cn(['mkui-select-search', classNames?.search])}
              type="text"
              value={searchText}
              onKeyDown={handleKeyDown}
              placeholder={
                !selectedOptions.length
                  ? field?.placeholder || 'Select an option'
                  : undefined
              }
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
            <button
              className={cn(['mkui-select-clear naked', classNames?.clear])}
              onClick={(e) => handleClear(e)}>
              <CloseIcon />
            </button>
          ) : null}
          <div className={cn(['mkui-select-arrow', classNames?.arrow])}>
            <ArrowIcon />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={cn(['mkui-select-options', classNames?.options])}>
          {filteredOptions.length ? (
            groups.map((group, groupIndex) => {
              const groupOptions = filteredOptions.filter(
                (option) =>
                  option.group === group &&
                  !containsValue([option], selectedOptions)
              )
              const groupCount = groupOptions.length
              return (
                <div
                  key={`${group}-${groupIndex}`}
                  className={cn(['mkui-select-group', classNames?.group])}>
                  {group && (
                    <div
                      className={cn([
                        'mkui-group-label flex align-center justify-between',
                        classNames?.groupLabel,
                      ])}>
                      <span>{group}</span>
                      <div className="group-count">{groupCount}</div>
                    </div>
                  )}
                  <ul>
                    {groupOptions.map((option, optionIndex) => (
                      <li
                        id={option?.id}
                        key={option.value}
                        className={cn([
                          'mkui-select-option',
                          classNames?.optionValue,
                          option?.className,
                          // Need to figure this out
                          // highlightedIndex === optionIndex ? 'highlighted' : '',
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
            <div
              className="mkui-select-option"
              onClick={() =>
                handleOptionSelect({
                  label: searchText,
                  value: searchText,
                })
              }>
              Create "{searchText}"
            </div>
          ) : (
            <div className="mkui-select-option flex justify-center">
              No options
            </div>
          )}
        </div>
      )}
    </div>
  )
}
