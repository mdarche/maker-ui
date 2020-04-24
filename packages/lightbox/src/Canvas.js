import React, { useState } from 'react'
import { Box } from 'theme-ui'
import { useTransition, animated as a } from 'react-spring'
import { Spinner } from '@maker-ui/components'

const AnimatedBox = a(Box)

const youtubeRoot = 'https://youtube.com/embed/'
const vimeoRoot = 'https://player.vimeo.com/video/'

const MediaFrame = ({
  item: { src, alt, youtubeId, vimeoId, htmlVideo, poster },
}) => {
  const [show, set] = useState(false)

  if (youtubeId || vimeoId) {
    return (
      <Box
        as="iframe"
        src={youtubeId ? youtubeRoot + youtubeId : vimeoRoot + vimeoId}
        frameBorder="0"
        onLoad={() => set(true)}
        style={{ opacity: show ? 1 : 0, transition: 'opacity .3s ease' }}
        allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></Box>
    )
  }

  if (htmlVideo) {
    return (
      <Box as="video" controls poster={poster ? poster : undefined}>
        <source src={src} type={`video/${src.substr(-3, 3)}`} />
        Your browser does not support the video tag.
      </Box>
    )
  }

  if (src) {
    return (
      <Box
        as="img"
        src={src}
        onLoad={() => set(true)}
        alt={alt ? alt : 'Lightbox image'}
        sx={{ objectFit: 'contain' }}
      />
    )
  }

  return 'Add a src, vimeoId, or youtubeId to <BoxItem />'
}

const Canvas = ({ variant, data, index, showInfo, ...rest }) => {
  const transitions = useTransition(data[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions.map(
    ({ item, props, key }) =>
      item && (
        <AnimatedBox
          key={key}
          variant={`${variant}.canvas`}
          className="lb-canvas"
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
                item.title && showInfo
                  ? ['calc(100% - 100px)', 'calc(100% - 50px)']
                  : '100%',
              width: '100%',
            },
          }}
          {...rest}>
          <Spinner
            size="60"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: -1,
            }}
          />
          <MediaFrame item={item} />
          {showInfo && item.title && (
            <Box
              variant={`${variant}.info`}
              className="lb-info"
              sx={{ color: '#fff' }}>
              <Box
                as="h4"
                variant={`${variant}.title`}
                sx={{ my: 20, fontSize: '18px', textAlign: 'center' }}>
                {item.title}
              </Box>
              {item.description && (
                <Box variant={`${variant}.description`}>{item.description}</Box>
              )}
            </Box>
          )}
        </AnimatedBox>
      )
  )
}

export default Canvas
