/** @jsx jsx */
import { jsx } from "theme-ui"
import { getGlobals, getOptions } from "../context/UIContext"
import { animated as a } from "react-spring"
import { transitions } from "../utils/animate"
import MenuToggle from "./MenuToggle"

const MobileNav = props => {
  const { background, width, children, animation, close = false } = props
  const { mobileActive } = getGlobals()
  const options = getOptions().header
  const animationStyle = options.mobileNavStyle || animation

  // TODO - Determine slide position
  const positionPartial = animationStyle.startsWith("fade")
    ? {
        top: 0,
        left: 0,
      }
    : {
        top: 0,
        right: 0,
      }

  return transitions(mobileActive, animationStyle, options.mobileNavSpring).map(
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
        >
          {close ? (
            <MenuToggle
              icon="close"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                m: 20,
                svg: { fill: "#fff", height: 54 },
              }}
            />
          ) : null}
          {children}
        </a.div>
      )
  )
}

export default MobileNav
