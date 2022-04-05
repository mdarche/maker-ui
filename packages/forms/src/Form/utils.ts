import { merge } from '@maker-ui/utils'
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

export function sortChildren(children: React.ReactNode): NestedComponents {
  let sorted: Partial<NestedComponents> = {
    formChildren: [],
  }
  React.Children.forEach(children, (child, i) => {
    if (
      React.isValidElement(child) &&
      //@ts-ignore
      child.type.displayName
    ) {
      //@ts-ignore
      switch (child.type.displayName) {
        case 'FormHeader':
          return (sorted.formHeader = child)
        case 'FormFooter':
          return (sorted.formFooter = child)
        case 'FormSuccess':
          return (sorted.formSuccess = child)
        case 'FormError':
          return (sorted.formError = child)
        case 'FormSubmit':
          return (sorted.formSubmit = child)
        default:
          return sorted.formChildren?.push(child as React.ReactElement)
      }
    } else {
      sorted.formChildren?.push(child as React.ReactElement)
    }
  })
  return merge(defaultComponents, sorted)
}
