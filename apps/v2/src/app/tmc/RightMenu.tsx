'use client'

import { Style } from 'maker-ui'
import { Form } from 'maker-ui/forms'
import { ColorButton, type MenuItem } from 'maker-ui/layout'
import { CSSTransition } from 'maker-ui/transition'
import { generateId, cn } from 'maker-ui/utils'
import { useState } from 'react'
import { AccountIcon, CloseIcon } from './icons'

const rightMenu: MenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Demo', path: '/demo' },
]

export const RightMenu = () => {
  const [styleId] = useState(generateId())
  const [show, set] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const authenticated = false

  // Check for auth session to determine what this button does

  return (
    <>
      <button className="naked" onClick={() => set(!show)}>
        <AccountIcon />
      </button>
      {!authenticated ? (
        <div className={cn(['right-menu'])}>
          <Style
            root={styleId}
            css={{
              height: '100%',
              width: 'var(--width-mobile-menu)',
              background: 'var(--color-background)',
              borderLeft: '1px solid var(--color-border-200)',
              '.temp-form': {
                height: 300,
                border: '1px solid var(--color-border-200)',
                margin: '0 15px',
              },
              ul: {
                margin: 0,
                padding: 0,
                listStyle: 'none',
                textTransform: 'uppercase',
              },
            }}
          />
          <CSSTransition
            show={show}
            type="fade-left"
            style={{ height: '100%' }}>
            <div className={styleId}>
              <button className="naked" onClick={() => set(!show)}>
                <CloseIcon />
              </button>
              <div className="flex flex-col justify-between">
                <div className="temp-form flex align-center justify-center">
                  Login Form
                </div>
                <div>
                  <ul>
                    <li>
                      <button className="naked">Connect Wallet</button>
                    </li>
                    <li>
                      <ColorButton
                        renderProps={(mode, atts) => (
                          <button {...atts}>{mode} Mode</button>
                        )}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      ) : null}
    </>
  )
}
