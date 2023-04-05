import React, {
  useReducer,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn, merge, generateId } from '@maker-ui/utils'
import { Style } from '@maker-ui/style'

import { ErrorIcon, SuccessIcon, InfoIcon } from './Icons'
import { Toast } from './Toast'
import type { ToastState, Action, ToastProps, ToastSettings } from '../types'

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
  children: React.ReactNode
}

/**
 * The ToastProvider renders status updates during network requests or common
 * disk / memory storage operations.
 *
 * @prop {React.ReactNode} children a React child node
 */
export const ToastProvider = ({
  children,
  settings = {},
}: ToastProviderProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [styleId] = useState(generateId())
  const [state, dispatch] = useReducer(
    toastReducer,
    merge(
      {
        history: [],
        clearCache: true,
        position: 'bottom-left',
        padding: '5vh',
        duration: 3,
        distance: '5vh',
        gap: '1vh',
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

  const pos = getPosition(state.position, state.padding)
  const toasts = state.history.sort((a, b) => a.created_at - b.created_at)

  const dynamic = {
    padding: settings?.toast?.padding || '15px 20px',
    color: settings?.toast?.color || 'var(--color-text)',
    background: settings?.toast?.background || 'var(--color-background)',
    border: settings?.toast?.border,
    borderRadius: settings?.toast?.borderRadius || 2,
    boxShadow: settings?.toast?.boxShadow,
    svg: {
      height: settings?.toast?.iconHeight || 20,
      color: settings?.toast?.color || 'var(--color-text)',
      marginRight: 12,
    },
  }

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
      <Style
        root={styleId}
        css={{
          display: 'grid',
          position: 'fixed',
          zIndex: 1000,
          gap: state.gap,
          ...pos,
          '.mkui-toast': {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            ...dynamic,
            '--_travelDistance': 0,
            '--_duration': state.duration,
            willChange: 'transform',
            animation: `mkui-toast-fade-in 0.3s ease, mkui-toast-fade-out 0.3s ease ${state.duration}s`,
            '@media (prefers-reduced-motion: no-preference)': {
              '--_travelDistance': state.distance,
            },
          },
        }}
      />
      <div
        ref={ref}
        className={cn([
          'mkui-toast-hub',
          styleId,
          state.classNames?.container,
        ])}>
        {toasts?.map((props) => (
          <Toast key={props.id} {...props} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function getPosition(
  type?: ToastSettings['position'],
  padding?: string | number | (string | number)[]
) {
  let styles = {
    insetInline: type?.includes('center') ? 0 : undefined,
    left: type?.includes('left') ? 0 : undefined,
    right: type?.includes('right') ? 0 : undefined,
    top: type?.includes('top') ? 0 : undefined,
    bottom: type?.includes('bottom') ? 0 : undefined,
    paddingTop: type?.includes('top') ? padding : undefined,
    paddingBottom: type?.includes('bottom') ? padding : undefined,
    paddingLeft: type?.includes('left') ? padding : undefined,
    paddingRight: type?.includes('right') ? padding : undefined,
  }

  return styles
}
