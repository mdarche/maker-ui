import { useState, useRef } from 'react'
import { Modal } from '@maker-ui/modal'
import { Section } from 'maker-ui'

export default function ModalPage() {
  const [show, set] = useState(false)
  const ref = useRef(null)

  return (
    <Section>
      <br />
      <br />
      <br />
      <button ref={ref} onClick={(e) => set(!show)}>
        Toggle Modal
      </button>
      <button>Fake button</button>
      <br />
      <br />
      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nost
      </p>
      <p>
        Vivamus posuere condimentum leo eu hendrerit. Pellentesque placerat
        iaculis ante a rhoncus. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Vestibulum eu ipsum ac magna congue congue sed maximus
        tortor. Vivamus id odio elementum, vehicula nunc ut, efficitur felis.
        Nullam hendrerit velit libero, gravida porttitor tortor ullamcorper eu.
        Ut ut lectus non enim sagittis aliquam quis in orci. Donec a arcu eu
        eros cursus cursus. Donec dictum dignissim tellus, dictum egestas purus
        pellentesque sed
      </p>
      <div style={{ height: '300vh' }}>Test</div>
      <Modal
        id="modal-root"
        show={show}
        set={set}
        focusRef={ref}
        closeOnBlur
        center
        css={{ padding: 50 }}>
        {/* <div style={{ height: 2000, width: 500, background: '#fff' }}>test</div> */}
        <div>Hello!</div>
        <button className="target-button">Test</button>
        <button>Yo</button>
        <button>Ya</button>
        <a href="https://google.com" rel="noreferrer" target="_blank">
          Google link
        </a>
      </Modal>
      {/* <Modal
        id="modal-root"
        show={show}
        set={set}
        focusRef={ref}
        closeOnBlur
        center>
        <div>Hello!</div>
        <button className="target-button">Test</button>
        <button>Yo</button>
        <button>Ya</button>
        <a href="https://google.com">Google link</a>
      </Modal> */}
    </Section>
  )
}
