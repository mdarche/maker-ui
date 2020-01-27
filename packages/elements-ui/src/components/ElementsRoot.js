import React, { useEffect } from 'react'

import { useOptionsUpdater } from '../context/ElementsContext'
import Skiplinks from './Skiplinks'
import Modal from './Modal'

const ElementsRoot = ({ options, children }) => {
  const setOptions = useOptionsUpdater()

  useEffect(() => {
    if (options !== undefined) {
      setOptions(options)
    }
  }, [setOptions, options])

  return (
    <>
      <Skiplinks />
      {children}
      <Modal />
    </>
  )
}

export default ElementsRoot
