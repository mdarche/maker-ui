/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useLayoutEffect } from "react"
import { measure } from "../context/MeasureContext"
import { Global } from "@emotion/core"
import reset from "../utils/reset"

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

const Root = ({ children, ...props }) => {
  const { setViewportXY } = measure()

  // Component Lifecycle

  useLayoutEffect(() => {
    setViewportXY(inspectWindow())
    window.addEventListener(`resize`, handleResize)

    return () => window.removeEventListener(`resize`, handleResize)
  }, [])

  // Event Handlers

  const handleResize = () => {
    setViewportXY(inspectWindow())
  }

  return (
    <Styled.root
      id="__elements"
      sx={{ bg: "background", color: "text" }}
      {...props}>
      <Global styles={reset} />
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
