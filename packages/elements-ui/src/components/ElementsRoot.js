import React, { useEffect } from "react"

import { useOptionsUpdater } from "../context/ElementsContext"
import Skiplinks from "./Skiplinks"

const ElementsRoot = ({ options, children }) => {
  const setOptions = useOptionsUpdater()

  useEffect(() => {
    if (options !== undefined) {
      setOptions(options)
    }
  }, [setOptions, options])

  return (
    <React.Fragment>
      <Skiplinks />
      {children}
    </React.Fragment>
  )
}

export default ElementsRoot
