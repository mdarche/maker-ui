import React, {
  useReducer,
  createContext,
  useEffect,
  useContext,
  useRef,
} from 'react'
import { Div } from '@maker-ui/primitives'
import { cx, merge, generateId } from '@maker-ui/utils'

import { ErrorIcon, SuccessIcon, InfoIcon } from './icons'
// import styles from './default.styles'

interface ToastClassNames {
  container: string
  toast: string
  toast_icon: string
  toast_body: string
}

interface ToastSettings {
  clearCache: boolean
  /** Custom component mapping for keyed types*/
  components: {
    [key: string]: React.ReactNode | ((msg: string) => React.ReactNode)
  }
  position: 'top-left' | 'center' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** Custom classnames mapping for the toast component */
  classNames: Partial<ToastClassNames>
  /** Custom SVG icon mapping */
  icons: {
    [key: string]: React.ReactNode
  }
}

interface ToastProps {
  id: string
  type: string
  icon: React.ReactNode
  component: React.ReactNode
  message: string | React.ReactElement
  dismiss: boolean | React.ReactElement
  created_at: number
  active: boolean
}

interface ToastState extends ToastSettings {
  /** A cache of all past notification messages */
  history: ToastProps[]
  offsetHeight: number
}

type Action =
  | {
      type: 'CREATE'
      value?: Partial<ToastProps>
    }
  | { type: 'INACTIVE'; value: string }
  | { type: 'CLEAR_CACHE' }

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
      const el = document?.getElementById('toast-provider')
      const offsetHeight = el?.offsetHeight as number
      return {
        ...state,
        offsetHeight,
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
        clearCache: false,
        position: 'bottom-left',
        offsetHeight: 0,
        icons: {
          error: <ErrorIcon />,
          success: <SuccessIcon />,
          help: <InfoIcon />,
        },
      },
      settings
    )
  )
  const activeToasts = state.history
    ?.filter(({ active }) => active)
    .sort((a, b) => a.created_at - b.created_at)

  useEffect(() => {
    if (settings?.clearCache) {
      const stillActive = state.history.filter(({ active }) => active === true)
      if (!stillActive.length && state.history.length) {
        dispatch({ type: 'CLEAR_CACHE' })
      }
    }
    if (state.history.length) {
      const newHeight = ref?.current?.offsetHeight as number
      ref?.current?.animate(
        [
          { transform: `translateY(${newHeight - state.offsetHeight}px)` },
          { transform: 'translateY(0)' },
        ],
        {
          duration: 150,
          easing: 'ease-out',
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.history, settings?.clearCache])

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
      <Div
        id="toast-provider"
        ref={ref}
        className={cx(['toast-container', state.classNames?.container])}
        css={{
          position: 'fixed',
          zIndex: 1,
          insetBlockEnd: 0,
          insetInline: 0,
          paddingBlockEnd: '5vh',
          display: 'grid',
          justifyItems: 'center',
          justifyContent: 'center',
          gap: '1vh',
          // '.toast': {
          //   '--_duration': '3s',
          //   '--_travelDistance': 0,
          //   willChange: 'transform',
          //   animation:
          //     'toast-fade-in 0.3s ease, toast-fade-out 0.3s ease var(--_duration)',
          // },
          // '@media (prefers-reduced-motion: no-preference)': {
          //   '.toast': {
          //     '--_travelDistance': '5vh',
          //   },
          // },
        }}>
        {activeToasts?.map((props) => (
          <Toast key={props.id} {...props} />
        ))}
      </Div>
    </ToastContext.Provider>
  )
}

export const Toast = ({ id, type, message, ...p }: ToastProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { icons, components, classNames, setInactive } = useToast()

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
      if (e.animationName === 'toast-fade-out') setInactive(id)
    }
    toast?.addEventListener('animationend', unmount)
    return () => toast?.removeEventListener('animationend', unmount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className={cx(['toast', classNames?.toast, type])}>
      {_component ?? (
        <>
          {_icon ? (
            <div className={cx(['toast-icon', classNames?.toast_icon, type])}>
              {_icon}
            </div>
          ) : null}
          <div className={cx(['toast-body', classNames?.toast_body, type])}>
            {message}
          </div>
        </>
      )}
    </div>
  )
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
