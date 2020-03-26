import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'

import { generateId } from '../helper'
import { useLightbox } from './LightboxProvider'

const videoFormats = ['.mp4', '.ogg', '.webm']

const BoxItem = React.forwardRef(
  (
    { src, alt, title, description, youtubeId, vimeoId, children, ...props },
    ref
  ) => {
    const [id] = useState(generateId())
    const { addToGallery, toggleLightbox } = useLightbox()
    const htmlVideo = videoFormats.some(v => src === v)

    useEffect(() => {
      addToGallery({
        id,
        src,
        alt,
        title,
        description,
        youtubeId,
        vimeoId,
        htmlVideo,
      })
    }, [src])

    const handleClick = e => {
      e.preventDefault()
      toggleLightbox(id)
    }

    return (
      <Box ref={ref} as="a" href={src} onClick={handleClick} {...props}>
        {children}
      </Box>
    )
  }
)

export default BoxItem
