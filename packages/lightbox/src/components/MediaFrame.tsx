import * as React from 'react'
import Image from 'next/image'
import type { LightboxItem } from '@/types'

const youtubeRoot = 'https://youtube.com/embed/'
const vimeoRoot = 'https://player.vimeo.com/video/'

interface MediaFrameProps {
  index: number
  item: LightboxItem
}

/**
 * The `Media Frame` is a wrapper that conditionally loads and configures
 * a Youtube/Vimeo iframe, HTML video element, or image.
 *
 * @internal
 */
export const MediaFrame = ({
  index,
  item: {
    src,
    blur,
    alt,
    youtubeId,
    vimeoId,
    htmlVideo,
    poster,
    component,
    nextImage,
  },
}: MediaFrameProps) => {
  const [show, set] = React.useState(false)

  if (component) {
    return <>{component}</>
  }

  if (youtubeId || vimeoId) {
    return (
      <iframe
        title={`media-frame-${index}`}
        className="mkui-lbx-media"
        src={youtubeId ? youtubeRoot + youtubeId : vimeoRoot + vimeoId}
        onLoad={() => set(true)}
        style={{ opacity: show ? 1 : 0, transition: 'opacity .3s ease' }}
        allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    )
  }

  if (htmlVideo && typeof src === 'string') {
    return (
      <video
        controls
        poster={poster ? poster : undefined}
        className="mkui-lbx-media">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  if (src) {
    return nextImage ? (
      <div className="mkui-lbx-media mkui-lbx-next-image">
        <Image
          fill
          src={src}
          blurDataURL={blur ? blur : undefined}
          alt={alt || 'lightbox image'}
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
    ) : typeof src === 'string' ? (
      <img
        src={src}
        className="mkui-lbx-media"
        alt={alt ? alt : 'lightbox image'}
        style={{ objectFit: 'contain' }}
      />
    ) : null
  }

  return null
}

MediaFrame.displayName = 'MediaFrame'
