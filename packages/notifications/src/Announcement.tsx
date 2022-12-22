'use client'

import * as React from 'react'
import { cn } from '@maker-ui/utils'
import { useTracker } from '@maker-ui/hooks'

export interface AnnouncementProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The browser storage key that stores the dismiss expiration value
   * @default "maker_dismiss_announce"
   */
  storageKey?: string
  /** If true, the component will use fixed positioning and adhere to the screen on scroll
   * @default false
   */
  fixed?: boolean
  /** The background color of the Announcement or CookieNotice component */
  background?: string
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
      closeButton = <CloseIcon style={{ height: 27, fill: color }} />,
      bottom = false,
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
      style: {
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        padding: '0 15px',
        color,
      },
    }

    return active ? (
      <div
        ref={ref}
        className={cn(['announcement flex align-center', className])}
        style={{
          background,
          color,
          ...fixedPartial(fixed, bottom),
        }}>
        <div className="container flex align-center width-100">
          <div className="announcement-text flex flex-1 flex-wrap" {...props}>
            {children}
          </div>
          {allowClose && !closeButton ? (
            typeof closeButton === 'function' ? (
              // @ts-ignore
              closeButton(btnAttributes)
            ) : (
              <button {...btnAttributes}>{closeButton}</button>
            )
          ) : null}
        </div>
      </div>
    ) : null
  }
)

Announcement.displayName = 'Announcement'

const CloseIcon = (props: React.HtmlHTMLAttributes<HTMLOrSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
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
