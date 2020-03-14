import React, { useReducer, useEffect, useCallback } from 'react'
import { Box } from 'theme-ui'
import { animated } from 'react-spring'

import Pagination from './Pagination'
import Navigation from './Navigation'
import Canvas from './Canvas'

// TODO - Fix onRest callback flicker

function reducer(state, { type, value }) {
  switch (type) {
    case 'set': {
      return { ...state, index: value }
    }
    case 'next': {
      return {
        ...state,
        index: (state.index + 1) % state.count,
        isAnimating: true,
        nextSlide: true,
      }
    }
    case 'previous': {
      return {
        ...state,
        index: state.index === 0 ? state.count - 1 : state.index - 1,
        isAnimating: true,
        nextSlide: false,
      }
    }
    case 'pause': {
      return { ...state, timer: value }
    }
    case 'complete': {
      return { ...state, isAnimating: false }
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
      transition,
      autoPlay = false,
      hoverPause = false,
      pause = false,
      arrow,
      duration = 5000,
      variant = 'carousel',
      config = { mass: 1, tension: 160, friction: 28 },
      ...props
    },
    ref
  ) => {
    const [state, dispatch] = useReducer(reducer, {
      index: 0,
      count: data.length,
      timer: true,
      nextSlide: false,
      isAnimating: false,
    })

    const next = useCallback(
      () => (!state.isAnimating ? dispatch({ type: 'next' }) : null),
      [dispatch, state]
    )

    const prev = useCallback(
      () => (!state.isAnimating ? dispatch({ type: 'previous' }) : null),
      [dispatch, state]
    )

    useEffect(() => {
      if (autoPlay && state.timer && !pause) {
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

    const getAttributes =
      hoverPause && !state.isAnimating
        ? {
            onMouseEnter: e => dispatch({ type: 'pause', value: false }),
            onMouseLeave: e => dispatch({ type: 'pause', value: true }),
          }
        : null

    console.count(state)

    const complete = () => dispatch({ type: 'complete' })

    return (
      <Box
        ref={ref}
        variant={variant}
        className="carousel"
        // {...getAttributes}
        {...props}
        __css={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Canvas
          index={state.index}
          slides={slides}
          transition={transition}
          next={state.nextSlide}
          config={config}
          animate={complete}
        />
        {pageIndicator && (
          <Pagination
            current={state.index}
            set={dispatch}
            count={state.count}
            variant={variant}
          />
        )}
        {nav && (
          <Navigation
            controls={{ prev, next }}
            arrow={arrow}
            variant={variant}
          />
        )}
      </Box>
    )
  }
)

export default Carousel
