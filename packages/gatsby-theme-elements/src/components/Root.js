/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useLayoutEffect } from "react"
import { Global } from "@emotion/core"

import { measure } from "../context/MeasureContext"
import defaultReset from "../utils/reset"

const skiplinks = [
  { label: "Skip to primary navigation", path: "nav-primary" },
  { label: "Skip to content", path: "content" },
  { label: "Skip to footer widgets", path: "footer-widgets" },
]

function inspectWindow() {
  if (typeof window !== `undefined`) {
    return [window.innerWidth, window.innerHeight]
  }
}

// TODO - Set options via layout prop

const Root = ({ children, globalStyle, reset, ...props }) => {
  const { setViewportSize } = measure()

  // Component Lifecycle

  useLayoutEffect(() => {
    setViewportSize(inspectWindow())
    window.addEventListener(`resize`, handleResize)

    return () => window.removeEventListener(`resize`, handleResize)
  }, [])

  // Event Handlers

  const handleResize = () => {
    setViewportSize(inspectWindow())
  }

  return (
    <Styled.root id="__elements" sx={{ color: "text" }} {...props}>
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
