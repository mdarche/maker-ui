import React from 'react'
import { createPortal } from 'react-dom'
import { Box } from 'theme-ui'

const Portal = ({ children, root }) => {
  const node = document.getElementById(root)
  return createPortal(children, node)
}

const Modal = ({ children, root, show, toggle, bg = 'rgba(0, 0, 0, 0.5)' }) => {
  return show ? (
    <Portal root={root}>
      <Box
        onClick={e => toggle(false)}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 100,
          bg,
        }}>
        {children}
      </Box>
    </Portal>
  ) : null
}

export default Modal
