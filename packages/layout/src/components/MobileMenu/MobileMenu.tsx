import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { MobileMenuOptions } from '@/types'
import styles from './MobileMenu.module.css'

export interface MobileMenuProps
  extends Partial<MobileMenuOptions>,
    React.HTMLAttributes<HTMLDivElement> {
  _type?: 'mobileMenu'
  header?: React.ReactNode
  footer?: React.ReactNode
  menu?: React.ReactNode
}

/* Utility for mobile nav transitions that require a full-width window */
const fullWidth = ['fade', 'fade-up', 'fade-down']

/**
 * The `MobileMenu` component lets you customize a responsive overlay menu for mobile navigation.
 *
 * @link https://maker-ui.com/docs/layout/mobile-menu
 */
export const MobileMenu = ({
  className,
  header,
  footer,
  menu,
  closeButton,
  closeButtonPosition = 'top-right',
  showCloseButton,
  closeOnBlur,
  center,
  transition = 'fade',
  children,
  _type,
  ...props
}: MobileMenuProps) => {
  return (
    <>
      {closeOnBlur && !fullWidth.includes(transition) ? (
        <div className="mkr_overlay fixed cover mobile-menu" role="button" />
      ) : null}
      <div
        className={cn([
          styles.mobile_menu,
          center ? 'center' : undefined,
          fullWidth.includes(transition) ? 'full-width' : undefined,
          `close-${closeButtonPosition}`,
          transition,
          className,
        ])}
        {...props}>
        <div className="container">
          <>{closeButton ?? null}</>
          {header ? header : null}
          {children ?? null}
          {footer ? footer : null}
        </div>
      </div>
    </>
  )
}

MobileMenu.displayName = 'MobileMenu'
MobileMenu.defaultProps = { _type: 'mobileMenu' }
