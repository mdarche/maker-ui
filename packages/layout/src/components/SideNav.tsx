/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { Button } from '@maker-ui/primitives'

import { MakerOptions } from '../types'
import { ErrorContainer } from './Errors'
import { MenuItemProps } from './Menu'

import { CollapsibleMenu } from './Menu'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useSideNav, useCollapseSideNav } from '../context/ActionContext'
import { setBreakpoint, mergeSelectors } from '../utils/helper'
import { useLayout } from '../context/LayoutContext'

interface ContainerProps {
  isHeader: boolean
  [key: string]: any
}

const Container = ({ isHeader, ...props }: ContainerProps) =>
  isHeader ? <header {...props} /> : <div {...props} />

export interface SideNavProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  _css?: MakerProps['css']
  toggleButton?: MakerOptions['sideNav']['toggleButton']
  collapseButton?: MakerOptions['sideNav']['collapseButton']
  menu?: MenuItemProps[]
  pathname?: string
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
  background,
  toggleButton,
  collapseButton,
  menu,
  pathname,
  header,
  footer,
  className,
  _css,
  css,
  children,
  ...props
}: SideNavProps) => {
  // For fixed mobile version of SideNav
  const [active, setActive] = useSideNav()
  // For desktop collapsible version of SideNav
  const [collapse, setCollapse] = useCollapseSideNav()
  const { sideNav, breakpoints } = useOptions()
  const [layout] = useLayout('content')

  const customToggle = toggleButton || sideNav.toggleButton
  const customCollapse = collapseButton || sideNav.collapseButton
  const hasRootStyles = background || _css

  const attributes = (type: 'collapse' | 'toggle') => ({
    id: `${type}-sidenav`,
    title: `${type} side navigation`,
    'aria-label': `${type} side navigation`,
    onClick: type === 'collapse' ? setCollapse : setActive,
    breakpoints: setBreakpoint(sideNav.breakpoint, breakpoints),
  })

  function renderCollapseButton() {
    return typeof customCollapse === 'function' ? (
      customCollapse(collapse, attributes('collapse'))
    ) : sideNav.collapse ? (
      <Button
        {...attributes('collapse')}
        css={{
          display: ['none', 'inline-block'],
        }}>
        {customCollapse === 'default' ? (
          <svg
            className={mergeSelectors([
              'default-collapse',
              collapse ? 'rotate' : '',
            ])}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M9 19a1 1 0 01-.71-1.71l5.3-5.29-5.3-5.29a1 1 0 011.42-1.42l6 6a1 1 0 010 1.41l-6 6A1 1 0 019 19z" />
          </svg>
        ) : (
          customCollapse
        )}
      </Button>
    ) : null
  }

  return (
    <ErrorContainer errorKey="sideNav">
      {sideNav.closeOnBlur ? (
        <Overlay show={active} toggle={setActive} />
      ) : null}
      {layout === 'content sidenav' ? renderCollapseButton() : null}
      <Container
        isHeader={sideNav.isHeader}
        id={mergeSelectors(['sidenav', id])}
        className={mergeSelectors([
          !active ? 'hide-sidenav' : '',
          collapse ? 'collapse-sidenav' : '',
          className,
        ])}
        css={
          hasRootStyles
            ? {
                background,
                ...(_css as object),
              }
            : undefined
        }
        {...props}>
        <div className="container" css={css}>
          {header ? header : null}
          {children ? children : null}
          {menu ? (
            <CollapsibleMenu
              menu={menu}
              menuType="sideNav"
              pathname={pathname}
            />
          ) : null}
          {footer ? footer : null}
        </div>
      </Container>
      {typeof customToggle === 'function' ? (
        customToggle(active, attributes('toggle'))
      ) : sideNav.showToggleOnMobile ? (
        <Button
          {...attributes('toggle')}
          css={{
            display: ['inline-block', 'none'],
          }}>
          {customToggle === 'default'
            ? active
              ? 'close'
              : 'open'
            : customToggle}
        </Button>
      ) : null}
      {layout === 'sidenav content' ? renderCollapseButton() : null}
    </ErrorContainer>
  )
}

SideNav.displayName = 'SideNav'
