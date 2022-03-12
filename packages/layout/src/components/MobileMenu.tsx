/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, type MakerProps, type ResponsiveScale } from '@maker-ui/css'
import { mergeSelectors } from '@maker-ui/utils'
import { forwardRef, Fragment } from 'react'

import type { MakerOptions } from '../types'
import { CollapsibleMenu, MenuButton, MenuItemProps } from './Menu'
import { ErrorContainer } from './Errors'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'

interface MobileMenuProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Overrides `mobileMenu.transition` that you can set in Maker UI options.   */
  transition?: MakerOptions['mobileMenu']['transition']
  /** Overrides the MobileMenu's default `--color-bg_mobileMenu` background value that you can set in Maker UI options. */
  background?: string | string[]
  /** Overrides `mobileMenu.width` that you can set in Maker UI options.   */
  width?: ResponsiveScale
  /** If you supply a MakerMenu array to this prop, the MobileMenu will render an accessible menu complete with nested dropdowns. */
  menu?: MenuItemProps[]
  /** If true, this will center the inner contents of your MobileMenu with flexbox positioning.
   * @default false
   */
  center?: boolean
  /** Your app's current path. This will add a `.current` class and `aria-current` to the active menu item. This feature is only useful if you use the `menu` prop. */
  pathname?: string
  /** Overrides `mobileMenu.closeButton` that you can set in Maker UI options.   */
  closeButton?: MakerOptions['mobileMenu']['closeButton']
  /** Determines where to position the MobileMenu's default close button while activated. */
  closeButtonPosition?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
  /** A custom component that is inserted into the MobileMenu above its main content */
  header?: React.ReactElement
  /** A custom component that is inserted into the MobileMenu below its main content */
  footer?: React.ReactElement
}

/* Utility for mobile nav transitions that require a full-width window */
const fullWidth = ['fade', 'fade-up', 'fade-down']

/**
 * The `MobileMenu` component lets you customize a responsive overlay menu for mobile navigation.
 *
 * @link https://maker-ui.com/docs/layout/mobile-menu
 */
export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  (props, ref) => {
    const [show, toggleMenu] = useMenu()
    const { mobileMenu } = useOptions()
    const {
      id,
      background,
      center,
      closeButton = mobileMenu.closeButton,
      closeButtonPosition = 'top-right',
      width,
      transition = mobileMenu.transition,
      menu = [],
      pathname,
      header,
      footer,
      className,
      css,
      children,
      ...rest
    } = props
    const cssValues = background || width || css

    return (
      <Fragment>
        {mobileMenu.closeOnBlur && !fullWidth.includes(transition) ? (
          <Overlay className="mobile-overlay" show={show} toggle={toggleMenu} />
        ) : null}
        <div
          ref={ref}
          id={mergeSelectors(['mobile-menu', id])}
          className={mergeSelectors([
            show ? 'active' : undefined,
            center ? 'center' : undefined,
            fullWidth.includes(transition) ? 'full-width' : undefined,
            `close-${closeButtonPosition}`,
            transition,
            className,
          ])}
          css={
            typeof cssValues !== 'undefined'
              ? {
                  background,
                  width,
                  ...(css as object),
                }
              : undefined
          }
          {...rest}>
          <ErrorContainer errorKey="mobileMenu">
            {mobileMenu.showCloseButton || closeButton ? (
              <MenuButton customButton={closeButton} isCloseButton />
            ) : null}
            {header ? header : null}
            {children || (
              <CollapsibleMenu
                menu={menu}
                menuType="mobile"
                pathname={pathname}
              />
            )}
            {footer ? footer : null}
          </ErrorContainer>
        </div>
      </Fragment>
    )
  }
)

MobileMenu.displayName = 'MobileMenu'
