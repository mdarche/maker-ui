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
      <Tooltip background="purple" gap={5} label="test" position="left">
        Hover here!
      </Tooltip>
      <Popover
        anchorRef={buttonRef}
        // anchorWidth
        // position={{ x: 'right', y: 'bottom' }}
        show={show}
        set={set}>
        <Div
          css={{
            background: 'gainsboro',
            height: 100,
            ul: { margin: 0, padding: 10 },
          }}>
          <div>Simple popover</div>
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
        <Div
          css={{
            background: 'gainsboro',
            width: 200,
            padding: 16,
            ul: { margin: 0, padding: 0 },
          }}>
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
      <Div css={{ height: 500 }}>{/* <a href="/">Test</a> */}</Div>
    </>
  )
}

export default PopoverPage
