import * as React from 'react'
import { mergeSelectors } from '../utils/helper'

interface OverlayProps {
  show: boolean
  toggle: any
  bp?: number
  type?: string
}

/**
 * The `Overlay` component acts as an `onBlur` click toggle for closing the
 * SideNav or MobileMenu components on mobile.
 *
 * @internal usage only
 */

export const Overlay = ({ show, toggle }: OverlayProps) => {
  return (
    <div
      className={mergeSelectors([
        'menu-overlay',
        'fixed',
        'cover',
        show ? ' active' : undefined,
      ])}
      role="button"
      onClick={toggle}
    />
  )
}

Overlay.displayName = 'Overlay'
