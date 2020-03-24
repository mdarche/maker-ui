import React, { useState, useEffect } from 'react'
import { Box, Flex } from 'theme-ui'
import { useTransition, animated as a } from 'react-spring'

import { LightboxProvider, useLightbox } from './LightboxProvider'
import Modal from './Modal'

const AnimatedBox = a(Box)

const LightboxModal = ({
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
  const { active, toggleLightbox } = useLightbox()
  const [index, setIndex] = useState(0)

  return (
    <React.Fragment>
      {children}
      <Modal
        id={id}
        show={active}
        toggle={toggleLightbox}
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
    </React.Fragment>
  )
}

const Lightbox = ({ children, ...props }) => (
  <LightboxProvider>
    <LightboxModal {...props}>{children}</LightboxModal>
  </LightboxProvider>
)

export default Lightbox
