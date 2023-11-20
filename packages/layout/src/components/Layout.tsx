import * as React from 'react'
import { Conditional, cn, merge } from '@maker-ui/utils'
import {
  Skiplinks,
  Header,
  Footer,
  Topbar,
  MobileMenu,
  Main,
  Sidebar,
  Panel,
  defaultSettings,
  type MakerUIOptions,
  type Options,
  type MenuItemProps,
  type LayoutButtonProps,
  type PanelProps,
} from '@maker-ui/layout-server'
import { Menu, MenuButton, LayoutSettings } from '@maker-ui/layout-client'

interface LayoutProps {
  /** You can use Layout dot children to build layouts with JSX */
  children?: React.ReactNode
  /** A valid Maker UI Options configuration object */
  options?: MakerUIOptions
  /** Allows you to nest multiple different layouts without re-rerendering container components */
  fragment?: boolean
}

function isMenu(i: any): i is MenuItemProps[] {
  return !!(i && typeof i[0] === 'object' && i[0].label)
}

function isIcon(i: any): i is LayoutButtonProps {
  return !!(i && typeof i === 'object' && ('icon' in i || 'defaultIcon' in i))
}

const LeftPanel = (props: PanelProps) => <Panel {...props} />
LeftPanel.defaultProps = { _type: 'leftPanel' }

const RightPanel = (props: PanelProps) => <Panel {...props} />
RightPanel.defaultProps = { _type: 'rightPanel' }

/**
 * This function sorts all Layout dot children into an object with corresponding keys.
 * We use this to merge JSX with the slots prop and MakerUIOptions.
 */
function assign(children: React.ReactNode) {
  let c: { [k: string]: any } = {}
  let layout = 'content'

  React.Children.toArray(children).forEach((child: any) => {
    const type = child.props._type
    if (type) {
      c[type] = child
    } else {
      c['children'] = child
    }
  })

  if (c.leftPanel && !c?.rightPanel) layout = 'left-content'
  if (c.rightPanel && !c?.leftPanel) layout = 'content-right'
  if (c.leftPanel && c.rightPanel) layout = 'left-content-right'

  return { slots: c, layoutType: layout }
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 *
 * @link https://maker-ui.com/docs/layout/layout
 */
export const Layout = ({
  options = {},
  fragment = false,
  children,
}: LayoutProps) => {
  const opts = merge(defaultSettings, options) as Options
  const { slots, layoutType } = assign(children)
  // Helpers
  const isPanel = !!(slots.leftPanel || slots.rightPanel)
  const isSidebar = !!slots.sidebar
  const dir = opts?.content?.sidebar || 'left'

  /**
   * Merged and formatted props for the Header component.
   */
  const headerProps = merge(opts.header, {
    ...slots?.header?.props,
    menu: isMenu(slots?.header?.props?.menu) ? (
      <Menu nav items={slots.header.props.menu} />
    ) : (
      slots?.header?.props?.menu
    ),
    menuSplit: isMenu(slots?.header?.props?.menuSplit) ? (
      <Menu nav items={slots.header.props.menuSplit} />
    ) : (
      slots?.header?.props?.menuSplit
    ),
    menuButton: isIcon(slots?.header?.props?.menuButton) ? (
      <MenuButton type="mobile-menu" {...slots.header.props.menuButton} />
    ) : (
      slots?.header?.props?.menuButton
    ),
  })

  /**
   * Merged and formatted props for the MobileMenu component.
   */
  const mobileMenuProps = merge(opts.mobileMenu, {
    ...slots?.mobileMenu?.props,
    closeButton: isIcon(slots?.mobileMenu?.props?.closeButton) ? (
      <MenuButton type="mobile-menu" {...slots.mobileMenu.props.closeButton} />
    ) : (
      slots?.mobileMenu?.props?.closeButton
    ),
    children: isMenu(slots?.mobileMenu?.props?.menu) ? (
      <Menu items={slots.mobileMenu.props.menu} />
    ) : (
      slots?.mobileMenu?.props?.children
    ),
  })

  /**
   * Merged and formatted props for the Left Panel.
   */
  const leftProps = merge(opts.leftPanel || {}, {
    ...slots?.leftPanel?.props,
    menuButton: isIcon(slots?.leftPanel?.props?.menuButton) ? (
      <MenuButton type="left-panel" {...slots.leftPanel?.props?.menuButton} />
    ) : (
      slots?.leftPanel?.menuButton
    ),
  })

  /**
   * Merged and formatted props for the Right Panel.
   */
  const rightProps = merge(opts.rightPanel || {}, {
    ...slots?.rightPanel?.props,
    menuButton: isIcon(slots?.rightPanel?.props?.menuButton) ? (
      <MenuButton type="right-panel" {...slots.rightPanel?.props?.menuButton} />
    ) : (
      slots?.rightPanel?.menuButton
    ),
  })

  return (
    <>
      {(fragment && options) || slots?.settings ? (
        <LayoutSettings options={options} />
      ) : null}
      {!fragment && <Skiplinks links={opts.skiplinks} />}
      {slots?.topbar && <Topbar {...merge(opts.topbar, slots.topbar.props)} />}
      {slots?.header ? (
        <Header
          {...headerProps}
          _mobileMenu={
            slots?.mobileMenu ? <MobileMenu {...mobileMenuProps} /> : null
          }
        />
      ) : null}
      {slots?.children || (
        <div
          className={cn([
            'mkui-layout',
            !fragment ? 'mkui-layout-init' : undefined,
            isPanel ? 'panel' : undefined,
            slots?.leftPanel && leftProps?.defaultOpen
              ? 'left-active'
              : undefined,
            slots?.rightPanel && rightProps?.defaultOpen
              ? 'right-active'
              : undefined,
            layoutType,
          ])}>
          {isPanel && <div className="mkui-overlay panel" role="button" />}
          {slots?.leftPanel && <LeftPanel {...leftProps} />}
          <Conditional
            condition={isSidebar}
            trueWrapper={(c) => (
              <div className={cn(['mkui-content-wrapper', `sidebar-${dir}`])}>
                <Sidebar {...slots?.sidebar?.props} />
                {c}
              </div>
            )}>
            <Main {...slots?.main?.props} />
          </Conditional>
          {slots?.rightPanel && <RightPanel {...rightProps} />}
        </div>
      )}
      {slots?.footer && <Footer {...slots.footer.props} />}
    </>
  )
}

Layout.Header = Header
Layout.MobileMenu = MobileMenu
Layout.Topbar = Topbar
Layout.Main = Main
Layout.Footer = Footer
Layout.Sidebar = Sidebar
Layout.LeftPanel = LeftPanel
Layout.RightPanel = RightPanel
Layout.Settings = LayoutSettings

Layout.displayName = 'Layout'
