/** @jsx jsx */
import { jsx } from 'theme-ui'

import { MakerProps, MakerOptions } from './types'
import { ErrorBoundary } from './ErrorBoundary'
import { MenuProps } from './Menu'
import { Button } from './Primitives'

import { CollapsibleMenu } from './Menu'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'
import { setBreakpoint } from '../utils/helper'
// import { useMeasure } from '../hooks/useMeasure'

const Container = ({ isHeader, ...props }) =>
  isHeader ? <header {...props} /> : <div {...props} />

interface SideNavProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  bg?: string | string[]
  toggleButton?: MakerOptions['sideNav']['toggleButton']
  menu?: MenuProps[]
  pathname?: string
  header?: React.ReactElement
  footer?: React.ReactElement
}

/**
 * The `SideNav` component creates a side navigation panel alongside the page's main
 * content. It can be toggled open or closed on mobile or it can serve as the page's
 * primary <header> tag.
 *
 * @see https://maker-ui.com/docs/layout/sidenav
 */

export const SideNav = ({
  bg = 'bg_sideNav',
  background,
  toggleButton,
  variant = 'sideNav',
  menu,
  pathname,
  header,
  footer,
  children,
  ...props
}: SideNavProps) => {
  const [active, setActive] = useSideNav()
  const { sideNav } = useOptions()

  const bp = sideNav.bpIndex
  const customButton = toggleButton || sideNav.toggleButton

  const toggleAttributes = {
    id: 'toggle-sidenav',
    title: 'Toggle side navigation',
    'aria-label': 'Toggle side navigation',
    onClick: setActive,
  }

  return (
    <ErrorBoundary errorKey="sideNav">
      {sideNav.closeOnBlur ? (
        <Overlay
          show={active}
          toggle={setActive}
          type="sideNav"
          bp={sideNav.bpIndex}
        />
      ) : null}
      <Container
        isHeader={sideNav.isHeader}
        id="sidenav"
        className={!active ? 'hide' : null}
        sx={{
          bg,
          background,
          variant,
        }}
        {...props}>
        <div className="container">
          {header ? header : null}
          {children || menu ? (
            <CollapsibleMenu
              menu={menu}
              menuType="sideNav"
              pathname={pathname}
            />
          ) : null}
          {footer ? footer : null}
        </div>
      </Container>
      {typeof customButton === 'function' ? (
        customButton(active, toggleAttributes)
      ) : sideNav.showToggleOnMobile ? (
        <Button
          {...toggleAttributes}
          sx={{
            variant: `${variant}.toggle`,
            position: 'fixed',
            display: setBreakpoint(bp, ['inline-block', 'none']),
            bottom: 30,
            zIndex: 100,
          }}>
          {customButton === 'default'
            ? active
              ? 'close'
              : 'open'
            : customButton}
        </Button>
      ) : null}
    </ErrorBoundary>
  )
}

SideNav.displayName = 'SideNav'
