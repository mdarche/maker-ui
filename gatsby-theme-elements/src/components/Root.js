/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React, { useLayoutEffect } from "react"
import { measure } from "../context/MeasureContext"
import { Global } from "@emotion/core"
import reset from "../utils/reset"

function inspectWindow() {
  if (typeof window !== `undefined`) {
    return [window.innerWidth, window.innerHeight]
  }
}

const Root = ({ backgroundColor, color, ...props }) => {
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
    <>
      <Global styles={reset} />
      <Styled.root
        id="__elements"
        sx={{ bg: backgroundColor || "background", color: color || "text" }}
        {...props}
      />
    </>
  )
}

export default Root
