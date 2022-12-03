import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { CollapseMenu } from '../Menu'
import { Overlay } from '../Overlay'
import { useLayout } from '../../temp/LayoutContext'
import type { MenuItemProps } from '../Menu'
import type { SideNavOptions } from '@/types'

interface ContainerProps {
  isHeader: boolean
  [key: string]: any
}

const Container = ({ isHeader, ...props }: ContainerProps) =>
  isHeader ? <header {...props} /> : <div {...props} />

export interface SideNavProps
  extends SideNavOptions,
    React.HTMLAttributes<HTMLDivElement> {
  menu?: MenuItemProps[]
  header?: React.ReactElement
  footer?: React.ReactElement
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
  isHeader,
  toggleButton,
  collapseButton,
  menu,
  header,
  footer,
  className,
  children,
  ...props
}: SideNavProps) => {
  // For fixed mobile version of SideNav
  const [active, setActive] = useSideNav()
  // For desktop collapsible version of SideNav
  const [collapse, setCollapse] = useCollapseSideNav()
  const { sideNav } = useOptions()
  const [layout] = useLayout('content')

  const customToggle = toggleButton || sideNav.toggleButton
  const customCollapse = collapseButton || sideNav.collapseButton

  const attributes = (type: 'collapse' | 'toggle') => ({
    id: `${type}-sidenav`,
    title: `${type} side navigation`,
    'aria-label': `${type} side navigation`,
    onClick: type === 'collapse' ? setCollapse : setActive,
  })

  function renderCollapseButton() {
    return typeof customCollapse === 'function' ? (
      customCollapse(collapse, attributes('collapse'))
    ) : sideNav.collapse ? (
      <button {...attributes('collapse')}>
        {customCollapse === 'default' ? (
          <svg
            className={cn(['default-collapse', collapse ? 'rotate' : ''])}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M9 19a1 1 0 01-.71-1.71l5.3-5.29-5.3-5.29a1 1 0 011.42-1.42l6 6a1 1 0 010 1.41l-6 6A1 1 0 019 19z" />
          </svg>
        ) : (
          customCollapse
        )}
      </button>
    ) : null
  }

  return (
    <>
      {sideNav.closeOnBlur ? (
        <Overlay className="sidenav-overlay" show={active} toggle={setActive} />
      ) : null}
      {layout === 'content sidenav' ? renderCollapseButton() : null}
      <Container
        isHeader={isHeader}
        id={cn(['sidenav', id])}
        className={cn([
          !active ? 'hide-sidenav' : '',
          collapse ? 'collapse-sidenav' : '',
          className,
        ])}
        {...props}>
        <div className="container">
          {header ? header : null}
          {children ? children : null}
          {menu ? <CollapseMenu menu={menu} menuType="sideNav" /> : null}
          {footer ? footer : null}
        </div>
      </Container>
      {typeof customToggle === 'function' ? (
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
      {layout === 'sidenav content' ? renderCollapseButton() : null}
    </>
  )
}

SideNav.displayName = 'SideNav'
