import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { generateId } from 'maker-ui'

import { useLightbox } from './LightboxProvider'

const Link = React.forwardRef(
  (
    {
      src,
      alt,
      title,
      description,
      youtubeId,
      vimeoId,
      children,
      poster,
      trigger = false,
      ...props
    },
    ref
  ) => {
    const [id] = useState(generateId())
    const { addToGallery, toggleLightbox } = useLightbox()

    const config = {
      id,
      src,
      alt,
      title,
      description,
      youtubeId,
      vimeoId,
      poster,
    }

    useEffect(() => {
      addToGallery(config)
    }, [config, addToGallery])

    const handleClick = e => {
      e.preventDefault()
      return toggleLightbox(id)
    }

    return (
      <Box
        ref={ref}
        as="a"
        href={src || '#'}
        role="button"
        onClick={handleClick}
        {...props}>
        {children}
      </Box>
    )
  }
)

export default Link
