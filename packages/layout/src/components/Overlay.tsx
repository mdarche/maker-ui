import * as React from 'react'
import { cn } from '@maker-ui/utils'

interface OverlayProps {
  className?: string
}

/**
 * The `Overlay` component acts as an `onBlur` click toggle for closing the
 * SideNav or MobileMenu components on mobile.
 *
 * TODO - handle all overlay clicks inside the client component for mobile menu and side nav
 *
 * @internal
 */
export const Overlay = ({ className }: OverlayProps) => {
  return (
    <div className={cn(['mkr_overlay fixed cover', className])} role="button" />
  )
}

Overlay.displayName = 'Overlay'
