import * as React from 'react'
import { cn, generateId } from '@maker-ui/utils'
import { useStorage } from '@maker-ui/hooks'
import { Style, type MakerCSS } from '@maker-ui/style'
import { CloseIcon } from './Icons'

export interface AnnouncementProps
  extends MakerCSS,
    React.HTMLAttributes<HTMLDivElement> {
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
      allowClose = true,
      background,
      breakpoints,
      children,
      className,
      color,
      closeButton = <CloseIcon style={{ height: 27, fill: color }} />,
      css,
      mediaQuery,
      expiration = 2592000, // 30 days
      fixed = false,
      storageKey = 'mkui_announcement',
      type = 'cookie',
      ...props
    },
    ref
  ) => {
    const [styleID] = React.useState(generateId())
    const [show, set] = React.useState(true)
    const active = useStorage({
      key: storageKey,
      value: { show },
      type,
      expires: expiration,
    })

    const btnAttributes = {
      className: 'mkui-btn-close-announcement',
      title: 'Dismiss',
      'aria-label': 'Dismiss',
      onClick: () => set(false),
    }

    return active !== 'true' && show ? (
      <div
        ref={ref}
        className={cn([
          'mkui-announcement flex align-center',
          styleID,
          fixed ? 'fixed' : '',
          className,
        ])}
        {...props}>
        <Style
          root={styleID}
          breakpoints={breakpoints}
          mediaQuery={mediaQuery}
          css={{ background, color, ...css }}
        />
        <div className="container flex align-center width-100">
          <div className="mkui-announcement-text flex flex-1 flex-wrap">
            {children}
          </div>
          {allowClose ? (
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
