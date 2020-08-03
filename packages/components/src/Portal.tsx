import React from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  root?: string
}

/**
 * `Portal` is an internal component that powers the Modal. It checks for the browser window
 * and creates a React portal to a specified node or the document body.
 *
 * @internal usage only
 */

export const Portal = ({ children, root }: PortalProps) => {
  if (typeof window !== `undefined`) {
    const targetNode = root
      ? document.getElementById(root)
      : document.querySelector('body')

    return createPortal(children, targetNode)
  }
  return <>children</>
}
