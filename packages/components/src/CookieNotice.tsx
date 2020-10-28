import React from 'react'

import { Announcement, AnnouncementProps } from './Announcement'

/**
 * The `CookieNotice` component is a pre-configured `Announcement` for GDPR cookie notices.
 * By default, it is fixed to the bottom of the page and activated with a cookie that expires
 * after 30 days.
 *
 * @see https://maker-ui.com/docs/components/cookie-notice
 */

export const CookieNotice = React.forwardRef<HTMLDivElement, AnnouncementProps>(
  (
    {
      variant = 'cookie',
      bg = '#000',
      color,
      key = 'mui_cookie_notice',
      expiration,
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
        variant={variant}
        fixed
        bottom={!top ? true : false}
        bg={bg}
        color={color}
        trackerType="cookie"
        closeButton={closeButton}
        {...props}>
        {children ||
          'We use cookies to ensure you get the best experience on our site.'}
      </Announcement>
    )
  }
)
