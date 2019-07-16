/** @jsx jsx */
import { jsx } from "theme-ui"

const TabBar = props => {
  const { background, borderTop, boxShadow } = props
  return (
    <div
      {...props}
      sx={{
        display: ["flex", "none"],
        position: "fixed",
        alignItems: "center",
        justifyContet: "space-evenly",
        bottom: 0,
        left: 0,
        right: 0,
        overflowX: "scroll",
        p: 2,
        bg: background || "bg_tabbar",
        borderTop: borderTop || "tabbar",
        boxShadow: boxShadow || "tabbar",
      }}
    />
  )
}

export default TabBar
