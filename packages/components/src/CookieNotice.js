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
          'This site uses cookies to enhance the user experience. By continuing to browse the site, you agree to our use of cookies.'}
      </Announcement>
    )
  }
)

export default CookieNotice
