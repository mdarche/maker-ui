'use client'
import { useState, useRef } from 'react'
import { Popover, Dropdown, Tooltip } from 'maker-ui/popovers'
import { useKeyboardShortcut } from 'maker-ui/hooks'
import { ColorButton, Section } from 'maker-ui/layout'

export default function PopoverPage() {
  const [show, set] = useState(false)
  const ref = useRef(null)
  const [count, setCount] = useState(0)

  const incrementCount = () => {
    setCount(count + 1)
  }

  useKeyboardShortcut([
    { key: 'Digit1', shiftKey: true, callback: incrementCount },
    {
      key: 'Digit2',
      callback: () => alert('Shortcut 2'),
    },
  ])

  return (
    <Section>
      <ColorButton />
      <div>Count is {count}</div>
      <div style={{ height: 200 }} />
      <Tooltip
        label="Hover or Focus on me"
        offset={30}
        position="right"
        styles={{
          tooltip: { color: '#fff', bg: '#000', padding: 20 },
          button: { bg: 'red', color: '#fff' },
        }}>
        <div>Info!</div>
      </Tooltip>
      <button ref={ref} onClick={(e) => set(!show)} style={{ marginRight: 10 }}>
        Popover toggle
      </button>
      <Popover
        anchorRef={ref}
        // trapFocus
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
      <Dropdown
        button="Dropdown"
        transition="fade-down"
        trapFocus
        styles={{
          dropdown: {
            bg: 'var(--color-background)',
            border: '1px solid gray',
            padding: 30,
          },
        }}>
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
                Link3
              </a>
            </li>
          </ul>
        </div>
      </Dropdown>
      <button>Test Button</button>
    </Section>
  )
}
