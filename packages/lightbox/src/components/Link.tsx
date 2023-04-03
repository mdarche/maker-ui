import React, { useState, useEffect } from 'react'
import { generateId } from '@maker-ui/utils'

import { useLightbox } from './Provider'
import type { LightboxItem } from '@/types'

export interface LightboxLinkProps extends LightboxItem {
  trigger?: boolean
  component?: boolean
  children?: React.ReactNode
}

/**
 * The `LightboxLink` renders clickable elements that toggle the Lightbox detail view.
 * Must be wrapped inside a `Lightbox` component.
 *
 * @link https://maker-ui.com/docs/lightbox
 */
export const LightboxLink = React.forwardRef<
  HTMLAnchorElement,
  LightboxLinkProps
>(
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
      component = false,
      ...props
    },
    ref
  ) => {
    const [id] = useState(generateId())
    const { addToGallery, toggleLightbox } = useLightbox()

    const emptyProps = !src && !youtubeId && !vimeoId
    const isComponent = children && (component || emptyProps)

    const config = React.useMemo(
      () => ({
        id,
        src,
        alt,
        title,
        description,
        youtubeId,
        vimeoId,
        poster,
        component: isComponent ? children : undefined,
      }),
      [
        id,
        src,
        alt,
        title,
        description,
        youtubeId,
        vimeoId,
        poster,
        isComponent,
        children,
      ]
    )

    useEffect(() => {
      addToGallery(config)
    }, [config, addToGallery])

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      toggleLightbox(id)
    }

    return (
      <a
        ref={ref}
        href={src || '#'}
        role="button"
        onClick={handleClick}
        {...props}>
        {children}
      </a>
    )
  }
)

LightboxLink.displayName = 'LightboxLink'
