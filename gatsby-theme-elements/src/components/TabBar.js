/** @jsx jsx */
import { jsx } from "theme-ui"

const TabBar = props => {
  const { background, borderTop, boxShadow } = props
  return (
    <div
      sx={{
        display: ["flex", "none"],
        position: "fixed",
        alignItems: "center",
        justifyContet: "space-evenly",
        overflowX: "scroll",
        p: 2,
        bg: background || "bg_tabbar",
        borderTop: borderTop || "tabbar",
        boxShadow: boxShadow || "tabbar",
      }}
      {...props}
    />
  )
}

export default TabBar
