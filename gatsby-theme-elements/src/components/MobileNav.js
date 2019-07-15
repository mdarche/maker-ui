/** @jsx jsx */
import { jsx } from "theme-ui"
import { useContext } from "react"
import { UIContext } from "../context/UIContext"
import { animated as a } from "react-spring"
import { transitions } from "../utils/animate"

const MobileNav = props => {
  const { background, width } = props
  const { state } = useContext(UIContext)
  // Todo clean up this request
  const style = state.options.header.mobileNavStyle

  const positionPartial = style.startsWith("fade")
    ? {
        top: 0,
        left: 0,
      }
    : {
        top: 0,
        right: 0,
      }

  return transitions(state.mobileActive, style).map(
    ({ item, key, props }) =>
      item && (
        <a.div
          style={props}
          key={key}
          sx={{
            zIndex: 1000,
            position: "fixed",
            height: "100%",
            width: width || "width_mobileNav",
            display: ["flex", "none"],
            border: "none",
            background: background || "rgba(0, 0, 0, 0.9)",
            ...positionPartial,
          }}
          {...props}
        />
      )
  )
}

export default MobileNav
