/** @jsx jsx */
import { jsx } from "theme-ui"
import { useRef, useLayoutEffect } from "react"
import { measure } from "../context/MeasureContext"
import { useOptions, useSideNav } from "../context/UIContext"
import { animated as a } from "react-spring"
import { transitions } from "../utils/animate"

const SideNav = props => {
  const [sideNavActive] = useSideNav()
  const options = useOptions().sideNav
  const { style, children } = props
  const { setSideNavWidth } = measure()
  const sideNavRef = useRef(null)
  const width = props.width || options.width

  useLayoutEffect(() => {
    setSideNavWidth(sideNavRef.current.clientWidth)
  }, [])

  return transitions(
    sideNavActive,
    "sideNav",
    width,
    options.sideNavSpring
  ).map(
    ({ item, key, props }) =>
      item && (
        <a.section
          key={key}
          ref={sideNavRef}
          aria-label="Secondary Navigation"
          sx={{
            width,
            position: "fixed",
            bg: props.background || "bg_sidenav",
            top: 0,
            left: 0,
            bottom: 0,
            opacity: [0, 1],
            transform: [`translateX(-${width})`, "translateX(0)"],
            overflowY: "scroll",
          }}
        >
          <div sx={{ ...style }}>{children}</div>
        </a.section>
      )
  )
}

export default SideNav
