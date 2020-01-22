import React from "react"

import { useOptions, useOptionsUpdater } from "../../context/ElementsContext"
import BasicNav from "./BasicNav"
import SplitNav from "./SplitNav"
import CenterNav from "./CenterNav"

export const Navbar = ({ type, ...props }) => {
  const { navigation } = useOptions()
  const setOptions = useOptionsUpdater()

  if (type !== undefined && type !== navigation) {
    setOptions({ navigation: type })
  }

  switch (navigation) {
    case "split":
      return <SplitNav {...props} />
    case "center":
      return <CenterNav {...props} />
    default:
      return <BasicNav {...props} />
  }
}

// TODO - Add Proptypes
