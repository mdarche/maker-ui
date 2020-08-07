import React, { useState, useRef } from 'react'
import { Div } from 'maker-ui'
import { Popover as Dropdown } from '@maker-ui/components'

const TabsPage = () => {
  const [show, set] = useState(false)
  const buttonRef = useRef(null)

  return (
    <>
      <button ref={buttonRef} onClick={e => set(!show)}>
        Popover toggle
      </button>
      <Dropdown
        anchor={buttonRef}
        origin={{ x: 'center', y: 'center' }}
        show={show}
        transition="fade-down"
        set={set}>
        <Div sx={{ bg: 'gainsboro', height: 100, ul: { m: 0, p: 2 } }}>
          <ul>
            <li>Item</li>
            <li>Item</li>
            <li>Item</li>
          </ul>
        </Div>
      </Dropdown>
    </>
  )
}

export default TabsPage
