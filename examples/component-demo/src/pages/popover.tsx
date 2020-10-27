import React, { useState, useRef } from 'react'
import { Div } from 'maker-ui'
import { Popover, Dropdown } from '@maker-ui/components'

const PopoverPage = () => {
  const [show, set] = useState(false)
  const buttonRef = useRef(null)

  return (
    <>
      <button ref={buttonRef} onClick={e => set(!show)}>
        Popover toggle
      </button>
      <Popover
        anchor={buttonRef}
        // anchorWidth
        origin={{ x: 'left', y: 'center' }}
        show={show}
        transition="fade">
        <Div sx={{ bg: 'gainsboro', height: 200, ul: { m: 0, p: 2 } }}>
          <ul>
            <li>Item</li>
            <li>Item</li>
            <li>Item</li>
          </ul>
        </Div>
      </Popover>
      <Dropdown buttonInner="Click here" matchWidth>
        <Div sx={{ bg: 'gainsboro', height: 200, ul: { m: 0, p: 2 } }}>
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

export default PopoverPage
