import * as React from 'react'
import { Link } from '@maker-ui/primitives'
import { generateId } from '@maker-ui/utils'
import type { MakerProps } from '@maker-ui/css'

import { useLightbox, type LightboxData } from './LightboxContext'

export interface LightboxLinkProps extends MakerProps, LightboxData {
  trigger?: boolean
  component?: boolean
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
      component = false,
      ...props
    },
    ref
  ) => {
    const [id] = React.useState(generateId())
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
