import React, { useState, useEffect, useRef } from 'react'
import { cn, merge } from '@maker-ui/utils'
import { useField, useForm } from '@/hooks'
import { FieldInputProps, FieldProps, InputOption } from '@/types'
import {
  addIndexToOptions,
  containsValue,
  convertValue,
  formatOptions,
} from './helper'
import { ArrowIcon, CloseIcon } from '../../Icons'

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
 * @note The `initialValue` must be InputOption or InputOption[]
 * @todo Persist returnType `value` for multi page forms
 */
export const Select = ({ name }: FieldInputProps) => {
  const { settings: { validateFieldOnBlur } = {} } = useForm()
  const { field, error, value, setValue, validateField } = useField(name)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const options = formatOptions(field?.options)
  const settings = merge(defaultSettings, field?.select || {})
  const [state, setState] = useState({
    isOpen: false,
    searchText: '',
    highlightedIndex: -1,
    selectedOptions: value ? (Array.isArray(value) ? value : [value]) : [],
    touched: false,
  })
  const filteredOptions = addIndexToOptions(
    state.searchText?.length
      ? options
          .filter(({ label }) =>
            label.toLowerCase().includes(state.searchText.toLowerCase())
          )
          .filter(
            ({ value }) =>
              !state.selectedOptions.some(
                ({ value: selectedValue }) => selectedValue === value
              )
          )
      : options.filter(
          ({ value }) =>
            !state.selectedOptions.some(
              ({ value: selectedValue }) => selectedValue === value
            )
        )
  )
  const highlighted =
    state.highlightedIndex !== -1
      ? filteredOptions.find(({ index }) => index === state.highlightedIndex)
      : undefined
  const groups = [...new Set(filteredOptions.map((option) => option.group))]
  const classNames = settings?.classNames

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((s) => ({
      ...s,
      searchText: event.target.value,
      isOpen: true,
      highlightedIndex: -1,
      touched: true,
    }))
  }

  const handleOptionSelect = (option: InputOption) => {
    const exists = state.selectedOptions.find(
      ({ value }) => value === option.value
    )
    setState((s) => ({
      ...s,
      searchText: '',
      isOpen: false,
      selectedOptions:
        exists || option.disabled
          ? s.selectedOptions
          : settings?.multi
          ? settings?.max && s.selectedOptions.length === settings?.max
            ? [...s.selectedOptions.slice(0, -1), option]
            : [...s.selectedOptions, option]
          : [option],
    }))
  }

  const handleSelectClick = () => {
    setState((s) => ({
      ...s,
      isOpen: !s.isOpen,
      highlightedIndex: -1,
      touched: true,
    }))
  }

  const handleClear = (
    e: React.MouseEvent<HTMLButtonElement>,
    value?: string
  ) => {
    e.stopPropagation()
    setState((s) => ({
      ...s,
      selectedOptions: value
        ? s.selectedOptions.filter((option) => option.value !== value)
        : [],
      isOpen: false,
    }))
    ;(settings?.search ? inputRef : ref).current?.focus()
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>
  ) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        if (!state.isOpen) return
        setState((s) => ({
          ...s,
          highlightedIndex:
            (s.highlightedIndex - 1 + filteredOptions.length) %
            filteredOptions.length,
        }))
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!state.isOpen) return
        setState((s) => ({
          ...s,
          highlightedIndex: (s.highlightedIndex + 1) % filteredOptions.length,
        }))
        break
      case 'Enter':
        e.preventDefault()
        if (state.isOpen && filteredOptions.length === 1 && settings?.search) {
          handleOptionSelect(filteredOptions[0])
        } else if (
          state.isOpen &&
          filteredOptions.length > 0 &&
          state.highlightedIndex !== -1
        ) {
          setState((s) => ({ ...s, highlightedIndex: -1, isOpen: false }))
          if (highlighted) {
            handleOptionSelect(highlighted)
          }
        } else {
          setState((s) => ({ ...s, isOpen: !s.isOpen }))
        }
        break
      case 'Backspace':
      case 'Delete':
        if (state.selectedOptions.length && !state.searchText.length) {
          e.preventDefault()
          handleClear(
            e as any,
            state.selectedOptions[state.selectedOptions.length - 1].value
          )
        }
        break
      case 'Escape':
        e.preventDefault()
        setState((s) => ({ ...s, isOpen: false, highlightedIndex: -1 }))
        break
      default:
        break
    }
  }

  /**
   * Save value to the form provider
   */
  useEffect(() => {
    const vals = state.selectedOptions.length
      ? convertValue(settings.multi, settings.returnType, state.selectedOptions)
      : []
    setValue(vals)
    settings?.onChange?.(vals)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedOptions, settings.onChange])

  /**
   * Handle options scrollbox for keyboard navigation
   */
  useEffect(() => {
    if (optionsRef.current && state.highlightedIndex >= 0) {
      const items = Array.from(
        optionsRef.current.querySelectorAll('.mkui-select-option') || []
      )
      const item = items.find(
        (item) => item.getAttribute('value') === highlighted?.value
      )
      if (!item) return
      const rect = item.getBoundingClientRect()
      const listRect = optionsRef.current.getBoundingClientRect()
      const top = rect.top - listRect.top
      const bottom = rect.bottom - listRect.bottom
      if (top < 0) {
        optionsRef.current.scrollTop += top
      } else if (bottom > 0) {
        optionsRef.current.scrollTop += bottom
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.highlightedIndex])

  /**
   * Handle click outside of the select component
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle blur validation
      if (state.touched && validateFieldOnBlur) {
        validateField()
      }
      if (settings.hideOnBlur) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setState((s) => ({ ...s, isOpen: false }))
        }
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [
    ref,
    settings.hideOnBlur,
    state.touched,
    validateField,
    validateFieldOnBlur,
  ])

  return (
    <div
      id={`field-${name}`}
      ref={ref}
      className={cn([
        'mkui-select',
        error ? 'error' : undefined,
        classNames?.root,
      ])}
      onKeyDown={!settings?.search ? handleKeyDown : undefined}
      tabIndex={0}>
      <div
        className={cn(['mkui-select-control', classNames?.control])}
        onClick={handleSelectClick}>
        <div className={cn(['mkui-select-value-container'])}>
          {state.selectedOptions.map((option, i) => (
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
              ref={inputRef}
              className={cn(['mkui-select-search', classNames?.search])}
              type="text"
              value={state.searchText}
              onKeyDown={handleKeyDown}
              placeholder={
                !state.selectedOptions.length
                  ? field?.placeholder || 'Select an option'
                  : undefined
              }
              onChange={handleInputChange}
            />
          ) : !state.selectedOptions.length ? (
            <span className="placeholder">
              {field?.placeholder || 'Select an option'}
            </span>
          ) : null}
        </div>
        <div className="mkui-select-indicators">
          {state.searchText.length || state.selectedOptions.length ? (
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
      {state.isOpen && (
        <div
          ref={optionsRef}
          className={cn(['mkui-select-options', classNames?.options])}>
          {filteredOptions.length ? (
            groups.map((group, groupIndex) => {
              const groupOptions = filteredOptions.filter(
                (option) =>
                  option.group === group &&
                  !containsValue([option], state.selectedOptions)
              )
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
                      <span className="mkui-select-group-title">{group}</span>
                      <div className="mkui-select-group-count">
                        {groupOptions.length}
                      </div>
                    </div>
                  )}
                  <ul>
                    {groupOptions.map((option) => (
                      <li
                        id={option?.id}
                        key={option.value}
                        className={cn([
                          'mkui-select-option flex align-center',
                          state.highlightedIndex === option.index &&
                          !option.disabled
                            ? 'highlight'
                            : undefined,
                          classNames?.optionValue,
                          option?.className,
                          option?.disabled ? 'disabled' : '',
                        ])}
                        value={option.value}
                        onClick={
                          option?.disabled
                            ? undefined
                            : () => handleOptionSelect(option)
                        }>
                        {option.icon || null}
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })
          ) : state.searchText.length && field?.select?.creatable ? (
            <button
              className="mkui-select-option naked"
              onClick={() =>
                handleOptionSelect({
                  label: state.searchText,
                  value: state.searchText,
                })
              }>
              Create "{state.searchText}"
            </button>
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
