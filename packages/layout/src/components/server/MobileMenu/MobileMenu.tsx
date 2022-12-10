import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { MobileMenuOptions } from '@/types'
import styles from './MobileMenu.module.css'

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
 * @link https://maker-ui.com/docs/layout/mobile-menu
 */
export const MobileMenu = ({
  className,
  closeButton,
  closeButtonPosition = 'top-right',
  closeOnBlur,
  center,
  transition = 'fade',
  children,
  _type,
  ...props
}: MobileMenuProps) => {
  const positions = closeButtonPosition.split('-')
  return (
    <>
      {closeOnBlur && !fullWidth.includes(transition) ? (
        <div
          className={cn([styles.menu_overlay, 'overlay fixed cover'])}
          role="button"
        />
      ) : null}
      <div
        className={cn([
          styles.mobile_menu,
          center ? 'center' : undefined,
          fullWidth.includes(transition) ? 'full-width' : undefined,
          transition,
          className,
        ])}
        {...props}>
        <div className="container">
          <>
            {closeButton ? (
              <div className={cn([styles.close_button, ...positions])}>
                {closeButton}
              </div>
            ) : null}
          </>
          {children ?? null}
        </div>
      </div>
    </>
  )
}

MobileMenu.displayName = 'MobileMenu'
MobileMenu.defaultProps = { _type: 'mobileMenu' }
