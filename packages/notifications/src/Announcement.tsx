import * as React from 'react'
import {
  Flex,
  Button,
  SVG,
  type DivProps,
  type SVGProps,
} from '@maker-ui/primitives'
import { StyleObject } from '@maker-ui/css'
import { useTracker, mergeSelectors } from '@maker-ui/utils'

export interface AnnouncementProps extends DivProps {
  /** The browser storage key that stores the dismiss expiration value
   * @default "maker_dismiss_announce"
   */
  storageKey?: string
  /** If true, the component will use fixed positioning and adhere to the screen on scroll
   * @default false
   */
  fixed?: boolean
  /** The background color of the Announcement or CookieNotice component */
  background?: string | string[]
  /** The local storage tracker type
   * @default
   * "session" for Announcement
   * "cookie" for CookieNotice
   */
  type?: 'session' | 'cookie'
  /** The storage expiration in seconds that determines how long the component will be hidden from
   * the user's current session.
   * @default 2593000 (30 days)
   */
  expiration?: number
  /** When true, users will be able to dismiss the announcement with a close button.
   * @default true
   */
  allowClose?: boolean
  /** An optional button or callback function that will be used in place of
   *  the default close button.
   */
  closeButton?: React.ReactNode | ((attributes?: object) => React.ReactNode)
  /** When true, the announcement will appear at the bottom of the screen. This only has
   * an effect if `fixed` is set to `true`.
   */
  bottom?: boolean
  /** Responsive styles that will be applied to the root Announcement container.
   * Use `css` to apply styles to the inner container.
   */
  _css?: StyleObject
}

/**
 * The `Announcement` component renders a dismissable message to the top or bottom of the web page.
 * You can choose the user's session or attach a cookie to determine when it appears / re-appears.
 *
 * @link https://maker-ui.com/docs/elements/announcement
 */
export const Announcement = React.forwardRef<HTMLDivElement, AnnouncementProps>(
  (
    {
      storageKey = 'maker_dismiss_announce',
      background = 'var(--color-primary)',
      className,
      color = '#fff',
      fixed = false,
      type = 'session',
      expiration = 2592000, // 30 days
      allowClose = true,
      closeButton = <CloseIcon />,
      bottom = false,
      _css,
      css,
      children,
      ...props
    },
    ref
  ) => {
    const [show, set] = React.useState(true)
    const active = useTracker({ type, storageKey, show, expiration })

    const btnAttributes = {
      className: 'announcement-close',
      title: 'Dismiss',
      'aria-label': 'Dismiss',
      onClick: () => set(false),
      css: {
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        padding: '0 15px',
        color,
        svg: { height: 27, fill: color },
      },
    }

    return active ? (
      <Flex
        ref={ref}
        className={mergeSelectors(['announcement', className])}
        align="center"
        css={{
          background,
          color,
          ...fixedPartial(fixed, bottom),
          ...(_css as object),
        }}>
        <Flex
          className="container"
          align="center"
          css={{ width: '100%', ...(css as object) }}>
          <Flex
            className="announcement-text"
            css={{
              flex: 1,
              flexWrap: 'wrap',
            }}
            {...props}>
            {children}
          </Flex>
          {allowClose && !closeButton ? (
            typeof closeButton === 'function' ? (
              // @ts-ignore
              closeButton(btnAttributes)
            ) : (
              <Button {...btnAttributes}>{closeButton}</Button>
            )
          ) : null}
        </Flex>
      </Flex>
    ) : null
  }
)

Announcement.displayName = 'Announcement'

const CloseIcon = (props: SVGProps) => (
  <SVG {...props} viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </SVG>
)

/**
 * Returns a CSS object that positions the announcement bar
 *
 * @param fixed - boolean that determines fixed position
 * @param bottom - boolean that indicates bottom position
 *
 */
const fixedPartial = (fixed: boolean, bottom: boolean): object | undefined =>
  fixed
    ? {
        position: 'fixed',
        left: 0,
        right: 0,
        top: !bottom && 0,
        bottom: bottom && 0,
        zIndex: 1000,
      }
    : undefined
