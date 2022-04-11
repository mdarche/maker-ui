import * as React from 'react'
import { Div, Image } from '@maker-ui/primitives'
import { Spinner } from '@maker-ui/loaders'

import { useLightbox, LightboxData } from './LightboxContext'

const youtubeRoot = 'https://youtube.com/embed/'
const vimeoRoot = 'https://player.vimeo.com/video/'

interface MediaFrameProps {
  item: LightboxData
}

/**
 * The `Media Frame` is a wrapper that conditionally loads and configures
 * a Youtube/Vimeo iframe, HTML video element, or image.
 *
 * @internal
 */
const MediaFrame = ({
  item: { src, alt, youtubeId, vimeoId, htmlVideo, poster },
}: MediaFrameProps) => {
  const [show, set] = React.useState(false)

  if (youtubeId || vimeoId) {
    return (
      <iframe
        title="lightbox-video"
        src={youtubeId ? youtubeRoot + youtubeId : vimeoRoot + vimeoId}
        frameBorder="0"
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
      <Image
        src={src}
        alt={alt ? alt : 'Lightbox image'}
        onLoad={() => set(true)}
        css={{ objectFit: 'contain' }}
      />
    )
  }

  return null
}

MediaFrame.displayName = 'MediaFrame'

/**
 * The `Canvas` component uses transition animations to show / paginate
 * the lightbox gallery content.
 *
 * @todo - add props and loading spinner to background
 * @todo - add gsap carousel component
 *
 * @internal
 */
export const Canvas = () => {
  const { data, index, settings } = useLightbox()
  const item = data[index]

  return (
    <Div
      className="lb-canvas"
      css={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
        maxHeight: ['68vh', '88vh'],
        maxWidth: ['90vw', '75vw'],
        transform: 'translate(-50%, -50%)',
        'img, video, iframe': {
          height:
            item.title && settings.showInfo
              ? ['calc(100% - 100px)', 'calc(100% - 50px)']
              : '100%',
          width: '100%',
        },
        '.lightbox-info': {
          color: '#fff',
          h4: {
            marginTop: 20,
            fontSize: '18px',
            textAlign: 'center',
          },
        },
        '.description': {
          marginTop: 20,
        },
        '#media-spinner': {
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
          position: 'absolute',
          zIndex: -1,
        },
      }}>
      <Spinner id="media-spinner" colors={{ primary: '#fff' }} size={50} />
      <MediaFrame item={item} />
      {settings.showInfo && item.title && (
        <div className="lightbox-info">
          <h4>{item.title}</h4>
          {item.description && (
            <div className="description">{item.description}</div>
          )}
        </div>
      )}
    </Div>
  )
}

Canvas.displayName = 'LightboxCanvas'
