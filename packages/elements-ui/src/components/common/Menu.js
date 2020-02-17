import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../../context/OptionContext'
import setBreak from '../../config/breakpoint'
import MenuItem from './MenuItem'

// const isBrowser = typeof window !== 'undefined'

// function useRoute() {
//   return isBrowser ? window.location.pathname : ''
// }

// TODO - write browser side location hook

const Menu = React.memo(({ menuItems = [] }) => {
  const { header } = useOptions()

  return (
    <Box
      as="nav"
      className="nav-primary"
      sx={{ display: setBreak(header.breakIndex, ['none', 'flex']) }}>
      <Box as="ul" variant="header.menu" className="menu-primary">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={header.dropdown.caret}
            // location={useRoute()}
            isHeader
          />
        ))}
      </Box>
    </Box>
  )
})

export default Menu
