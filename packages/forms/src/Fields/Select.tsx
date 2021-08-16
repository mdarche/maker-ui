import * as React from 'react'
import { Field as FormikField } from 'formik'
import { InputProps } from '../types'

interface OptionProps {
  settings: InputProps['settings_select']
  datalist?: boolean
  id?: string
}

interface OptionWrapperProps {
  children: React.ReactNode
  wrapper?: boolean
  id?: string
}

const OptionWrapper = ({ wrapper, id, children }: OptionWrapperProps) =>
  wrapper ? <datalist id={`list-${id}`}>{children}</datalist> : <>{children}</>

export const OptionList = ({ settings, id, datalist = false }: OptionProps) => {
  // const isObject =
  //   typeof settings?.options === 'object' && settings?.options !== null
  // const isObject = false

  console.log('Settings.options are', settings?.options)

  return settings ? (
    <OptionWrapper id={id} wrapper={datalist}>
      {settings.initial ? <option>{settings.initial}</option> : null}
      {settings.options.map(({ id, className, label, value }, index) => (
        <option key={index} id={id} className={className} value={value}>
          {label}
        </option>
      ))}
    </OptionWrapper>
  ) : null
}

interface SelectProps extends InputProps {}

export const Select = ({
  id,
  type,
  name,
  hasError,
  settings_select,
  firstTouch,
  setFirstTouch,
}: SelectProps) => {
  return (
    <>
      <FormikField
        id={id}
        onFocus={() => (!firstTouch ? setFirstTouch(true) : undefined)}
        onClick={() => (!firstTouch ? setFirstTouch(true) : undefined)}
        as={type === 'select' ? 'select' : undefined}
        name={name}
        className={hasError ? 'error' : undefined}
        list={type === 'select-datalist' ? `list-${id}` : undefined}
        type={type !== 'select-datalist' ? 'select' : undefined}>
        {type === 'select' ? (
          <OptionList id={name} settings={settings_select} />
        ) : null}
      </FormikField>
      {type === 'select-datalist' ? (
        <OptionList id={name} settings={settings_select} datalist />
      ) : null}
    </>
  )
}
