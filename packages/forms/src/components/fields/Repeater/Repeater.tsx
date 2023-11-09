import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { Field } from '../../Field'
import { useField, useForm, useRepeater } from '@/context'
import type { FieldProps } from '@/types'

export const Repeater = (p: FieldProps) => {
  const {
    settings: { icons },
    values,
    schema,
  } = useForm()
  const { value: fields } = useField(p.name)
  const { removeIndex, addIndex, reorder } = useRepeater(p.name)

  const max = p?.repeater?.max || 10

  console.log('Form values are', values)
  console.log('Form schema is', schema)

  // Delete Logic

  // Add Logic
  function addRow() {
    addIndex()
  }

  // Field validate should use index value for logic
  // Repeater validate should evaluate min and max requirements

  return Array.isArray(fields) ? (
    <>
      {fields.map((_, index) => {
        const k = `repeater-${index}`
        return (
          <div key={k} className={cn(['mkui-form-grid', k])}>
            {p.subFields?.map(({ name, ...f }) => {
              const n = `${p.name}.${index}.${name}`
              return <Field key={n} name={n} {...f} />
            })}
          </div>
        )
      })}
      {fields.length < max && (
        <div className="mkui-repeater-controls flex align-center">
          <button
            className="mkui-repeater-add"
            type="button"
            onClick={() => addRow()}>
            Add
            {/* {p?.repeater?.iconAdd || icons?.add} */}
          </button>
        </div>
      )}
    </>
  ) : null
}
