import * as React from 'react'
import { FieldProps } from './types'

interface LabelProps {
  id: FieldProps['id']
  children: FieldProps['label']
  type: FieldProps['type']
  position: FieldProps['labelStyle']
  top: boolean
}

export const Label = ({ id, children, type, position = 'top', top }: LabelProps) => {
  const isTop = top && ['top', 'center', 'left', 'floating'].includes(position)
  const isBottom = isTop && ['bottom', 'right'].includes(position)

  // TODO make sure type is supported

  return isTop || isBottom ? (
    <label htmlFor={id} className="form-label">{children}</label>
  ) : null
}

export const Text = () => {
  return (
    <Label id={id} type={type} position={labelStyle} top>{label}</Label>
    {description ? <div className="description">{description}</div> : null}
    <FormikField
      id={id}
      onFocus={() => (!firstTouch ? setFirstTouch(true) : undefined)}
      onClick={() => (!firstTouch ? setFirstTouch(true) : undefined)}
      as={
        type === 'textarea'
          ? 'textarea'
          : type === 'select'
          ? 'select'
          : 'input'
      }
      name={name}
      className={hasError ? 'error' : undefined}
      placeholder={placeholder}
      list={type === 'select-datalist' ? `list-${id}` : undefined}
      type={type !== 'select-datalist' ? type : undefined}>
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
  )
}