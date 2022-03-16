import * as React from 'react'
import { Section, Div, Button, ColorButton } from 'maker-ui'
import { Popover, Dropdown, Tooltip } from '@maker-ui/popovers'

const PopoverPage = () => {
  const [show, set] = React.useState(false)
  const buttonRef = React.useRef(null)

  return (
    <Section css={{ paddingTop: 50 }}>
      <ColorButton />
      <Button
        ref={buttonRef}
        onClick={(e) => set(!show)}
        css={{ marginRight: 10 }}>
        Popover toggle
      </Button>
      <Tooltip background="purple" label="Info" position="bottom" gap={10}>
        <Div css={{ height: 200, width: 300 }}>Info!</Div>
      </Tooltip>
      <Popover
        anchorRef={buttonRef}
        trapFocus
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
      <Dropdown button="Click here" transition="fade-down" trapFocus>
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
    </Section>
  )
}

export default PopoverPage
