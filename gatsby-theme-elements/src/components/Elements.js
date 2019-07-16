import React, { useLayoutEffect } from "react"
import { measure } from "../context/MeasureContext"
import { Global } from "@emotion/core"
import reset from "../utils/reset"

function inspectWindow() {
  if (typeof window !== `undefined`) {
    return [window.innerWidth, window.innerHeight]
  }
}

const Elements = ({ children }) => {
  const { setViewportXY } = measure()

  useLayoutEffect(() => {
    setViewportXY(inspectWindow())
    window.addEventListener(`resize`, handleResize)
    return () => window.removeEventListener(`resize`, handleResize)
  }, [])

  const handleResize = () => {
    setViewportXY(inspectWindow())
  }

  return (
    <>
      <Global styles={reset} />
      {children}
    </>
  )
}

export default Elements
