import React, { useReducer, useEffect } from 'react'
import { Box } from 'theme-ui'
import { animated } from 'react-spring'

import Canvas from './Canvas'
import Pagination from './Pagination'
import Navigation from './Navigation'
import ProgressBar from './ProgressBar'

// TODO add drag and swipe gesture

function reducer(state, { type, value }) {
  switch (type) {
    case 'set': {
      return { ...state, index: value }
    }
    case 'next': {
      return {
        ...state,
        index: (state.index + 1) % state.count,
        nextSlide: true,
      }
    }
    case 'previous': {
      return {
        ...state,
        index: state.index === 0 ? state.count - 1 : state.index - 1,
        nextSlide: false,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

const Carousel = React.forwardRef(
  (
    {
      data = [],
      template,
      nav = true,
      pageIndicator = false,
      progressBar = false,
      barReverse = false,
      autoPlay = false,
      hoverPause = false, // TODO
      hideControls = false, // TODO
      pause = false,
      arrow,
      transition,
      duration = 8000,
      variant = 'carousel',
      config = { mass: 1, tension: 160, friction: 28 },
      ...props
    },
    ref
  ) => {
    const [state, dispatch] = useReducer(reducer, {
      index: 0,
      count: data.length,
      nextSlide: false,
    })

    const next = () => dispatch({ type: 'next' })
    const prev = () => dispatch({ type: 'previous' })

    useEffect(() => {
      if (autoPlay && !pause) {
        const auto = setTimeout(() => {
          next()
        }, duration)

        return () => clearTimeout(auto)
      }
    }, [state, autoPlay, pause, next, duration])

    const slides = data.map(item => ({ style }, i) => (
      <animated.div key={i} style={{ ...style }} className="slide">
        {React.cloneElement(template, item)}
      </animated.div>
    ))

    return (
      <Box
        ref={ref}
        variant={variant}
        className="carousel"
        {...props}
        __css={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Canvas
          index={state.index}
          slides={slides}
          transition={transition}
          next={state.nextSlide}
          config={config}
        />
        {nav && (
          <Navigation
            controls={{ prev, next }}
            arrow={arrow}
            variant={variant}
          />
        )}
        {pageIndicator && (
          <Pagination
            current={state.index}
            set={dispatch}
            count={state.count}
            variant={variant}
          />
        )}
        {progressBar && autoPlay && (
          <ProgressBar
            duration={duration}
            variant={variant}
            reverse={barReverse}
          />
        )}
      </Box>
    )
  }
)

export default Carousel
