import React from 'react'

import Announcement from './Announcement'

const CookieNotice = React.forwardRef(
  (
    {
      variant = 'cookie',
      bg = '#000',
      color,
      key = 'mui_cookie_notice',
      expiration,
      closeButton,
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
        closeButton="Got it!"
        {...props}>
        {children ||
          'We use cookies to ensure you get the best experience on our site.'}
      </Announcement>
    )
  }
)

export default CookieNotice
