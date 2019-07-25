/** @jsx jsx */
import { jsx } from "theme-ui"
import { UIContextProvider } from "../context/UIContext"
import { MeasureContextProvider } from "../context/MeasureContext"
import Elements from "./Elements"

const Root = props => (
  <UIContextProvider>
    <MeasureContextProvider>
      <Elements {...props} />
    </MeasureContextProvider>
  </UIContextProvider>
)

export default Root
