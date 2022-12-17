'use client'
import { Section } from '@maker-ui/layout'
import { CSSTransition, Transition } from '@maker-ui/modal'
import { useState } from 'react'

export default function TransitionPage() {
  const [show, set] = useState(false)
  const [show1, set1] = useState(false)
  const [show2, set2] = useState(false)
  const [key, setKey] = useState(1)

  return (
    <>
      <Section>
        <button onClick={() => set(!show)}>{show ? 'Hide' : 'Reveal'}</button>
        <CSSTransition show={show}>
          <div style={{ height: 400, background: 'gainsboro' }}>
            <h2>Regular CSS Transition</h2>
          </div>
        </CSSTransition>
      </Section>
      <Section>
        <h2>Switch Transition w/boolean</h2>
        <button onClick={() => set2(!show2)}>
          {show2 ? 'Component 2' : 'Component 1'}
        </button>
        <CSSTransition isSwitch show={show2}>
          {show2 ? (
            <div style={{ height: 400, background: 'gainsboro' }}>
              <h2>Component 1</h2>
            </div>
          ) : (
            <div style={{ height: 400, background: '#d7d7d7' }}>
              <h2>Component 2</h2>
            </div>
          )}
        </CSSTransition>
      </Section>
      <Section>
        <h2>Switch CSS Transition w/key</h2>
        <button onClick={() => setKey(1)}>Key 1</button>
        <button onClick={() => setKey(2)}>Key 2</button>
        <button onClick={() => setKey(3)}>Key 3</button>
        <CSSTransition show={key}>
          <div style={{ height: 400, background: 'gainsboro' }}>
            <h2>Switch CSS Transition</h2>
            <div>
              <strong>Active Key:</strong>
              {key}
            </div>
          </div>
        </CSSTransition>
      </Section>
      <Section style={{ marginBottom: 300 }}>
        <button onClick={() => set1(!show1)}>
          {show1 ? 'Hide' : 'Reveal'}
        </button>
        <Transition show={show1}>
          <div style={{ height: 400, background: 'gainsboro' }}>
            <h2>Regular Transition</h2>
          </div>
        </Transition>
      </Section>
    </>
  )
}
