import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { generateId } from 'maker-ui'

import { useLightbox } from './LightboxProvider'

// TODO - rename trigger prop ?

const videoFormats = ['.mp4', '.ogg', '.webm']

const LightboxItem = React.forwardRef(
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

    const config = {
      id,
      src,
      alt,
      title,
      description,
      youtubeId,
      vimeoId,
      poster,
      htmlVideo,
    }

    useEffect(() => {
      if (!trigger) {
        addToGallery(config)
      }
    }, [config, trigger, addToGallery])

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

export default LightboxItem
