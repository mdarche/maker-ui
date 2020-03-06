import React, { useState, useEffect } from 'react'
import { Box, Image } from 'theme-ui'

import shuffle from './shuffle'

// Helpers

export function random(options = []) {
  return shuffle(options)[0]
}

export function generateStyles(options = {}) {
  let styles = {}

  for (const [selector, props] of Object.entries(options)) {
    console.log(selector, props)
    styles.selector = random(props)
  }
  console.log(styles)
  return styles
}

// React Components

export const GBox = React.forwardRef(({ options, ...props }, ref) => {
  const [, forceUpdate] = useState()
  console.count('rendering')

  useEffect(() => {
    forceUpdate()
  }, [])

  return <Box ref={ref} {...props} __css={{ ...generateStyles(options) }} />
})

export const GImage = React.forwardRef(({ src, ...props }, ref) => {
  const [img, set] = useState({ url: '', alt: '' })

  useEffect(() => {
    set(random(src))
  }, [])

  return <Image ref={ref} src={img.url} alt={img.alt} {...props} />
})

export const Generate = ({ data, count, children }) => {
  const [random, setRandom] = useState([])

  useEffect(() => {
    setRandom(shuffle(data))
  }, [data, setRandom])

  if (!children) {
    return random.map((item, index) => (
      <React.Fragment key={index}>{item}</React.Fragment>
    ))
  }

  return count
    ? random
        .slice(0, count)
        .map((item, index) => (
          <React.Fragment key={index}>
            {React.cloneElement(children, item)}
          </React.Fragment>
        ))
    : random.map((item, index) => (
        <React.Fragment key={index}>
          {React.cloneElement(children, item)}
        </React.Fragment>
      ))
}
