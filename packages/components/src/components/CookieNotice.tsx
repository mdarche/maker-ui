import * as React from 'react'

import { Announcement, AnnouncementProps } from './Announcement'

/**
 * The `CookieNotice` component is a pre-configured `Announcement` for GDPR cookie notices.
 * By default, it is fixed to the bottom of the page and activated with a cookie that expires
 * after 30 days.
 *
 * @link https://maker-ui.com/docs/components/cookie-notice
 */

export const CookieNotice = React.forwardRef<HTMLDivElement, AnnouncementProps>(
  (
    {
      background = '#000',
      color,
      storageKey = 'mui_cookie_notice',
      expiration,
      springConfig,
      closeButton = 'Got it!',
      top = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Announcement
        ref={ref}
        fixed
        bottom={!top ? true : false}
        background={background}
        color={color}
        type="cookie"
        storageKey={storageKey}
        closeButton={closeButton}
        springConfig={springConfig}
        {...props}>
        {children ||
          'We use cookies to ensure you get the best experience on our site.'}
      </Announcement>
    )
  }
)

CookieNotice.displayName = 'CookieNotice'
