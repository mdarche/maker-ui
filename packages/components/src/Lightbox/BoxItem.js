import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'

import { generateId } from '../helper'
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
      trigger = false,
      ...props
    },
    ref
  ) => {
    const [id] = useState(generateId())
    const { addToGallery, toggleLightbox } = useLightbox()
    const htmlVideo = videoFormats.some(v => src === v)

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
        href={src || 'javascript:void(0);'}
        onClick={handleClick}
        {...props}>
        {children}
      </Box>
    )
  }
)

export default BoxItem
