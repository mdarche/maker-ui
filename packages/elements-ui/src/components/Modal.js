import React from 'react'
import { createPortal } from 'react-dom'
import { Flex } from 'theme-ui'

// import { useModal } from '../context/ModalContext'

export const Modal = React.forwardRef(
  ({ open, variant = 'modal', children, ...props }, ref) => {
    // const [modal, setModal] = useModal()

    return (
      <Flex
        ref={ref}
        as="dialog"
        variant={variant}
        open={open}
        inert={true}
        {...props}
        __css={{ justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </Flex>
    )
  }
)
