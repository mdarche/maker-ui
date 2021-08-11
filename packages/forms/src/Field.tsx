import * as React from 'react'
import { Div, Flex, mergeSelectors } from 'maker-ui'
import { Field, FormikErrors, FormikTouched, useFormikContext } from 'formik'

import { FieldProps } from './types'
import { useFormSettings } from './FormProvider'

export const TextField = ({
  name,
  id,
  colSpan,
  placeholder,
  type,
  errorPosition,
  label,
  description,
  containerClass,
  validationIcon,
  selectOptions,
  initialOption,
}: FieldProps) => {
  const [firstTouch, setFirstTouch] = React.useState(false)
  // TODO - <any> should be dynamic <FormValues>
  const { settings } = useFormSettings()
  const {
    errors,
    touched,
  }: {
    errors: FormikErrors<any>
    touched: FormikTouched<any>
  } = useFormikContext()

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
      ])}
      css={{
        gridColumn: colSpan !== undefined ? `span ${colSpan}` : undefined,
      }}>
      {description ? <div className="description">{description}</div> : null}
      <label htmlFor={id}>{label}</label>
      <Field
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
        className={hasError ? 'error' : ''}
        placeholder={placeholder}
        list={type === 'select-datalist' ? `list-${id}` : undefined}
        type={type !== 'select-datalist' ? type : undefined}>
        {type === 'select' ? (
          <OptionList options={selectOptions} initial={initialOption} />
        ) : null}
      </Field>
      {type === 'select-datalist' ? (
        <OptionList
          id={id}
          options={selectOptions}
          initial={initialOption}
          datalist
        />
      ) : null}
      {validationIcon && (
        <Flex
          align="center"
          className={isComplete ? 'valid validation-icon' : 'validation-icon'}
          css={{
            ...(absolutePosition as object),
            opacity: 0,
            visibility: 'hidden',
            transition: 'all ease 0.2s',
            '&.valid': {
              opacity: 1,
              visibility: 'visible',
            },
          }}>
          {settings.validationIcon}
        </Flex>
      )}
      {hasError && (
        <Div
          className="form-error"
          css={{
            position: 'absolute',
            ...getErrorPosition(errorPosition),
          }}>
          {errors[name]}
        </Div>
      )}
    </Div>
  )
}

const absolutePosition = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 15,
}

function getErrorPosition(pos: FieldProps['errorPosition']): object {
  let styles: any = {}
  if (pos?.includes('top')) {
    styles.top = 0
  } else {
    styles.bottom = 0
  }

  if (pos?.includes('right')) {
    styles.right = 0
  } else {
    styles.left = 0
  }
  return styles
}

interface OptionProps {
  options?: string[]
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

const OptionList = ({ options, id, initial, datalist }: OptionProps) => {
  return (
    <OptionWrapper id={id} wrapper={datalist}>
      {initial ? <option>{initial}</option> : null}
      {options?.map(i => (
        <option key={i}>{i}</option>
      ))}
    </OptionWrapper>
  )
}
