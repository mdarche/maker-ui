'use client'

import { useRef, useState } from 'react'
import { Popover } from 'maker-ui/popovers'
import { MenuButton } from 'maker-ui/layout'

export default function WorkspacePage() {
  const [show, set] = useState(false)
  const ref = useRef(null)
  return (
    <div>
      <h1>About Page</h1>
      <MenuButton type="ws-right">Right Panel</MenuButton>
      <p>Lorem ipsum</p>
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
    </div>
  )
}
