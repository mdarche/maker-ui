import React from 'react'
import { Box } from 'theme-ui'
import { useTransition } from 'react-spring'

import getTransition from './transitions'

const Canvas = ({ slides, transition, index }) => {
  const transitions = useTransition(index, p => p, {
    ...getTransition(transition),
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
