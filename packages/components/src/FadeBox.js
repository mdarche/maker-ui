import React, { useRef, useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import { animated as a, useSpring } from 'react-spring'

const AnimatedBox = a(Box)

const getTransform = ({ direction, distance }, show) => {
  switch (direction) {
    case 'up':
      return show ? `translateY(0)` : `translateY(${distance})`
    case 'down':
      return show ? `translateY(0)` : `translateY(-${distance})`
    case 'left':
      return show ? `translateX(0)` : `translateX(${distance})`
    case 'right':
      return show ? `translateX(0)` : `translateX(-${distance})`
    default:
      return undefined
  }
}

const FadeBox = ({
  offset = 300,
  springConfig,
  direction,
  distance = '20px',
  fade = false,
  settings = { direction: 'up', distance: '20px' },
  ...props
}) => {
  const ref = useRef(null)
  const [show, set] = useState(false)
  const fadeProps = direction ? { direction, distance } : settings

  const reveal = useSpring({
    opacity: show ? 1 : 0,
    transform: fade ? undefined : getTransform(fadeProps, show),
    config: springConfig,
  })

  useEffect(() => {
    const handleScroll = e =>
      !show && window.pageYOffset > ref.current.offsetTop - offset
        ? set(true)
        : null

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [show, offset])

  return <AnimatedBox style={reveal} ref={ref} {...props} />
}

export default FadeBox
