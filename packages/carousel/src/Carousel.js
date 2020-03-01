import React, { useState, useEffect, useCallback } from 'react'
import { Box } from 'theme-ui'
import { animated } from 'react-spring'

import Pagination from './Pagination'
import Navigation from './Navigation'
import Canvas from './Canvas'

const Carousel = React.forwardRef(
  (
    {
      data = [],
      template,
      nav = true,
      pageIndicator = false,
      transition = 'fade',
      autoPlay = true,
      hoverPause = false,
      pause = false,
      arrow,
      duration = 5000,
      variant = 'carousel',
      ...props
    },
    ref
  ) => {
    const [index, set] = useState(0)
    const [timer, setTimer] = useState(true)

    const next = useCallback(() => set(state => (state + 1) % 3), [set])
    const prev = useCallback(
      () => set(state => (state === 0 ? data.length - 1 : state - 1)),
      [set, data.length]
    )

    useEffect(() => {
      if (timer && autoPlay && !pause) {
        const auto = setTimeout(() => {
          next()
        }, duration)

        return () => clearTimeout(auto)
      }
    }, [index, timer, next, duration, autoPlay, pause])

    const slides = data.map(item => ({ style }, i) => (
      <animated.div key={i} style={{ ...style }} className="slide">
        {React.cloneElement(template, item)}
      </animated.div>
    ))

    const getAttributes = hoverPause
      ? {
          onMouseEnter: e => setTimer(false),
          onMouseLeave: e => setTimer(true),
        }
      : null

    return (
      <Box
        ref={ref}
        variant={variant}
        className="carousel"
        {...getAttributes}
        {...props}
        __css={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Canvas index={index} slides={slides} transition={transition} />
        {pageIndicator && (
          <Pagination current={index} set={set} count={data.length - 1} />
        )}
        {nav && <Navigation prev={prev} next={next} arrow={arrow} />}
      </Box>
    )
  }
)

export default Carousel
