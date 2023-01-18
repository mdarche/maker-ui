import {
  type ReactNode,
  type ReactElement,
  Children,
  isValidElement,
} from 'react'
import { merge } from '@maker-ui/utils'

export interface Slots {
  header: ReactElement | null
  footer: ReactElement | null
  error: ReactElement | null
  success: ReactElement | null
  progress: ReactElement | null
  submit: ReactElement | null
  children: ReactElement[]
}

export const defaultSlots: Slots = {
  header: null,
  footer: null,
  error: null,
  success: null,
  submit: null,
  progress: null,
  children: [],
}

export function sortChildren(children: ReactNode): Slots {
  let sorted: { [k: string]: any } = {
    children: [],
  }
  Children.toArray(children).forEach((child) => {
    if (isValidElement(child) && child.props?._type) {
      const type: string = child.props._type.replace('_', '')
      sorted[type] = child
    } else {
      sorted.children?.push(child as ReactElement)
    }
  })
  return merge(defaultSlots, sorted) as Slots
}
