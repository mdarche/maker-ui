import React from "react"
import Controls from "./controls"

export default ({ children }) => (
  <div id="__elements_gui">
    {children}
    <Controls />
  </div>
)
