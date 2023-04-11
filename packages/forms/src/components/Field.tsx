import * as React from 'react'
import { cn, Conditional, merge } from '@maker-ui/utils'
import type { ZodError } from 'zod'

import { useForm, useField } from '@/hooks'
import { evaluateConditions } from '@/helpers'
import type { FieldProps } from '@/types'
import {
  Input,
  Options,
  Switch,
  Range,
  Select,
  MediaField,
  DateTimePicker,
} from '@/fields'
import { Label } from './Label'
import { AutoSaveWrapper, initial } from './AutoSaveWrapper'

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

export const Field = (p: FieldProps) => {
  const { settings: s, values, schema, formError } = useForm()
  const { touched, error } = useField(p.name)
  // Helpers
  const labelPos = p?.labelPosition || s.labelPosition
  const errorPos = p?.errorPosition || s.errorPosition
  const hasError = !!error
  const hasAutoSave = p?.autoSave || s.autoSave
  const autoSaveSettings = () => {
    let local = typeof p.autoSave === 'boolean' || !p.autoSave ? {} : p.autoSave
    let global =
      typeof s.autoSave === 'boolean' || !s.autoSave ? {} : s.autoSave
    return merge.all([initial, global, local])
  }
  const shouldRender =
    !p.conditions || evaluateConditions(p.conditions, values, schema)

  // Return a Divider slot
  if (p.type === 'divider') {
    return (
      <div id={p.name} className={cn(['mkui-form-divider', p.className])}>
        {p?.component ?? null}
      </div>
    )
  }

  function renderFieldType() {
    /* Custom React inputs */
    if (p.type === 'custom' && p?.component) {
      return p.component
    }
    /* DatePicker and DateTimePicker */
    if (p.type === 'date-picker' || p.type === 'date-time-picker') {
      return <DateTimePicker name={p.name} />
    }
    /* Basic HTML Inputs */
    if (basicInputs.includes(p.type)) {
      return p?.range?.multi ? <Range name={p.name} /> : <Input name={p.name} />
    }
    /* Radio and Checkbox group inputs*/
    if (p.type === 'radio' || p.type === 'checkbox') {
      return <Options name={p.name} />
    }
    /* Switch Toggle input*/
    if (p.type === 'switch') {
      return <Switch name={p.name} />
    }
    /* Radio and Checkbox group inputs*/
    if (p.type === 'select') {
      return <Select name={p.name} />
    }
    /* Image picker field*/
    if (p.type === 'image-picker') {
      return <MediaField name={p.name} />
    }
  }

  return shouldRender ? (
    <div
      className={cn([
        'mkui-field-container',
        p.className,
        'label-' + labelPos,
        'error-' + errorPos,
        top.includes(labelPos) || bottom.includes(labelPos)
          ? 'flex-col'
          : undefined,
        p?.colSpan ? 'colspan-' + p.colSpan : undefined,
        s?.classNames?.fieldContainer,
        p?.honeypot ? 'form-safe' : undefined,
        hasError ? 'error' : undefined,
        touched ? 'touched' : '',
      ])}>
      {top.includes(labelPos) ? (
        <Label name={p.name} type={p.type} symbol={s?.requiredSymbol}>
          {p.label}
        </Label>
      ) : null}
      {p.instructions ? (
        <div className="mkui-field-instructions">{p.instructions}</div>
      ) : null}
      <Conditional
        condition={hasAutoSave === true}
        trueWrapper={(c) => (
          <AutoSaveWrapper
            name={p.name}
            formError={!!formError}
            settings={autoSaveSettings()}>
            {c}
          </AutoSaveWrapper>
        )}>
        <>{renderFieldType()}</>
      </Conditional>
      {bottom.includes(labelPos) ? (
        <Label name={p.name} type={p.type} symbol={s?.requiredSymbol}>
          {p.label}
        </Label>
      ) : null}
      {p?.showValidation ? (
        <div
          className={cn(['mkui-validate', !error && touched ? 'active' : ''])}>
          {s?.validateIcon}
        </div>
      ) : null}
      {hasError ? (
        <div className="mkui-field-error">
          {typeof error === 'string'
            ? error
            : (error as ZodError).issues[0]?.message}
        </div>
      ) : null}
    </div>
  ) : null
}

Field.displayName = 'Field'
