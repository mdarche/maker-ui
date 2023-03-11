import { isValidElement } from 'react'

export function renderNode(node: any): React.ReactNode {
  return typeof node === 'function'
    ? node()
    : isValidElement(node)
    ? node
    : null
}
