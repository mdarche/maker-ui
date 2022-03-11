import * as React from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  /** The child node that should appear inside of the portal */
  children: React.ReactNode
  /** An ID selector or React Element that the portal should connect to */
  root?: string | Element | null
}

/**
 * `Portal` is an internal component that powers the Modal and Popover.
 * It checks for the browser window and creates a React portal to a specified
 * node or the document body.
 *
 * @internal usage only
 */
export const Portal = ({ children, root }: PortalProps) => {
  if (typeof window !== 'undefined') {
    const idTarget =
      root && typeof root === 'string'
        ? (document.getElementById(root) as Element)
        : root
        ? root
        : null
    const targetNode =
      root && idTarget ? idTarget : (document.querySelector('body') as Element)

    // @ts-ignore
    return createPortal(children, targetNode)
  }
  return <>{children}</>
}

Portal.displayName = 'Portal'
