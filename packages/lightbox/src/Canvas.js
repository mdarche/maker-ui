import React from 'react'
import { Box } from 'theme-ui'
import { useTransition, animated as a } from 'react-spring'

const AnimatedBox = a(Box)

const youtubeRoot = 'https://youtube.com/embed/'
const vimeoRoot = 'https://player.vimeo.com/video/'

// TODO add conditionals for info section and a scroll container for long descriptions

const getMedia = ({ src, alt, youtubeId, vimeoId, htmlVideo, poster }) => {
  if (youtubeId || vimeoId) {
    return (
      <Box
        as="iframe"
        src={youtubeId ? youtubeRoot + youtubeId : vimeoRoot + vimeoId}
        frameBorder="0"
        allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        sx={{ width: '100%', height: '100%' }}></Box>
    )
  }

  if (htmlVideo) {
    return (
      <Box
        as="video"
        controls
        poster={poster ? poster : undefined}
        sx={{ width: '100%', height: '100%' }}>
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
        alt={alt ? alt : 'Lightbox image'}
        sx={{ height: '100%', width: '100%', objectFit: 'contain' }}
      />
    )
  }

  return 'Add a src, vimeoId, or youtubeId to <BoxItem />'
}

const Canvas = ({ urls, index, info, ...rest }) => {
  const transitions = useTransition(urls[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions.map(
    ({ item, props, key }) =>
      item && (
        <AnimatedBox
          key={key}
          className="canvas"
          style={props}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '100%',
            width: '100%',
            maxHeight: ['68vh', '85vh'],
            maxWidth: ['90vw', '75vw'],
            transform: 'translate(-50%, -50%)',
          }}
          {...rest}>
          {getMedia(item)}
          {info && item.title && (
            <Box className="info-bar">
              <h4>{item.title}</h4>
              {item.description && <Box>{item.description}</Box>}
            </Box>
          )}
        </AnimatedBox>
      )
  )
}

export default Canvas
