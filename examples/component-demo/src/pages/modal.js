import React, { useState } from 'react'
import Modal from '@elements-ui/modal'

const ModalPage = () => {
  const [show, set] = useState(false)

  return (
    <div>
      <button onClick={e => set(!show)}>Toggle Modal</button>
      <Modal root="modal-root" show={show} toggle={set}>
        <div>Hello!</div>
      </Modal>
    </div>
  )
}

export default ModalPage
