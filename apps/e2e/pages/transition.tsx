import { Div, Section } from 'maker-ui'
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
          <Div css={{ height: 400, background: 'gainsboro' }}>
            <h2>Regular CSS Transition</h2>
          </Div>
        </CSSTransition>
      </Section>
      <Section>
        <h2>Switch Transition w/boolean</h2>
        <button onClick={() => set2(!show2)}>
          {show2 ? 'Component 2' : 'Component 1'}
        </button>
        <CSSTransition isSwitch show={show2}>
          {show2 ? (
            <Div css={{ height: 400, background: 'gainsboro' }}>
              <h2>Component 1</h2>
            </Div>
          ) : (
            <Div css={{ height: 400, background: '#d7d7d7' }}>
              <h2>Component 2</h2>
            </Div>
          )}
        </CSSTransition>
      </Section>
      <Section>
        <h2>Switch CSS Transition w/key</h2>
        <button onClick={() => setKey(1)}>Key 1</button>
        <button onClick={() => setKey(2)}>Key 2</button>
        <button onClick={() => setKey(3)}>Key 3</button>
        <CSSTransition show={key}>
          <Div css={{ height: 400, background: 'gainsboro' }}>
            <h2>Switch CSS Transition</h2>
            <div>
              <strong>Active Key:</strong>
              {key}
            </div>
          </Div>
        </CSSTransition>
      </Section>
      <Section css={{ marginBottom: 300 }}>
        <button onClick={() => set1(!show1)}>
          {show1 ? 'Hide' : 'Reveal'}
        </button>
        <Transition show={show1}>
          <Div css={{ height: 400, background: 'gainsboro' }}>
            <h2>Regular Transition</h2>
          </Div>
        </Transition>
      </Section>
    </>
  )
}
