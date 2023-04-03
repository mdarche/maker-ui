import * as React from 'react'
import type { LightboxItem } from '@/types'

const youtubeRoot = 'https://youtube.com/embed/'
const vimeoRoot = 'https://player.vimeo.com/video/'

interface MediaFrameProps {
  item: LightboxItem
}

/**
 * The `Media Frame` is a wrapper that conditionally loads and configures
 * a Youtube/Vimeo iframe, HTML video element, or image.
 *
 * @internal
 */
export const MediaFrame = ({
  item: { src, alt, youtubeId, vimeoId, htmlVideo, poster, component },
}: MediaFrameProps) => {
  const [show, set] = React.useState(false)

  if (component) {
    return <>{component}</>
  }

  if (youtubeId || vimeoId) {
    return (
      <iframe
        title="mkui-lightbox-video"
        src={youtubeId ? youtubeRoot + youtubeId : vimeoRoot + vimeoId}
        onLoad={() => set(true)}
        style={{ opacity: show ? 1 : 0, transition: 'opacity .3s ease' }}
        allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    )
  }

  if (htmlVideo) {
    return (
      <video controls poster={poster ? poster : undefined}>
        <source src={src} type={`video/mp4`} />
        Your browser does not support the video tag.
      </video>
    )
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt ? alt : 'Lightbox image'}
        onLoad={() => set(true)}
        style={{ objectFit: 'contain' }}
      />
    )
  }

  return null
}

MediaFrame.displayName = 'MediaFrame'
