import * as React from 'react'
import { Field as FormikField } from 'formik'
import { InputProps } from '../types'

interface OptionProps {
  options?: InputProps['selectOptions']
  initial?: string
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

export const OptionList = ({ options, id, initial, datalist }: OptionProps) => {
  // TODO conditional check the options for object vs array of strings
  return (
    <OptionWrapper id={id} wrapper={datalist}>
      {initial ? <option>{initial}</option> : null}
      {/* @ts-ignore */}
      {options?.map((i, index) => (
        <option key={index}>{i}</option>
      ))}
    </OptionWrapper>
  )
}

interface SelectProps extends InputProps {}

export const Select = ({
  id,
  type,
  name,
  hasError,
  selectOptions,
  initialOption,
  firstTouch,
  setFirstTouch,
}: SelectProps) => {
  return (
    <>
      <FormikField
        id={id}
        onFocus={() => (!firstTouch ? setFirstTouch(true) : undefined)}
        onClick={() => (!firstTouch ? setFirstTouch(true) : undefined)}
        as="select" // TODO check how this renders
        name={name}
        className={hasError ? 'error' : undefined}
        list={type === 'select-datalist' ? `list-${id}` : undefined}
        type={type !== 'select-datalist' ? 'select' : undefined}>
        {type === 'select' ? (
          <OptionList options={selectOptions} initial={initialOption} />
        ) : null}
      </FormikField>
      {type === 'select-datalist' ? (
        <OptionList
          id={id}
          options={selectOptions}
          initial={initialOption}
          datalist
        />
      ) : null}
    </>
  )
}
