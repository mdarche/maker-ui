import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { HeaderOptions } from '@/types'

interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    HeaderOptions {}

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
  children,
  ...props
}: HeaderProps) => {
  return (
    <header
      className={cn([
        'mkr-header',
        sticky ? 'sticky' : '',
        stickyOnMobile ? 'sticky-mobile' : '',
        absolute ? 'width-100' : undefined,
        className,
      ])}
      role="banner"
      {...props}>
      Navbar
    </header>
  )
}

Header.displayName = 'Header'
