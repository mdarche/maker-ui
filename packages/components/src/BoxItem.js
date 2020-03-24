import React, { useRef, useEffect, useCallback } from 'react'
import { Box } from 'theme-ui'

import { useLightbox } from './LightboxProvider'

const BoxItem = ({ src, isVideo = false, children }) => {
  const ref = useRef(null)
  const { addToGallery, toggleLightbox } = useLightbox()

  const updateContext = useCallback(() => addToGallery({ src }), [
    addToGallery,
    src,
  ])

  useEffect(() => {
    // updateContext()
  }, [src, updateContext])

  const handleClick = e => {
    e.preventDefault()
    toggleLightbox()
  }

  return (
    <Box ref={ref} as="a" href={src} onClick={handleClick}>
      {children}
    </Box>
  )
}

export default BoxItem
