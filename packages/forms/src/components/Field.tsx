import * as React from 'react'
import { cn, Conditional, merge } from '@maker-ui/utils'

import { Label } from './Label'
import { Input } from './Input'
import { AutoSaveWrapper, initial } from './AutoSaveWrapper'
import { useForm, useField } from '@/hooks'
import { evaluateConditions } from '@/helpers'
import type { FieldProps } from '@/types'
import { ZodError } from 'zod'

const basicInputs = [
  'text',
  'textarea',
  'email',
  'number',
  'tel',
  'password',
  'url',
  'date',
  'file',
  'color',
  'range',
]

const top = ['top-right', 'top-left', 'top-center', 'left', 'floating']
const bottom = ['bottom-right', 'bottom-left', 'bottom-center', 'right']

export const Field = (props: FieldProps) => {
  const { settings, values, schema, formError } = useForm()
  const { touched, error } = useField(props.name)

  console.log(props.name, 'error is ', error)
  // Helpers
  const labelPos = props?.labelPosition || settings.labelPosition
  const errorPos = props?.errorPosition || settings.errorPosition
  const hasAutoSave = props?.autoSave || settings.autoSave
  const autoSaveSettings = () => {
    let local =
      typeof props.autoSave === 'boolean' || !props.autoSave
        ? {}
        : props.autoSave
    let global =
      typeof settings.autoSave === 'boolean' || !settings.autoSave
        ? {}
        : settings.autoSave
    return merge.all([initial, global, local])
  }
  const hasError = !!error
  // const hasAutoSave = props.autoSave || settings.autoSave
  const shouldRender =
    !props.conditions || evaluateConditions(props.conditions, values, schema)

  // Return a Divider slot
  if (props.type === 'divider') {
    return (
      <div
        id={props.name}
        className={cn(['mkui_form_divider', props.className])}>
        {props?.component ?? null}
      </div>
    )
  }

  function renderFieldType() {
    /* Custom React inputs */
    if (props.type === 'custom' && props?.component) {
      return props.component
    }
    /* Basic HTML Inputs */
    if (basicInputs.includes(props.type)) {
      return <Input name={props.name} />
    }
  }

  return shouldRender ? (
    <div
      className={cn([
        'mkui_field_container',
        props.className,
        'label-' + labelPos,
        'error-' + errorPos,
        settings?.classNames?.fieldContainer,
        hasError ? 'error' : undefined,
        touched ? 'touched' : '',
      ])}>
      {top.includes(labelPos) ? (
        <Label name={props.name} type={props.type}>
          {props.label}
        </Label>
      ) : null}
      {props.instructions ? (
        <div className="mkui_field_instructions">{props.instructions}</div>
      ) : null}
      <Conditional
        condition={hasAutoSave === true}
        wrapper={(c) => (
          <AutoSaveWrapper
            name={props.name}
            formError={!!formError}
            settings={autoSaveSettings()}>
            {c}
          </AutoSaveWrapper>
        )}>
        <>{renderFieldType()}</>
      </Conditional>
      {bottom.includes(labelPos) ? (
        <Label name={props.name} type={props.type}>
          {props.label}
        </Label>
      ) : null}
      {props?.showValidation ? (
        <div
          className={cn(['mkui_validate', !error && touched ? 'active' : ''])}>
          {settings?.validateIcon}
        </div>
      ) : null}
      {hasError ? (
        <div className="mkui_field_error">
          {typeof error === 'string'
            ? error
            : (error as ZodError).formErrors?.formErrors[0]}
        </div>
      ) : null}
    </div>
  ) : null
}

Field.displayName = 'Field'
