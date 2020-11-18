import * as React from 'react'
import { Modal } from '@maker-ui/components'
import PageSearch from '@maker-ui/page-search'
// import { SEO } from '@maker-ui/seo'

const ModalPage = () => {
  const [show, set] = React.useState(false)
  const ref = React.useRef(null)

  return (
    <div>
      <PageSearch sticky />
      <br />
      <br />
      <br />
      <button ref={ref} onClick={e => set(!show)}>
        Toggle Modal
      </button>
      <button>Fake button</button>
      <br />
      <br />
      <br />
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
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
        toggle={set}
        focusRef={ref}
        closeOnBlur
        center>
        <div>Hello!</div>
        <button>Test</button>
        <button>Yo</button>
        <button>Ya</button>
        <a href="https://google.com">Google link</a>
      </Modal>
    </div>
  )
}

export default ModalPage
