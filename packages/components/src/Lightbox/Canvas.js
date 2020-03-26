import React from 'react'
import { Box } from 'theme-ui'
import { useTransition, animated as a, config } from 'react-spring'

const AnimatedBox = a(Box)

// TODO add conditionals for info section and a scroll container for long descriptions

const getMedia = ({ src, alt, youtubeId, vimeoId, htmlVideo }) => {
  if (youtubeId) {
    return 'youtube video'
  }

  if (vimeoId) {
    return 'vimeo video'
  }

  if (htmlVideo) {
    return 'html5 video'
  }

  if (src) {
    return (
      <Box
        as="img"
        src={src}
        alt={alt ? alt : undefined}
        sx={{ height: '100%', width: '100%', objectFit: 'contain' }}
      />
    )
  }

  return 'Add a src, vimeoId, or youtubeId to <BoxItem />'
}

const Canvas = ({ urls, index, info }) => {
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
            maxHeight: ['70vh', '85vh'],
            maxWidth: ['90vw', '75vw'],
            transform: 'translate(-50%, -50%)',
          }}>
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
