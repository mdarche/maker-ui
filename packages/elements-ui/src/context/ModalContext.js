import React, { useState, useContext } from "react"

const ModalStateContext = React.createContext()
const ModalUpdateContext = React.createContext()

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    modal: false,
    component: () => {},
  })

  return (
    <ModalStateContext.Provider value={modal}>
      <ModalUpdateContext.Provider value={setModal}>
        {children}
      </ModalUpdateContext.Provider>
    </ModalStateContext.Provider>
  )
}

// Usage Hook

function useModal() {
  const modal = useContext(ModalStateContext)
  const setModal = useContext(ModalUpdateContext)

  if (typeof modal === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }

  function toggleModal(component) {
    setModal(state => ({
      modal: !state.modal,
      component: component || state.component,
    }))
  }

  return [modal, toggleModal]
}

export { ModalProvider, useModal }
