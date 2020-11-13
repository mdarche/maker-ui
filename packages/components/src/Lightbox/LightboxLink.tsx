import React, { useEffect, useState } from 'react'
import { Link, generateId, MakerProps } from 'maker-ui'

import { useLightbox, LightboxData } from './LightboxContext'

export interface LightboxLinkProps extends MakerProps, LightboxData {
  trigger?: boolean
  children?: React.ReactElement
}

/**
 * Use `LightboxLink` to render clickable elements that toggle the Lightbox detail view.
 *
 * @see https://maker-ui.com/docs/components/lightbox
 */

export const LightboxLink = React.forwardRef<HTMLAnchorElement, any>(
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
      <Link
        ref={ref}
        href={src || '#'}
        role="button"
        onClick={handleClick}
        {...props}>
        {children}
      </Link>
    )
  }
)
