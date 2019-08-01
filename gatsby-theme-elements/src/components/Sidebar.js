/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import { useEffect } from "react"

import { useOptions } from "../context/UIContext"
import { measure } from "../context/MeasureContext"

const Sidebar = props => {
  const options = useOptions()
  const { setSidebarWidth } = measure()
  const { width = options.sidebar.width } = props

  useEffect(() => {
    if (width !== options.sidebar.width) {
      setSidebarWidth(width)
    }
  }, [])

  return <aside {...props} id="primary-sidebar" />
}

Sidebar.propTypes = {
  gridGap: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  children: PropTypes.node,
}

export default Sidebar
