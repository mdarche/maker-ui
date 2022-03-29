/* eslint-disable no-unused-vars */
import React, { useReducer, createContext, useEffect, useContext } from 'react'
import { mergeSelectors } from '@maker-ui/utils'
import { CSSTransition } from '@maker-ui/transition'

import { ErrorIcon, SaveIcon, SuccessIcon, InfoIcon } from './icons'
import styles from './ToastProvider.styles'

// TODO - Stack multiple toasts and push older ones up
// TODO - Create settings config for Provider that specifies colors / icons / toast position / custom template

interface ToastState {
  /** An boolean that indicates if the toast message is active */
  active: boolean
  /** The type of toast message */
  type: 'ERROR' | 'SUCCESS' | 'SAVE' | 'HELP' | 'HIDDEN'
  /** The message that appears right of the icon */
  message?: string
  /** The SVG icon that appears left of the message */
  icon?: React.ReactElement
}

type Action = {
  type: ToastState['type']
  value?: Partial<ToastState>
}

const ToastContext = createContext<{
  state: Partial<ToastState>
  dispatch: (a: Action) => void
}>({ state: {}, dispatch: (a) => {} })

/**
 * The ToastProvider's state machine function for managing locally cached data.
 *
 * @param {ToastState} state
 * @param {Action} action
 * @returns {ToastState} an updated version of local state
 */
function toastReducer(state: ToastState, action: Action): ToastState {
  switch (action.type) {
    case 'ERROR': {
      return {
        active: true,
        type: action.type,
        message: action.value?.message || 'Network error',
        icon: action.value?.icon || <ErrorIcon />,
      }
    }
    case 'SAVE': {
      return {
        active: true,
        type: action.type,
        message: action.value?.message || 'Saved',
        icon: action.value?.icon || <SaveIcon />,
      }
    }
    case 'SUCCESS': {
      return {
        active: true,
        type: action.type,
        message: action.value?.message || 'Success',
        icon: action.value?.icon || <SuccessIcon />,
      }
    }
    case 'HELP': {
      return {
        active: true,
        type: action.type,
        message: action.value?.message || 'Help',
        icon: action.value?.icon || <InfoIcon />,
      }
    }
    case 'HIDDEN': {
      return {
        ...state,
        active: false,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

/**
 * The ToastProvider renders status updates during network requests or common
 * disk / memory storage operations.
 *
 * @prop {React.ReactNode} children a React child node
 */
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toastReducer, {
    active: false,
    type: 'SUCCESS',
    message: 'Success',
    icon: <SuccessIcon />,
  })

  /**
   * Toggle toast status to hidden after 3 seconds of visibility
   */
  useEffect(() => {
    if (state.active) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDDEN' })
      }, 3000)

      return () => clearInterval(timer)
    }
  }, [state.active])

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
      <CSSTransition
        className="toast-animate"
        show={state.active}
        containerProps={{ id: 'toast-container' }}
        css={styles}>
        <div className={mergeSelectors(['toast', state.type])}>
          {state.icon as React.ReactElement}
          <span>{state.message}</span>
        </div>
      </CSSTransition>
    </ToastContext.Provider>
  )
}

/**
 * React hook for using the Toast component throughout the application
 */
export function useToast() {
  const { dispatch } = useContext(ToastContext)

  /**
   * Renders the toast notification at the bottom of the window
   *
   * @param {ToastState['type']} type the toast type
   * @param {string} message an optional custom toast message
   * @param {React.ReactElement} icon an optional React Element (ie. svg or custom div)
   * @returns {void}
   */
  function showToast(
    type: ToastState['type'],
    message?: ToastState['message'],
    icon?: ToastState['icon']
  ) {
    dispatch({ type, value: { message, icon } })
  }

  return { showToast }
}
