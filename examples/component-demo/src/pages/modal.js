import React, { useState, useRef } from 'react'
import { Modal } from '@elements-ui/components'

const ModalPage = () => {
  const [show, set] = useState(false)
  const ref = useRef(null)

  return (
    <div>
      <button ref={ref} onClick={e => set(!show)}>
        Toggle Modal
      </button>
      <button>Fake button</button>
      <Modal
        id="modal-root"
        show={show}
        toggle={set}
        focusRef={ref}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        closeOnBlur>
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
