import React, { useState, useEffect } from 'react'

import shuffle from './shuffle'

// Helpers

export function random(options = []) {
  return shuffle(options)[0]
}

export function generateStyles(options = {}, groupByIndex = false) {
  let styles = {}

  if (groupByIndex) {
    const indices = Object.entries(options)[0][1].length
    const rIndex = Math.floor(Math.random() * indices)

    for (const [selector, props] of Object.entries(options)) {
      styles[selector] = props[rIndex]
    }
  } else {
    for (const [s, p] of Object.entries(options)) {
      styles[s] = random(p)
    }
  }

  return styles
}

export function generateSrc(options = []) {
  const selection = random(options)

  return {
    src: selection.url,
    alt: selection.alt,
  }
}

// React Component

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
