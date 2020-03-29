import React, { useState } from 'react'
import { Box } from 'theme-ui'

import { CloseIcon } from './icons'

const Announcement = React.forwardRef(
  ({ pathname, urls = [], children, ...props }, ref) => {
    const [show, set] = useState(true)

    return urls.includes(pathname) ? (
      <Box ref={ref} {...props} __css={{}}>
        {children}
        <Box
          as="button"
          onClick={e => set(false)}
          sx={{ svg: { height: 24, fill: 'primary' } }}>
          <CloseIcon />
        </Box>
      </Box>
    ) : null
  }
)

export default Announcement
