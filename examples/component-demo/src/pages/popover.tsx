import React, { useState, useRef } from 'react'
import { Div } from 'maker-ui'
import { Popover, Dropdown, Tooltip } from '@maker-ui/components'

const PopoverPage = () => {
  const [show, set] = useState(false)
  const buttonRef = useRef(null)

  return (
    <>
      <button ref={buttonRef} onClick={e => set(!show)}>
        Popover toggle
      </button>
      <Tooltip label="test">Hover here!</Tooltip>
      <Popover
        anchorRef={buttonRef}
        // anchorWidth
        // origin={{ x: 'left', y: 'center' }}
        show={show}
        toggle={set}>
        <Div sx={{ bg: 'gainsboro', height: 200, ul: { m: 0, p: 2 } }}>
          <ul>
            <li>
              <a href="https://google.com" target="_blank">
                Link1
              </a>
            </li>
            <li>
              <a href="https://google.com" target="_blank">
                Link2
              </a>
            </li>
            <li>
              <a href="https://google.com" target="_blank">
                Link3
              </a>
            </li>
          </ul>
        </Div>
      </Popover>
      <Dropdown buttonInner="Click here" matchWidth>
        <Div sx={{ bg: 'gainsboro', height: 200, p: 3, ul: { m: 0, p: 0 } }}>
          <ul>
            <li>
              <a href="https://google.com" target="_blank">
                Link1
              </a>
            </li>
            <li>
              <a href="https://google.com" target="_blank">
                Link2
              </a>
            </li>
            <li>
              <a href="https://google.com" target="_blank">
                Link3
              </a>
            </li>
          </ul>
        </Div>
      </Dropdown>
    </>
  )
}

export default PopoverPage
