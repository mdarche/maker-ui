import * as React from 'react'
import { Flex } from '@maker-ui/primitives'
import { useFormikContext, Field, FieldArray, FormikErrors } from 'formik'

import { TrashIcon, PlusIcon } from '../Icons'
import type { InputProps } from '../types'

interface RepeaterProps extends InputProps {}

// Todo
export const Repeater = (props: RepeaterProps) => {
  const {
    errors,
    values,
  }: { errors: FormikErrors<any>; values: any } = useFormikContext()
  const valueKey = 'todo'
  const subKey = 'todo'

  console.log('Errors are', errors)
  console.log('Props are', props)

  return (
    <FieldArray
      name={valueKey}
      render={({ remove, push }) => (
        <div>
          {values[valueKey].length > 0 &&
            values[valueKey].map((p: any, index: number) => {
              console.log(p)
              return (
                <div key={index}>
                  <Flex className="row">
                    <Field
                      name={`products[${index}][${subKey}]`}
                      type="number"
                      min="0"
                    />
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => remove(index)}>
                      <TrashIcon />
                    </button>
                  </Flex>
                </div>
              )
            })}
          <Flex justify="flex-start">
            <button
              type="button"
              className="form-repeater-btn"
              onClick={() => push({})}>
              <PlusIcon /> Add
            </button>
          </Flex>
        </div>
      )}
    />
  )
}
