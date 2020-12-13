import * as React from 'react'
import { Div, Image, DivProps } from 'maker-ui'
import { animated, useTransition } from 'react-spring'

import { useLightbox, LightboxData } from './LightboxContext'
import { Spinner } from '../Spinner'

const AnimatedDiv = animated(Div)

const youtubeRoot = 'https://youtube.com/embed/'
const vimeoRoot = 'https://player.vimeo.com/video/'

interface MediaFrameProps {
  item: LightboxData
}

/**
 * The `Media Frame` is a wrapper that conditionally loads and configures
 * a Youtube/Vimeo iframe, HTML video element, or image.
 *
 * @internal usage only
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
        <source src={src} type={`video/${src.substr(-3, 3)}`} />
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
        sx={{ objectFit: 'contain' }}
      />
    )
  }

  return null
}

MediaFrame.displayName = 'MediaFrame'

interface CanvasProps extends DivProps {
  zoom?: boolean
}

/**
 * The `Canvas` component uses transition animations to show / paginate
 * the lightbox gallery content.
 *
 * @internal usage only
 */

export const Canvas = ({ zoom }: CanvasProps) => {
  const { variant, data, index, settings } = useLightbox()

  const transitions = useTransition(data[index], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: settings.springConfig,
  })

  return transitions(
    (props, item) =>
      item && (
        <AnimatedDiv
          variant={`${variant}.canvas`}
          className="lb-canvas"
          // @ts-ignore
          style={props}
          sx={{
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
          }}>
          {/* TODO - Fix this Spinner */}
          <Spinner
            size={20}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: -1,
            }}
          />
          <MediaFrame item={item} />
          {settings.showInfo && item.title && (
            <Div
              variant={`${variant}.info`}
              className="lb-info"
              sx={{
                color: '#fff',
                h4: {
                  variant: `${variant}.title`,
                  mt: 20,
                  fontSize: '18px',
                  textAlign: 'center',
                },
              }}>
              <h4>{item.title}</h4>
              {item.description && (
                <Div variant={`${variant}.description`} sx={{ mt: 20 }}>
                  {item.description}
                </Div>
              )}
            </Div>
          )}
        </AnimatedDiv>
      )
  )
}

Canvas.displayName = 'LightboxCanvas'
