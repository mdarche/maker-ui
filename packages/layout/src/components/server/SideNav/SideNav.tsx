import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { SideNavOptions } from '@/types'
import styles from './SideNav.module.css'

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
  toggleButton,
  closeOnBlur,
  collapseButton,
  className,
  children,
  breakpoint,
  _type,
  ...props
}: SideNavProps) => {
  return (
    <>
      {closeOnBlur ? (
        <div className="mkr_overlay mkr_overlay_s fixed cover" role="button" />
      ) : null}
      <Container
        isHeader={isHeader}
        className={cn([styles.sidenav, className])}
        {...props}>
        <div className={cn([styles.sidenav_inner, 'container'])}>
          {children}
        </div>
      </Container>
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
