import React from 'react'
import { Box } from 'theme-ui'
import { animated as a, useSpring } from 'react-spring'

const AnimatedBox = a(Box)

const ProgressBar = ({ duration, variant, reverse }) => {
  const props = useSpring({
    from: {
      opacity: reverse ? 0 : 1,
      transform: `translateX(${reverse ? 100 : 0}%)`,
    },
    to: {
      opacity: reverse ? 1 : 0,
      transform: `translateX(${reverse ? 0 : 100}%)`,
    },
    config: { duration },
    reset: true,
  })

  return (
    <Box
      variant={`${variant}.progress`}
      className="carousel-progress"
      __css={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
      }}>
      <AnimatedBox
        variant={`${variant}.progress.bar`}
        className="carousel-progress-bar"
        style={props}
        sx={{ height: '3px', bg: '#000' }}
      />
    </Box>
  )
}

export default ProgressBar
