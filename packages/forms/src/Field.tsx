import * as React from 'react'
import { Div, Flex, mergeSelectors } from 'maker-ui'
import {
  Field as FormikField,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from 'formik'

import { FieldProps } from './types'
import { useForm } from './Provider'
import { OptionList } from './Fields/Select'

export const Field = ({
  name,
  id,
  colSpan,
  placeholder,
  type,
  labelStyle,
  errorStyle,
  label,
  description,
  containerClass,
  showValidation,
  selectOptions,
  initialOption,
}: FieldProps) => {
  const [firstTouch, setFirstTouch] = React.useState(false)
  const { settings } = useForm()
  const {
    errors,
    touched,
  }: {
    errors: FormikErrors<any>
    touched: FormikTouched<any>
  } = useFormikContext()

  const hasError = errors[name] && touched[name] ? true : false
  const isComplete = !errors[name] && touched[name] ? true : false
  const labelPosition = labelStyle || (settings.labelStyle as string)

  const labelAbove = ['']
  // const labelBelow = ['']

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
        ...position_label(labelStyle),
        ...position_error(errorStyle),
      }}>
      {label && labelAbove.includes(labelPosition) ? (
        <label htmlFor={id}>{label}</label>
      ) : (
        undefined
      )}
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
      {validateIcon ? (
        <Flex
          align="center"
          className={isComplete ? 'valid validation-icon' : 'validation-icon'}
          css={{
            ...position_absolute,
            opacity: 0,
            visibility: 'hidden',
            transition: 'all ease 0.2s',
            '&.valid': {
              opacity: 1,
              visibility: 'visible',
            },
          }}>
          {settings?.validateIcon}
        </Flex>
      ) : null}
      {hasError && <Div className="form-error">{errors[name]}</Div>}
    </Div>
  )
}

Field.displayName = 'Field'

const position_absolute = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 15,
}

function position_label(pos?: FieldProps['labelStyle']): object {
  return pos === 'top' ? {} : {}
}

function position_error(pos: FieldProps['errorStyle']): object {
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
