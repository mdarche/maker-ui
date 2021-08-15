import * as React from 'react'
import { useFormikContext, Field, FieldArray, FormikErrors } from 'formik'

// Todo
export const Repeater = () => {
  const { errors, values } = useFormikContext()

  return (
    <FieldArray
      name="products"
      render={({ remove, push }) => (
        <div>
          {values.products.length > 0 &&
            values.products.map((p, index) => {
              return (
                <div key={index}>
                  <Flex className="row">
                    <Div>
                      <Div className="custom-select" css={{ marginRight: 15 }}>
                        <Field as="select" name={`products[${index}].name`}>
                          <option>Select a product</option>
                          {Object.keys(order.inventory)
                            .sort(sortAlphaNum)
                            .map(key => (
                              <option key={key}>{key}</option>
                            ))}
                        </Field>
                        <DownIcon className="down-caret" />
                        <Div css={{ display: 'none' }}>
                          <Field
                            name={`products[${index}].pallets`}
                            type="number"
                            value={
                              (values.products[index].pallets = pallets || 0)
                            }
                          />
                        </Div>
                      </Div>
                    </Div>
                    <Div>
                      <Div>
                        <Div className="sqft-wrapper">
                          <Field
                            className="sqft"
                            name={`products[${index}].sqft`}
                            placeholder="24"
                            type="number"
                            min="0"
                          />
                        </Div>
                      </Div>
                    </Div>
                    <Button
                      type="button"
                      className="btn-remove"
                      onClick={() => remove(index)}>
                      <TrashIcon />
                    </Button>
                  </Flex>
                </div>
              )
            })}
          <Flex justify="flex-start">
            <Button
              type="button"
              className="form-repeater-btn"
              onClick={() => push({ name: '', sqft: '' })}>
              <PlusIcon /> Add
            </Button>
          </Flex>
        </div>
      )}
    />
  )
}
