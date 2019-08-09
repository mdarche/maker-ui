import React from "react"
import ControlWrapper from "./src/components/wrapper"

export const wrapRootElement = ({ element }) => {
  return <ControlWrapper>{element}</ControlWrapper>
}
