import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { Field } from '../../Field'
import { useField, useForm, useRepeater } from '@/context'
import type { FieldProps } from '@/types'
import { setVariable } from '@/helpers'

export const Repeater = ({ repeater: r, ...p }: FieldProps) => {
  const { settings: s } = useForm()
  const { value: fields, error } = useField(p.name)
  const { removeIndex, addIndex, reorder } = useRepeater(p.name)
  const [draggedRowId, setDraggedRowId] = React.useState<string | null>(null)

  const max = r?.max || 10
  const hasError = !!error
  const hasReorder = r?.reorder ?? false

  const handleMouseDown = (event: React.MouseEvent<HTMLTableCellElement>) => {
    const tr = event.currentTarget.closest('tr')
    if (tr) {
      tr.dataset.dragInitiated = 'true'
    }
  }

  const handleDragStart = (
    e: React.DragEvent<HTMLTableRowElement>,
    id: string
  ) => {
    if (e.currentTarget.dataset.dragInitiated === 'true') {
      setDraggedRowId(id)
    } else {
      e.preventDefault()
    }

    e.currentTarget.removeAttribute('data-drag-initiated')
  }

  const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault()
  }

  const handleDrop = (
    e: React.DragEvent<HTMLTableRowElement>,
    targetId: string
  ) => {
    reorder(draggedRowId, targetId)
    setDraggedRowId(null)
  }

  return (
    Array.isArray(fields) && (
      <>
        <table className={cn(['mkui-repeater-table', r?.classNames?.table])}>
          <tbody>
            {fields.map((field, index) => {
              return (
                <tr
                  key={field._id}
                  className={cn([
                    `mkui-row repeater-${index}`,
                    r?.classNames?.row,
                  ])}
                  draggable={hasReorder}
                  onDragStart={(e) => handleDragStart(e, field._id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, field._id)}>
                  {hasReorder && (
                    <td
                      className={cn([
                        'mkui-row-handle',
                        r?.classNames?.btnDrag,
                      ])}
                      onMouseDown={handleMouseDown}>
                      <span title="Drag to reorder">
                        {r?.iconReorder || s?.icons?.reorder}
                      </span>
                    </td>
                  )}
                  <td className="mkui-row-content">
                    <div
                      className={cn(['mkui-form-grid', r?.classNames?.grid])}
                      style={setVariable(p?.grid?.columns, 'col')}>
                      {p.subFields?.map(({ name, ...f }) => {
                        const n = `${p.name}.${index}.${name}`
                        return <Field key={n} name={n} {...f} />
                      })}
                    </div>
                  </td>
                  <td className="mkui-row-remove">
                    <button
                      type="button"
                      className={cn([
                        'mkui-btn-remove',
                        r?.classNames?.btnRemove,
                      ])}
                      onClick={() => removeIndex(index)}>
                      {r?.iconRemove || s?.icons?.remove}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {fields.length < max && (
          <div className="mkui-row-add flex align-center justify-flex-end">
            <button
              className={cn(['mkui-btn-add', r?.classNames?.btnAdd])}
              type="button"
              onClick={() => addIndex()}>
              {r?.iconAdd || s?.icons?.add}
            </button>
          </div>
        )}
        {hasError && (
          <div className={cn(['mkui-field-error', s?.classNames?.fieldError])}>
            {error}
          </div>
        )}
      </>
    )
  )
}
