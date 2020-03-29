import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { generateId } from 'elements-ui'

import { useLightbox } from './LightboxProvider'

const videoFormats = ['.mp4', '.ogg', '.webm']

const BoxItem = React.forwardRef(
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
    const htmlVideo = src ? videoFormats.some(v => src.includes(v)) : false

    useEffect(() => {
      if (!trigger) {
        addToGallery({
          id,
          src,
          alt,
          title,
          description,
          youtubeId,
          vimeoId,
          poster,
          htmlVideo,
        })
      }
    }, [src])

    const handleClick = e => {
      e.preventDefault()
      return trigger ? toggleLightbox() : toggleLightbox(id)
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

export default BoxItem
