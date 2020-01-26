import React from 'react'
import { Flex } from 'theme-ui'

import { useModal } from '../context/ModalContext'

const Modal = () => {
  const [modal, setModal] = useModal()

  return (
    <Flex
      as="dialog"
      variant="modal"
      sx={{ justifyContent: 'center', alignItems: 'center' }}>
      {modal.component}
    </Flex>
  )
}

export default Modal
