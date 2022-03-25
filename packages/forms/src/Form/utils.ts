import * as React from 'react'

export interface NestedComponents {
  formHeader: React.ReactElement | null
  formFooter: React.ReactElement | null
  formError: React.ReactElement | null
  formSuccess: React.ReactElement | null
  formSubmit: React.ReactElement | null
  formChildren: React.ReactElement[]
}

export const defaultComponents: NestedComponents = {
  formHeader: null,
  formFooter: null,
  formError: null,
  formSuccess: null,
  formSubmit: null,
  formChildren: [],
}

export function sortChildren(children: React.ReactNode) {
  let order = defaultComponents
  React.Children.forEach(children, (child, i) => {
    if (
      React.isValidElement(child) &&
      //@ts-ignore
      child.type.displayName
    ) {
      //@ts-ignore
      switch (child.type.displayName) {
        case 'FormHeader':
          return (order.formHeader = child)
        case 'FormFooter':
          return (order.formFooter = child)
        case 'FormSuccess':
          return (order.formSuccess = child)
        case 'FormError':
          return (order.formError = child)
        default:
          return order.formChildren.push(child as React.ReactElement)
      }
    } else {
      order.formChildren.push(child as React.ReactElement)
    }
  })
  return order
}
