import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { renderNode } from '../utils'
import type { MobileMenuOptions } from '@/types'

export interface MobileMenuProps
  extends Partial<MobileMenuOptions>,
    React.HTMLAttributes<HTMLDivElement> {
  _type?: 'mobileMenu'
}

/* Utility for mobile nav transitions that require a full-width window */
const fullWidth = ['fade', 'fade-up', 'fade-down']

/**
 * The `MobileMenu` component lets you customize a responsive overlay menu for mobile navigation.
 *
 * @link https://maker-ui.com/docs/layout#mobile-menu
 */
export const MobileMenu = ({
  className,
  closeButton,
  closeOnRouteChange,
  visibleOnDesktop,
  closeOnBlur,
  center,
  menu,
  transition = 'fade',
  children,
  _type,
  ...props
}: MobileMenuProps) => {
  return (
    <>
      {closeOnBlur && !fullWidth.includes(transition) ? (
        <div className="mkui-overlay o-mobile" role="button" />
      ) : null}
      <div
        className={cn([
          'mkui-mobile-menu',
          center ? 'center' : undefined,
          fullWidth.includes(transition) ? 'width-100' : undefined,
          transition.includes('fade') ? 't-fade' : undefined,
          transition,
          className,
        ])}
        {...props}>
        <div className="container height-100 width-100 relative">
          <>{renderNode(closeButton)}</>
          <>{children}</>
        </div>
      </div>
    </>
  )
}

MobileMenu.displayName = 'MobileMenu'
MobileMenu.defaultProps = { _type: 'mobileMenu' }
