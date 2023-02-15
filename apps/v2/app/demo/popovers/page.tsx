'use client'
import { useState, useRef } from 'react'
import { Section } from '@maker-ui/layout'
import { Popover, Dropdown, Tooltip } from '@maker-ui/popovers'
import { ColorButton } from '@/client'

export default function PopoverPage() {
  const [show, set] = useState(false)
  const ref = useRef(null)

  return (
    <Section>
      <ColorButton />
      <ColorButton
        renderProps={(currentMode, attributes) => (
          <button {...attributes} style={{ marginLeft: 10 }}>
            {currentMode} Custom
          </button>
        )}
      />
      <div style={{ height: 20 }} />
      <Tooltip label="Hover or Focus on me">
        <div>Info!</div>
      </Tooltip>
      <button ref={ref} onClick={(e) => set(!show)} style={{ marginRight: 10 }}>
        Popover toggle
      </button>
      <Popover
        anchorRef={ref}
        trapFocus
        position={{ x: 'left', y: 'top' }}
        // anchorWidth
        // position={{ x: 'right', y: 'bottom' }}
        show={show}
        set={set}>
        <div
          style={{
            background: 'gainsboro',
            height: 100,
          }}>
          <div>Simple popover</div>
          <ul style={{ margin: 0, padding: 10 }}>
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
        </div>
      </Popover>
      <div style={{ height: 20 }} />
      <Dropdown button="Dropdown" trapFocus>
        <div>
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
        </div>
      </Dropdown>
    </Section>
  )
}
