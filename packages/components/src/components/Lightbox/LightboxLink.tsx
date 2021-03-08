import * as React from 'react'
import { Link, generateId, MakerProps } from 'maker-ui'

import { useLightbox, LightboxData } from './LightboxContext'

export interface LightboxLinkProps extends MakerProps, LightboxData {
  trigger?: boolean
  children?: React.ReactNode
}

/**
 * The `LightboxLink` renders clickable elements that toggle the Lightbox detail view.
 * Must be wrapped inside a `Lightbox` component.
 *
 * @link https://maker-ui.com/docs/components/lightbox
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
      ...props
    },
    ref
  ) => {
    const [id] = React.useState(generateId())
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

    React.useEffect(() => {
      addToGallery(config)
    }, [config, addToGallery])

    const handleClick = (e: React.MouseEvent) => {
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

LightboxLink.displayName = 'LightboxLink'
