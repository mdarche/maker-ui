import React, { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { useTransition, animated as a } from 'react-spring'

import Modal from './Modal'

const AnimatedBox = a(Box)

const Lightbox = ({
  id,
  title,
  show,
  toggle,
  closeOnBlur,
  focusRef,
  isGallery = true,
  showInfo = true,
  children,
  ...props
}) => {
  const [index, setIndex] = useState(0)
  return (
    <Modal
      id={id}
      show={show}
      toggle={toggle}
      focusRef={focusRef}
      closeOnBlur
      {...props}>
      <AnimatedBox className="canvas">Lightbox Content</AnimatedBox>
      <Box className="toolbar">
        {isGallery && <Box className="pagination"></Box>}
        <Flex>
          <button>Zoom</button>
          <button>Play</button>
          <button>Grid</button>
          <button>Close</button>
        </Flex>
      </Box>
      {isGallery && (
        <Box className="navigation">
          <button>Previous</button>
          <button>Next</button>
        </Box>
      )}
      {showInfo && (
        <Box className="info-bar">
          <h4>Title</h4>
          <p>Description</p>
        </Box>
      )}
    </Modal>
  )
}

// Cursor: zoom-in

export default Lightbox
