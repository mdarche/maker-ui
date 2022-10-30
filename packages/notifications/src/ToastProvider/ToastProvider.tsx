import React, {
  useReducer,
  createContext,
  useEffect,
  useContext,
  useRef,
} from 'react'
import { Div } from '@maker-ui/primitives'
import { cx, merge, generateId } from '@maker-ui/utils'

import type { ToastState, Action, ToastProps, ToastSettings } from './types'
import { ErrorIcon, SuccessIcon, InfoIcon } from './icons'
import { ResponsiveScale } from '@maker-ui/css'

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

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
      <Div
        id="toast-provider"
        ref={ref}
        className={cx(['toast-container', state.classNames?.container])}
        css={{
          position: 'fixed',
          zIndex: 100,
          display: 'grid',
          justifyItems: 'center',
          justifyContent: 'center',
          gap: state.gap,
          ...pos,
          '.toast': {
            '--_travelDistance': 0,
            willChange: 'transform',
            animation: `toast-fade-in 0.3s ease, toast-fade-out 0.3s ease ${state.duration}s`,
          },
          '@media (prefers-reduced-motion: no-preference)': {
            '.toast': {
              '--_travelDistance': state.distance,
            },
          },
        }}>
        {toasts?.map((props) => (
          <Toast key={props.id} {...props} />
        ))}
      </Div>
    </ToastContext.Provider>
  )
}

export const Toast = ({ id, type, message, ...p }: ToastProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { icons, components, classNames, setInactive } = useToast()
  // Templates
  const _icon = p?.icon ? p.icon : icons && icons[type] ? icons[type] : null
  const _component = p?.component
    ? p?.component
    : components && components[type]
    ? typeof components[type] === 'function'
      ? (components[type] as Function)(message)
      : components[type]
    : null

  useEffect(() => {
    const toast = ref?.current
    const unmount = (e: AnimationEvent) => {
      if (e.animationName === 'toast-fade-out') {
        setInactive(id)
      }
    }
    toast?.addEventListener('animationend', unmount)
    return () => toast?.removeEventListener('animationend', unmount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return p?.active ? (
    <div
      ref={ref}
      className={cx([
        'toast',
        classNames?.toast,
        type,
        !p.active ? 'inactive' : undefined,
      ])}>
      {_component ?? (
        <>
          {_icon ? (
            <div className={cx(['toast-icon', classNames?.toast_icon])}>
              {_icon}
            </div>
          ) : null}
          <div className={cx(['toast-body', classNames?.toast_body])}>
            {message}
          </div>
        </>
      )}
    </div>
  ) : null
}

/**
 * React hook for using the Toast component throughout the application
 */
export function useToast() {
  const { state, dispatch } = useContext(ToastContext)

  /**
   * Renders the toast notification at the bottom of the window
   *
   * @param {ToastState['type']} type the toast type
   * @param {string} message an optional custom toast message
   * @param {React.ReactElement} icon an optional React Element (ie. svg or custom div)
   * @param {React.ReactElement} component an optional React Element (ie. svg or custom div)
   * @returns {void}
   */
  function toast(props: Partial<ToastProps>) {
    dispatch({ type: 'CREATE', value: props })
  }

  function setInactive(id: string) {
    dispatch({ type: 'INACTIVE', value: id })
  }

  return {
    toast,
    icons: state.icons,
    history: state.history,
    classNames: state.classNames,
    components: state.components,
    setInactive,
  }
}

function getPosition(
  type?: ToastSettings['position'],
  padding?: ResponsiveScale
) {
  let styles = {
    insetInline: type?.includes('center') ? 0 : undefined,
    insetInlineStart: type?.includes('left') ? 0 : undefined,
    insetInlineEnd: type?.includes('right') ? 0 : undefined,
    insetBlockStart: type?.includes('top') ? 0 : undefined,
    insetBlockEnd: type?.includes('bottom') ? 0 : undefined,
    paddingBlockStart: type?.includes('top') ? padding : undefined,
    paddingBlockEnd: type?.includes('bottom') ? padding : undefined,
    paddingInlineStart: type?.includes('left') ? padding : undefined,
    paddingInlineEnd: type?.includes('right') ? padding : undefined,
  }

  return styles
}
