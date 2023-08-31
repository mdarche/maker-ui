import React, { useReducer, createContext, useEffect, useRef } from 'react'
import { cn, merge, generateId } from '@maker-ui/utils'

import { ErrorIcon, SuccessIcon, InfoIcon } from './Icons'
import { Toast } from './Toast'
import type {
  ToastState,
  Action,
  ToastProps,
  ToastSettings,
  ToastStyles,
} from '@/types'
import { cssVariables } from 'src/variables'

function formatPositionClass(input: string): string {
  return input.replace(/-/g, ' ')
}

export const ToastContext = createContext<{
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
    case 'CREATE':
      return {
        ...state,
        history: [
          ...(state?.history || []),
          {
            id: generateId(6),
            ...action.value,
            active: true,
            created_at: parseFloat(Date.now().toString()),
          } as ToastProps,
        ],
      }
    case 'INACTIVE':
      const index = state.history.findIndex(({ id }) => action.value === id)
      if (index === -1) {
        return state
      }
      let newHistory = state.history.map((i) => {
        if (i?.id === action.value) {
          return { ...i, active: false }
        }
        return i
      })
      return { ...state, history: newHistory }
    case 'CLEAR_CACHE':
      return { ...state, history: [] }
    default: {
      //@ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

interface ToastProviderProps {
  settings?: Partial<ToastSettings>
  styles?: ToastStyles
  children: React.ReactNode
}

/**
 * The ToastProvider renders status updates during network requests or common
 * disk / memory storage operations.
 *
 * @prop {React.ReactNode} children a React child node
 *
 * @link https://maker-ui.com/api-reference/components/toastprovider
 */
export const ToastProvider = ({
  children,
  settings = {},
  styles,
}: ToastProviderProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useReducer(
    toastReducer,
    merge(
      {
        history: [],
        clearCache: true,
        icons: {
          error: <ErrorIcon />,
          success: <SuccessIcon />,
          help: <InfoIcon />,
        },
      },
      settings
    )
  )
  useEffect(() => {
    if (settings?.clearCache) {
      const stillActive = state.history.filter(({ active }) => active === true)
      if (!stillActive.length && state.history.length) {
        dispatch({ type: 'CLEAR_CACHE' })
      }
    }
  }, [state.history, settings?.clearCache])

  const toasts = state.history.sort((a, b) => a.created_at - b.created_at)
  const variables = cssVariables(styles)

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
      <div
        ref={ref}
        className={cn([
          'mkui-toast-container',
          formatPositionClass(state.position),
          state.classNames?.container,
        ])}
        style={variables}>
        {toasts?.map((props) => <Toast key={props.id} {...props} />)}
      </div>
    </ToastContext.Provider>
  )
}
