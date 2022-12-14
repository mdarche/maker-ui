import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { SideNavOptions } from '@/types'

export interface SideNavProps
  extends Partial<SideNavOptions>,
    React.HTMLAttributes<HTMLDivElement> {
  toggleButton?: React.ReactNode
  _type?: 'sideNav'
}

/**
 * The **SideNav** component creates a side navigation panel as a sibling to the page's main
 * content. It can be toggled open or closed on both desktop and mobile or it can serve as
 * the page's primary <header> tag.
 *
 * @link https://maker-ui.com/docs/layout/sidenav
 */
export const SideNav = ({
  id,
  isHeader = false,
  isPrimaryMobileNav,
  closeOnBlur,
  closeOnRouteChange,
  collapse,
  showCollapseOnMobile,
  collapseButton,
  cssTransition,
  className,
  breakpoint,
  children,
  _type,
  ...props
}: SideNavProps) => {
  return (
    <>
      <div
        className="mkui_overlay mkui_overlay_s fixed cover"
        role={closeOnBlur ? 'button' : undefined}
      />
      <Container
        isHeader={isHeader}
        className={cn(['mkui_sn mkui_sn_init', className])}
        {...props}>
        <div className={cn(['mkui_sn_inner', 'container'])}>{children}</div>
      </Container>
      {collapseButton}
    </>
  )
}

SideNav.displayName = 'SideNav'
SideNav.defaultProps = { _type: 'sideNav' }

interface ContainerProps {
  isHeader: boolean
  [key: string]: any
}

const Container = ({ isHeader, ...props }: ContainerProps) =>
  isHeader ? <header {...props} /> : <div {...props} />
