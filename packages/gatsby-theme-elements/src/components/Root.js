/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { useLayoutEffect, useCallback } from 'react'
import { Global } from '@emotion/core'

import { useMeasureUpdater } from '../context/MeasureContext'
import defaultReset from '../utils/reset'

const skiplinks = [
  { label: 'Skip to primary navigation', path: 'nav-primary' },
  { label: 'Skip to content', path: 'content' },
  { label: 'Skip to footer widgets', path: 'footer-widgets' },
]

// function inspectWindow() {
//   if (typeof window !== `undefined`) {
//     return [window.innerWidth, window.innerHeight]
//   }
// }

const Root = ({ children, globalStyle, reset, ...props }) => {
  const setMeasurements = useMeasureUpdater()

  const measure = useCallback(() => {
    if (typeof window !== `undefined`) {
      setMeasurements(state => ({
        ...state,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      }))
    }
  }, [setMeasurements])

  // const handleResize = () => {
  //   measure()
  // }

  useLayoutEffect(() => {
    measure()
    window.addEventListener(`resize`, measure)

    return () => window.removeEventListener(`resize`, measure)
  }, [measure])

  return (
    <Styled.root id="__elements" sx={{ color: 'text' }} {...props}>
      <Global styles={reset !== undefined ? reset : defaultReset} />
      {globalStyle !== undefined ? <Global styles={globalStyle} /> : null}

      <ul className="skip-links">
        {skiplinks.map(({ label, path }) => (
          <li key={path}>
            <a href={`#${path}`} className="screen-reader-shortcut">
              {label}
            </a>
          </li>
        ))}
      </ul>

      {children}
    </Styled.root>
  )
}

export default Root
