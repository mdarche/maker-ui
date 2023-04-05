import DOMPurify from 'dompurify'
import { createElement, Fragment, isValidElement, type ReactNode } from 'react'

type SafeHTMLProps = React.HTMLAttributes<HTMLElement> & {
  dangerouslySetInnerHTML?: {
    __html: string
  }
}

/**
 * Sanitizes and renders the given input. Inputs can be strings or React nodes.
 *
 * @param input The input to sanitize and render.
 * @returns The sanitized and rendered input.
 *
 */
export function sanitizeAndRender(input?: string | ReactNode): ReactNode {
  if (!input) return null
  if (typeof input !== 'string' && isValidElement(input)) return input

  // Handle string
  if (typeof input === 'string') {
    const sanitizedHtml = DOMPurify.sanitize(input.toString())
    return createElement(Fragment, {
      dangerouslySetInnerHTML: { __html: sanitizedHtml },
    } as SafeHTMLProps)
  }

  return null
  // const sanitizedNodes = sanitizedHtml
  //   .split(/(<\/?[^>]+>)/g)
  //   .map((node, index) => {
  //     if (node.match(/<[^>]+>/)) {
  //       return createElement(Fragment, { key: index }, node)
  //     }
  //     return node
  //   })
  // return createElement(Fragment, null, ...sanitizedNodes)
}
