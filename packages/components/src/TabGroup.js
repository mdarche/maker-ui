import React, { useState, useContext } from 'react'
import { Box } from 'theme-ui'

const TabContext = React.createContext()
const TabUpdateContext = React.createContext()

const TabGroup = ({ defaultKey = 0, children, ...props }) => {
  const [state, setState] = useState({
    activeKey: defaultKey,
    tabs: [],
  })

  return (
    <TabContext.Provider value={state}>
      <TabUpdateContext.Provider value={setState}>
        <Box {...props}>{children}</Box>
      </TabUpdateContext.Provider>
    </TabContext.Provider>
  )
}

// TODO - register each tab with tab group to get title and eventKey

export function useTabs() {
  const state = useContext(AccordionContext)
  const setState = useContext(AccordionUpdateContext)

  if (typeof state === undefined) {
    throw new Error('Tab must be used within an TabGroup component')
  }

  return [state, setState]
}

export default TabGroup
