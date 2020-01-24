import React from "react"

import { useOptions, useOptionsUpdater } from "../../context/ElementsContext"
import Basic from "./Basic"
import BasicCenter from "./BasicCenter"
import Split from "./Split"
import Center from "./Center"
import Minimal from "./Minimal"
import Reverse from "./Reverse"

export const Navbar = ({ type, ...props }) => {
  const { navigation } = useOptions()
  const setOptions = useOptionsUpdater()

  if (type !== undefined && type !== navigation) {
    setOptions({ navigation: type })
  }

  switch (navigation) {
    case "split":
      return <Split {...props} />
    case "center":
      return <Center {...props} />
    case "basic-center":
      return <BasicCenter {...props} />
    case "reverse":
      return <Reverse {...props} />
    case "minimal":
      return <Minimal {...props} />
    default:
      return <Basic {...props} />
  }
}
