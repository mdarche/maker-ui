import React from 'react'
import { Box } from 'theme-ui'
import { useTransition } from 'react-spring'

// TODO - Add more slide transitions

const getTransition = (type, next) => {
  switch (type) {
    case 'fade':
      return {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
      }
    case 'slide':
    default:
      return {
        from: { transform: `translate3d(${next ? '100%' : '-100%'},0,0)` },
        enter: { transform: 'translate3d(0%,0,0)' },
        leave: { transform: `translate3d(${next ? '-50%' : '50%'},0,0)` },
      }
  }
}

const Canvas = ({ slides, transition, index, config, next }) => {
  const transitions = useTransition(index, p => p, {
    ...getTransition(transition, next),
    config,
  })

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 0,
        mx: 'auto',
        height: '100%',
        width: '100%',
        '.slide': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          willChange: 'transform, opacity',
        },
      }}>
      {transitions.map(({ item, props, key }) => {
        const Page = slides[item]
        return <Page key={key} style={props} />
      })}
    </Box>
  )
}

export default Canvas
