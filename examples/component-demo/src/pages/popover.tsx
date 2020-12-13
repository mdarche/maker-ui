import * as React from 'react'
import { Div } from 'maker-ui'
import { Popover, Dropdown, Tooltip } from '@maker-ui/components'

const PopoverPage = () => {
  const [show, set] = React.useState(false)
  const buttonRef = React.useRef(null)

  return (
    <>
      <button ref={buttonRef} onClick={e => set(!show)}>
        Popover toggle
      </button>
      <Tooltip bg="purple" gap={5} label="test" position="left">
        Hover here!
      </Tooltip>
      <Popover
        anchorRef={buttonRef}
        // anchorWidth
        // position={{ x: 'right', y: 'bottom' }}
        show={show}
        toggle={set}>
        <Div sx={{ bg: 'gainsboro', height: 100, ul: { m: 0, p: 2 } }}>
          <ul>
            <li>
              <a href="https://google.com" target="_blank" rel="noreferrer">
                Link1
              </a>
            </li>
            <li>
              <a href="https://google.com" target="_blank" rel="noreferrer">
                Link2
              </a>
            </li>
            <li>
              <a href="https://google.com" target="_blank" rel="noreferrer">
                Link3
              </a>
            </li>
          </ul>
        </Div>
      </Popover>
      <Dropdown buttonInner="Click here" transition="scale" trapFocus>
        <Div sx={{ bg: 'gainsboro', width: 200, p: 3, ul: { m: 0, p: 0 } }}>
          <ul>
            <li>
              <a href="https://google.com" target="_blank" rel="noreferrer">
                Link1
              </a>
            </li>
            <li>
              <a href="https://google.com" target="_blank" rel="noreferrer">
                Link2
              </a>
            </li>
            <li>
              <a href="https://google.com" target="_blank" rel="noreferrer">
                Link314
              </a>
            </li>
          </ul>
        </Div>
      </Dropdown>
      <Div sx={{ height: 500 }}>{/* <a href="/">Test</a> */}</Div>
    </>
  )
}

export default PopoverPage
