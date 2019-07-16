/** @jsx jsx */
import { jsx } from "theme-ui"
import { UIContextProvider } from "../context/UIContext"
import { MeasureContextProvider } from "../context/MeasureContext"
import { Layout as ThemeProvider } from "theme-ui"
import Elements from "./Elements"

const Root = props => (
  <UIContextProvider>
    <MeasureContextProvider>
      <ThemeProvider>
        <Elements {...props} />
      </ThemeProvider>
    </MeasureContextProvider>
  </UIContextProvider>
)

export default Root
