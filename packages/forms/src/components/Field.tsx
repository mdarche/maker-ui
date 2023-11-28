import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { useForm, useField } from '@/context'
import { evaluateConditions, setVariable } from '@/helpers'
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

interface FieldPropsFull extends FieldProps {
  index?: number // used for array fields like repeater
}

export const Field = ({ index, ...p }: FieldPropsFull) => {
  const { settings: s, values, schema } = useForm()
  const { touched, error } = useField(p.name)

  // Helpers
  const labelPos = p?.labelPosition || s.labelPosition
  const errorPos = p?.errorPosition || s.errorPosition

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

  function renderLabel() {
    return (
      <Label
        name={p.name}
        className={s?.classNames?.fieldLabel}
        type={p.type}
        symbol={s?.requiredSymbol}
        required={p.required}>
        {p.label}
      </Label>
    )
  }

  return (
    shouldRender && (
      <div
        className={cn([
          'mkui-field-container',
          p.className,
          'label-' + labelPos,
          'error-' + errorPos,
          p?.colSpan ? 'has-colspan' : undefined,
          labelPos !== 'left' && labelPos !== 'right' ? 'flex-col' : undefined,
          s?.classNames?.fieldContainer,
          p?.honeypot ? 'form-safe' : undefined,
          !!error ? 'error' : undefined,
          touched ? 'touched' : '',
        ])}
        style={setVariable(p?.colSpan)}>
        {(labelPos.includes('top-') ||
          labelPos === 'left' ||
          labelPos === 'right') &&
          renderLabel()}
        {p.instructions && (
          <div
            className={cn([
              'mkui-field-instructions',
              s?.classNames?.fieldInstructions,
            ])}>
            {p.instructions}
          </div>
        )}
        {renderFieldType()}
        {labelPos.includes('bottom-') && renderLabel()}
        {p?.showValidation && (
          <div
            className={cn([
              'mkui-validate',
              !error && touched ? 'active' : '',
            ])}>
            {s?.icons?.validate}
          </div>
        )}
        {!!error && p?.type !== 'select' ? (
          <div className={cn(['mkui-field-error', s?.classNames?.fieldError])}>
            {error}
          </div>
        ) : null}
      </div>
    )
  )
}

Field.displayName = 'Field'
