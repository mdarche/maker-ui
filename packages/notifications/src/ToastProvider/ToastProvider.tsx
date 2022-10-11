import React, {
  useReducer,
  createContext,
  useEffect,
  useContext,
  useRef,
} from 'react'
import { Div } from '@maker-ui/primitives'
import { mergeSelectors, merge, generateId } from '@maker-ui/utils'

import { ErrorIcon, SuccessIcon, InfoIcon } from './icons'
// import styles from './default.styles'

interface ToastClassNames {
  container?: string
  toast?: string
  toast_icon?: string
  toast_body?: string
  dismiss?: string
  error: string
  success: string
  help: string
}

interface ToastSettings {
  clearCache: boolean
  /** Custom component mapping for keyed types*/
  component:
    | React.ReactNode
    | {
        [key: string]: React.ReactNode
      }
  position: 'top-left' | 'center' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** Custom classnames for the toast component */
  classNames: ToastClassNames
  /** The SVG icon that appears left of the message */
  icon:
    | React.ReactNode
    | {
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
  created_at: string
  active: boolean
}

interface ToastState extends ToastSettings {
  /** A cache of all past notification messages */
  history: ToastProps[]
  /** Number of times the function has been called */
  count: number
}

type Action =
  | {
      type: 'CREATE'
      value?: Partial<ToastProps>
    }
  | { type: 'INACTIVE'; value: string }

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
        count: state.count + 1,
        history: [
          ...(state?.history || []),
          {
            id: generateId(6),
            ...action.value,
            active: true,
            created_at: Date.now().toString(),
          } as ToastProps,
        ],
      }
    default: {
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
        count: 0,
        clearCache: false,
        position: 'bottom-left',
        icon: {
          error: <ErrorIcon />,
          success: <SuccessIcon />,
          help: <InfoIcon />,
          dismiss: <div>close</div>,
          saved: <div>spinner</div>,
        },
      },
      settings
    )
  )
  const activeToasts = state.history?.filter(({ active }) => active)
  // .sort((a, b) => a?.created_at - b?.created_at)

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
      <Div
        ref={ref}
        className={state.classNames?.container}
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
        }}>
        {activeToasts?.map((props, i) => (
          <Toast key={i} {...props} />
        ))}
      </Div>
    </ToastContext.Provider>
  )
}

export const Toast = ({ id, type, ...p }: ToastProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { icon, component, classNames, setInactive } = useToast()
  const isObject = (c?: any) => c && typeof c === 'object'
  const isComponent = (c?: any) => c && React.isValidElement(c)

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
    <div
      ref={ref}
      className={mergeSelectors(['toast', classNames?.toast, type])}>
      {isComponent(p.component) ? (
        p.component
      ) : isObject(component) && isComponent(component[type]) ? (
        component[type]
      ) : (
        <>
          <div className={classNames[type]}>
            {p.icon || (icon[type] ?? null)}
          </div>
          <div className={}>{p.message}</div>
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
    icon: state.icon,
    classNames: state.classNames,
    component: state.component,
    setInactive,
  }
}
