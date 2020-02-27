import React, { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import { useTransition, animated } from 'react-spring'

import Pagination from './Pagination'
import Navigation from './Navigation'
import getTransition from './transitions'

const Carousel = React.forwardRef(
  (
    {
      data = [],
      template,
      nav = true,
      pageIndicator = false,
      transition = 'fade',
      autoPlay = false,
      hoverPause = false,
      pause = false,
      customArrow,
      duration = 5000,
      variant = 'carousel',
      ...props
    },
    ref
  ) => {
    const [index, setIndex] = useState(0)
    const [timer, setTimer] = useState(true)
    const count = data.length - 1
    const next = () => setIndex(index === count ? 0 : index + 1)

    useEffect(() => {
      if (timer && autoPlay && !pause) {
        const autoPlay = setTimeout(() => {
          next()
        }, duration)

        return () => clearTimeout(autoPlay)
      }
    }, [index, timer])

    const transitions = useTransition(index, null, {
      ...getTransition(transition),
    })

    const slides = data.map(item => ({ style }, i) => (
      <animated.div key={i} className="slide" style={{ ...style }}>
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
        {...props}
        __css={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Box
          tabIndex="-1"
          onFocus={e => setTimer(false)}
          onBlur={e => setTimer(true)}
          {...getAttributes}
          sx={{
            position: 'relative',
            zIndex: 0,
            mx: 'auto',
            minHeight: 200,
            height: '100%',
            width: '100%',
            '.slide': {
              width: '100%',
              height: '100%',
              position: 'absolute',
              willChange: 'transform, opacity',
            },
          }}>
          {transitions.map(({ item, props, key }) => {
            const Slide = slides[item]
            return <Slide key={key} style={props} />
          })}
        </Box>
        {pageIndicator && (
          <Pagination current={index} set={setIndex} count={count} />
        )}
        {nav && (
          <Navigation set={setIndex} count={count} custom={customArrow} />
        )}
      </Box>
    )
  }
)

export default Carousel
