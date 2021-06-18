import * as React from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  root?: string
}

/**
 * `Portal` is an internal component that powers the Modal, Lightbox, and Popover.
 * It checks for the browser window and creates a React portal to a specified
 * node or the document body.
 *
 * @internal usage only
 */

export const Portal = ({ children, root }: PortalProps) => {
  if (typeof window !== 'undefined') {
    const idTarget = root ? (document.getElementById(root) as Element) : null
    const targetNode =
      root && idTarget ? idTarget : (document.querySelector('body') as Element)

    return createPortal(children, targetNode)
  }
  return <>{children}</>
}

Portal.displayName = 'Portal'
