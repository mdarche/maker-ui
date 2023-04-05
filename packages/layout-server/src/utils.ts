import { isValidElement } from 'react'
import type { LogoProps } from './types'

/**
 * Returns a React.ReactNode if the node is a valid React element
 * or a function that returns a React.ReactNode
 *
 * @param node{any} - The node to check
 * @returns React.ReactNode
 */
export function renderNode(node: any): React.ReactNode {
  return typeof node === 'function'
    ? node()
    : isValidElement(node)
    ? node
    : null
}

/**
 * Retuns a string of class names based on the boolean sticky values passed
 *
 * @param desktop{boolean} - Desktop sticky
 * @param mobile{boolean} - Mobile sticky
 * @returns string
 */
export function stickyClass(desktop?: boolean, mobile?: boolean) {
  return desktop && mobile
    ? 'sticky'
    : desktop
    ? 'd-sticky'
    : mobile
    ? 'm-sticky'
    : undefined
}

/**
 * Checks if the path is a local or external path
 *
 * @param path{string} - The path to check
 * @returns boolean
 */
export function isLocal(path?: string) {
  return !!path?.startsWith('/')
}

/**
 * Checks if the object is a LogoProps object/React component
 *
 * @param i{any} - The object to check
 * @returns boolean
 */
export function isObject(i: any): i is LogoProps {
  return i && typeof i === 'object' && (i.image || i.icon)
}
