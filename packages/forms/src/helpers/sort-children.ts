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
  fieldError: ReactElement | null
  children: ReactElement[]
}

/**
 * The default component slots for a form.
 */
export const defaultSlots: Slots = {
  header: null,
  footer: null,
  error: null,
  success: null,
  submit: null,
  progress: null,
  fieldError: null,
  children: [],
}

/**
 * Separates React children elements into distinct slots based on the `_type` prop
 *
 * @param children - The React children to sort into slots
 * @returns An object with the sorted React elements in their respective slots
 * @example
 * ```tsx
 * const slots = sortChildren(
 *   <>
 *     <div>Some content</div>
 *     <Button _type="submit">Submit</Button>
 *   </>
 * );
 *
 * console.log(slots.submit); // logs the submit button element
 * ```
 */
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
