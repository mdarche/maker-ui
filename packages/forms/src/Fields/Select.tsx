import React, { useState } from 'react'
import { useField } from 'formik'
import { default as ReactSelect } from 'react-select'
import type { InputProps, SelectSettings } from '../types'
import { merge } from '@maker-ui/utils'

interface SelectProps extends InputProps {
  settings: SelectSettings
}

export const Select = ({
  id,
  type,
  name,
  hasError,
  settings,
  cy,
}: SelectProps) => {
  const mergedSelectProps: SelectSettings = merge(
    {
      isSearchable: true,
      isClearable: true,
      blurInputOnSelect: false,
      captureMenuScroll: false,
      closeMenuOnSelect: false,
      closeMenuOnScroll: false,
      isDisabled: false,
      isMulti: false,
    },
    settings
  )

  const [field, { touched }, { setValue, setTouched }] = useField({
    name,
    type: 'file',
  })

  function handleChange(newVal?: any) {
    // Todo optional convert return value into a string with delimeter
    setValue(newVal)
  }

  function handleBlur() {
    console.log('handling blur')
    setTouched(true)
  }

  // useEffect(() => {
  //   setValue(state)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state])

  return (
    <ReactSelect
      inputId={id}
      name={name}
      className={hasError ? 'error' : undefined}
      {...mergedSelectProps}
      data-cy={cy}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
