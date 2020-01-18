import React from "react"
import PropTypes from "prop-types"
import { useEffect } from "react"

import { useOptions } from "../context/UIContext"
import { useMeasureUpdater } from "../context/MeasureContext"

const Sidebar = props => {
  const options = useOptions()
  const setMeasurements = useMeasureUpdater()
  const { width = options.sidebar.width } = props

  useEffect(() => {
    if (width !== options.sidebar.width) {
      setMeasurements(state => ({
        ...state,
        sidebarWidth: width,
      }))
    }
  }, [])

  return <aside {...props} id="primary-sidebar" />
}

Sidebar.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
}

export default Sidebar
