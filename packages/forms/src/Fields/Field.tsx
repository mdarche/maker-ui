import * as React from 'react'
import { Div, mergeSelectors } from 'maker-ui'
import {
  Field as FormikField,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from 'formik'

import { Label } from './Label'
import { FieldProps } from '../types'
import { useForm } from '../Provider'
import { OptionList } from './Select'

function labelClass(s: string) {
  return s
}

function errorClass(s: string) {
  return s
}

export const Field = (props: FieldProps) => {
  const [firstTouch, setFirstTouch] = React.useState(false)
  const { settings } = useForm()
  const {
    errors,
    touched,
  }: {
    errors: FormikErrors<any>
    touched: FormikTouched<any>
  } = useFormikContext()
  const {
    name,
    id,
    colSpan,
    placeholder,
    type,
    labelStyle = settings.labelStyle,
    errorStyle = settings.errorStyle,
    label,
    description,
    containerClass,
    showValidation,
    selectOptions,
    initialOption,
  } = props

  const hasError = errors[name] && touched[name] ? true : false
  const isComplete = !errors[name] && touched[name] ? true : false

  return (
    <Div
      key={id}
      className={mergeSelectors([
        'field-container',
        containerClass,
        hasError ? 'error' : undefined,
        firstTouch ? 'touched' : undefined,
        labelClass(labelStyle as string),
        errorClass(errorStyle as string),
      ])}
      css={{
        gridColumn: colSpan !== undefined ? `span ${colSpan}` : undefined,
      }}>
      <Label id={id} type={type} position={labelStyle} top>
        {label}
      </Label>
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
      <Label id={id} type={type} position={labelStyle}>
        {label}
      </Label>
      {showValidation ? (
        <div
          className={mergeSelectors([
            'validate-icon',
            isComplete ? 'valid' : '',
          ])}>
          {settings?.validateIcon}
        </div>
      ) : null}
      {hasError ? <div className="form-error">{errors[name]}</div> : null}
    </Div>
  )
}

Field.displayName = 'Field'

/**
 * @todo
 * - create error position classes
 * - create label position classes
 * - create partials: Text, Select, Radio, Checkbox
 */
