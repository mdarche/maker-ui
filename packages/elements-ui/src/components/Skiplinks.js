import React from "react"
import { Box } from "@theme-ui/components"

import { useOptions } from "../context/ElementsContext"

const Skiplinks = () => {
  const { layout } = useOptions()

  return (
    <Box
      as="ul"
      sx={{
        listStyle: "none",
        position: "relative",
        zIndex: 1000,
        p: 0,
        a: {
          bg: "#fff",
          display: "block",
          position: "absolute",
          fontFamily: "body",
          left: -9999,
          p: "1em",
          "&:focus": {
            left: 0,
          },
        },
      }}>
      <li>
        <a href="#site-header">Skip to primary navigation</a>
      </li>
      {layout.includes("sidenav") ? (
        <li>
          <a href="#side-nav">Skip to secondary navigation</a>
        </li>
      ) : null}
      <li>
        <a href="#content">Skip to content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </Box>
  )
}

export default Skiplinks
