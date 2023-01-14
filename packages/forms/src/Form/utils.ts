import { merge } from '@maker-ui/utils'
import * as React from 'react'

export interface NestedComponents {
  header: React.ReactElement | null
  footer: React.ReactElement | null
  error: React.ReactElement | null
  success: React.ReactElement | null
  submit: React.ReactElement | null
  children: React.ReactElement[]
}

export const defaultComponents: NestedComponents = {
  header: null,
  footer: null,
  error: null,
  success: null,
  submit: null,
  children: [],
}

export function sortChildren(children: React.ReactNode): NestedComponents {
  let sorted: Partial<NestedComponents> = {
    children: [],
  }
  React.Children.toArray(children).forEach((child) => {
    if (React.isValidElement(child) && child.props?._type) {
      switch (child.props._type) {
        case 'header':
          return (sorted.header = child)
        case 'footer':
          return (sorted.footer = child)
        case 'success':
          return (sorted.success = child)
        case 'error':
          return (sorted.error = child)
        case 'submit':
          return (sorted.submit = child)
        default:
          return sorted.children?.push(child as React.ReactElement)
      }
    } else {
      sorted.children?.push(child as React.ReactElement)
    }
  })
  return merge(defaultComponents, sorted)
}
