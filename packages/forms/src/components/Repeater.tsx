import * as React from 'react'

import { FieldProps } from '@/types'
import { Field } from './Field'
import { useField, useForm } from '@/hooks'

export const Repeater = (p: FieldProps) => {
  const {
    settings: { icons },
  } = useForm()
  const { value } = useField(p.name) // Value is an array of objects
  const max = p?.repeater?.max || 10

  // Delete Logic

  // Add Logic

  // Field validate should use index value for logic
  // Repeater validate should evaluate min and max requirements

  return Array.isArray(value) ? (
    <>
      {value.map((_, index) => (
        <div key={`${p.name}-${index}`} className="mkui-repeater">
          {p.subFields?.map((f, i) => <Field key={f.name} {...f} />)}
        </div>
      ))}
      {value.length < max && (
        <div className="mkui-repeater-controls flex align-center">
          <button className="mkui-repeater-add" type="button">
            {p?.repeater?.iconAdd || icons?.add}
          </button>
        </div>
      )}
    </>
  ) : null
}
