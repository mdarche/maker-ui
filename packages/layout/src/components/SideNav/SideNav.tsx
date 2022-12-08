import * as React from 'react'
import { cn } from '@maker-ui/utils'
import type { SideNavOptions } from '@/types'
import styles from './SideNav.module.css'

export interface SideNavProps
  extends Partial<SideNavOptions>,
    React.HTMLAttributes<HTMLDivElement> {
  _type?: 'sideNav'
  menu?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
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
  menu,
  header,
  footer,
  className,
  children,
  _type,
  ...props
}: SideNavProps) => {
  // const attributes = (type: 'collapse' | 'toggle') => ({
  //   id: `${type}-sidenav`,
  //   title: `${type} side navigation`,
  //   'aria-label': `${type} side navigation`,
  //   onClick: type === 'collapse' ? setCollapse : setActive,
  // })

  // function renderCollapseButton() {
  //   return typeof customCollapse === 'function' ? (
  //     customCollapse(collapse, attributes('collapse'))
  //   ) : sideNav.collapse ? (
  //     <button {...attributes('collapse')}>
  //       {customCollapse === 'default' ? (
  //         <svg
  //           className={cn(['default-collapse', collapse ? 'rotate' : ''])}
  //           viewBox="0 0 24 24"
  //           xmlns="http://www.w3.org/2000/svg">
  //           <path d="M9 19a1 1 0 01-.71-1.71l5.3-5.29-5.3-5.29a1 1 0 011.42-1.42l6 6a1 1 0 010 1.41l-6 6A1 1 0 019 19z" />
  //         </svg>
  //       ) : (
  //         customCollapse
  //       )}
  //     </button>
  //   ) : null
  // }

  return (
    <>
      {closeOnBlur ? (
        <div className="mkr_overlay fixed cover sidenav" role="button" />
      ) : null}
      {/* {layout === 'content-sidenav' ? renderCollapseButton() : null} */}
      <Container
        isHeader={isHeader}
        className={cn([styles.sidenav, className])}
        {...props}>
        <div className="container">
          {header ?? null}
          {children ?? null}
          {menu ?? null}
          {footer ?? null}
        </div>
      </Container>
      {/* {typeof customToggle === 'function' ? (
        customToggle(active, attributes('toggle'))
      ) : sideNav.showToggleOnMobile ? (
        <button {...attributes('toggle')}>
          {customToggle === 'default'
            ? active
              ? 'close'
              : 'open'
            : customToggle}
        </button>
      ) : null}
      {layout === 'sidenav-content' ? renderCollapseButton() : null} */}
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
