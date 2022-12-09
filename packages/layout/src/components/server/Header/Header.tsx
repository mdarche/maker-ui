import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { HeaderOptions } from '@/types'
import styles from './Header.module.css'

export interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<HeaderOptions> {
  _mobileMenu?: React.ReactNode
  _type: 'header'
}

/**
 * The `Header` component stores your site logo, primary menu, mobile menu,
 * and any necessary navigation elements.
 *
 * @link https://maker-ui.com/docs/layout/header
 */
export const Header = ({
  className,
  absolute,
  sticky,
  stickyOnMobile,
  stickyUpScroll,
  scrollClass,
  _mobileMenu,
  _type,
  children,
  ...props
}: HeaderProps) => {
  return (
    <header
      className={cn([
        styles.header,
        sticky ? 'sticky' : '',
        stickyOnMobile ? 'sticky-mobile' : '',
        absolute ? 'width-100' : undefined,
        className,
      ])}
      role="banner"
      {...props}>
      Navbar
      {_mobileMenu ?? null}
    </header>
  )
}

Header.displayName = 'Header'
Header.defaultProps = { _type: 'header' }
