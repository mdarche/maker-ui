import React, { useState } from 'react'
import { useField } from 'formik'
import { default as ReactSelect } from 'react-select'
import { default as CreatableSelect } from 'react-select/creatable'
import type { InputProps, SelectSettings } from '../types'
import { merge } from '@maker-ui/utils'

interface SelectProps extends InputProps {
  settings: SelectSettings
  onBlur?: () => void
}

const creatableInputProps = {
  components: { DropdownIndicator: null },
  isMulti: true,
  isClearable: true,
  menuIsOpen: false,
}

const defaults = {
  isCreatable: false,
  isCreatableInput: false,
  isSearchable: true,
  isClearable: true,
  isMulti: false,
  classNamePrefix: 'maker-ui',
}

const createOption = (label: string) => ({
  label,
  value: label,
})

// TODO CY prop does not work

export const Select = ({
  id,
  name,
  hasError,
  settings,
  onBlur,
  cy,
}: SelectProps) => {
  const [state, setState] = useState({
    inputValue: '',
    value: [] as { label: string; value: string }[],
  })
  const mergedProps: SelectSettings = merge(defaults, {
    ...merge(settings, settings.isCreatableInput ? creatableInputProps : {}),
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, { setValue, setTouched }] = useField({
    name,
    type: 'file',
  })

  function handleChange(value?: any) {
    console.log('here', value)
    // Todo optional convert return value into a string with delimeter
    if (settings.isCreatableInput) {
      setState({ value, inputValue: '' })
    } else {
      setValue(value)
    }
  }

  function handleInputChange(inputValue: string) {
    setState({ ...state, inputValue })
  }

  function handleBlur() {
    setTouched(true)
    // Handle autosave
    if (onBlur) {
      onBlur()
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const { inputValue, value } = state
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        const newValue = [...(value || []), createOption(inputValue)]
        setState({
          inputValue: '',
          value: newValue,
        })
        setValue(newValue)
        event.preventDefault()
    }
  }

  const attributes = {
    inputId: id,
    name,
    className: hasError ? 'error' : undefined,
    onChange: handleChange,
    onBlur: handleBlur,
    ...mergedProps,
    ...(settings.isCreatableInput
      ? {
          onKeyDown: handleKeyDown,
          onInputChange: handleInputChange,
          inputValue: state.inputValue,
          value: state.value,
        }
      : undefined),
  }

  return settings.isCreatable || settings.isCreatableInput ? (
    <CreatableSelect {...attributes} />
  ) : (
    <ReactSelect {...attributes} />
  )
}
