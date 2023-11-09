import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { Field } from '../../Field'
import { useField, useForm, useRepeater } from '@/context'
import type { FieldProps } from '@/types'

export const Repeater = (p: FieldProps) => {
  const { settings: s } = useForm()
  const { value: fields, error } = useField(p.name)
  const { removeIndex, addIndex, reorder } = useRepeater(p.name)

  const max = p?.repeater?.max || 10
  const hasError = !!error

  // console.log('Form values are', values)
  // console.log('Form schema is', schema)
  console.log('Error is', error)

  // Field validate should use index value for logic
  // Repeater validate should evaluate min and max requirements

  return Array.isArray(fields) ? (
    <>
      {fields.map((field, index) => {
        return (
          <div
            key={field._id}
            draggable={fields?.length > 1}
            className={cn(['mkui-form-grid', `repeater-${index}`, 'relative'])}>
            {p.subFields?.map(({ name, ...f }) => {
              const n = `${p.name}.${index}.${name}`
              return <Field key={n} name={n} {...f} />
            })}
            <button
              type="button"
              className="mkui-repeater-remove absolute"
              onClick={() => removeIndex(index)}
              style={{ right: 0, top: '50%', transform: 'translateY(-50%)' }}>
              {p?.repeater?.iconRemove || s?.icons?.remove || 'Remove'}
            </button>
          </div>
        )
      })}
      {fields.length < max && (
        <div className="mkui-repeater-controls flex align-center">
          <button
            className="mkui-repeater-add"
            type="button"
            onClick={() => addIndex()}>
            {p?.repeater?.iconAdd || s?.icons?.add || 'Add'}
          </button>
        </div>
      )}
      {hasError && (
        <div className={cn(['mkui-field-error', s?.classNames?.fieldError])}>
          {error}
        </div>
      )}
    </>
  ) : null
}
