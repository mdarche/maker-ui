import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { Announcement, type AnnouncementProps } from './Announcement'

/**
 * The `CookieNotice` component is a pre-configured `Announcement` for GDPR cookie notices.
 * By default, it is fixed to the bottom of the page and activated with a browser cookie that
 * expires after 30 days.
 *
 * @link https://maker-ui.com/docs/elements/cookie-notice
 */
export const CookieNotice = React.forwardRef<HTMLDivElement, AnnouncementProps>(
  (
    {
      background = '#000',
      color,
      storageKey = 'mkui-cookie-notice',
      expiration,
      closeButton = 'Accept',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Announcement
        ref={ref}
        className={cn(['mkui-cookie-notice', className])}
        fixed
        background={background}
        color={color}
        type="cookie"
        storageKey={storageKey}
        closeButton={closeButton}
        {...props}>
        {children ||
          'We use cookies to ensure you get the best experience on our site.'}
      </Announcement>
    )
  }
)

CookieNotice.displayName = 'CookieNotice'
