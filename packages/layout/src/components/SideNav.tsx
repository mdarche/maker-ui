/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { Button } from '@maker-ui/primitives'

import { MakerOptions } from '../types'
import { ErrorBoundary } from './Errors/ErrorBoundary'
import { MenuItemProps } from './Menu'

import { CollapsibleMenu } from './Menu'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useSideNav, useCollapseSideNav } from '../context/ActionContext'
import { setBreakpoint, mergeSelectors } from '../utils/helper'

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
 * The `SideNav` component creates a side navigation panel alongside the page's main
 * content. It can be toggled open or closed on mobile or it can serve as the page's
 * primary <header> tag.
 *
 * @link https://maker-ui.com/docs/layout/sidenav
 */

export const SideNav = ({
  id,
  background = 'var(--color-bg_sideNav)',
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

  const customToggle = toggleButton || sideNav.toggleButton
  const customCollapse = collapseButton || sideNav.collapseButton

  const attributes = (type: 'collapse' | 'toggle') => ({
    id: `${type}-sidenav`,
    title: `${type} side navigation`,
    'aria-label': `${type} side navigation`,
    onClick: type === 'collapse' ? setCollapse : setActive,
    breakpoints: setBreakpoint(sideNav.breakpoint, breakpoints),
  })

  return (
    <ErrorBoundary errorKey="sideNav">
      {sideNav.closeOnBlur ? (
        <Overlay show={active} toggle={setActive} />
      ) : null}
      <Container
        isHeader={sideNav.isHeader}
        id={mergeSelectors(['sidenav', id])}
        className={mergeSelectors([
          !active ? 'hide-sidenav' : '',
          collapse ? 'collapse-sidenav' : '',
          className,
        ])}
        css={{
          background,
          ...(_css as object),
        }}
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
            position: 'fixed',
            display: ['inline-block', 'none'],
            bottom: 30,
            zIndex: 100,
          }}>
          {customToggle === 'default'
            ? active
              ? 'close'
              : 'open'
            : customToggle}
        </Button>
      ) : null}
      {typeof customCollapse === 'function' ? (
        customCollapse(collapse, attributes('collapse'))
      ) : sideNav.collapse ? (
        <Button
          {...attributes('collapse')}
          css={{
            position: 'fixed',
            display: ['none', 'inline-block'],
            bottom: 30,
            zIndex: 100,
          }}>
          {customCollapse === 'default'
            ? collapse
              ? 'open'
              : 'collapse'
            : customCollapse}
        </Button>
      ) : null}
    </ErrorBoundary>
  )
}

SideNav.displayName = 'SideNav'
