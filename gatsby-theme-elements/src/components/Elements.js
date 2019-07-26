/** @jsx jsx */
import { jsx } from "theme-ui"
import { UIContextProvider } from "../context/UIContext"
import { MeasureContextProvider } from "../context/MeasureContext"
import Root from "./Root"

export default props => (
  <UIContextProvider>
    <MeasureContextProvider>
      <Root {...props} />
    </MeasureContextProvider>
  </UIContextProvider>
)
