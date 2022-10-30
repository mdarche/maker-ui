import { ResponsiveScale } from '@maker-ui/css'

export interface ToastClassNames {
  container: string
  toast: string
  toast_icon: string
  toast_body: string
}

export interface ToastSettings {
  clearCache: boolean
  /** Custom component mapping for keyed types*/
  components: {
    [key: string]: React.ReactNode | ((msg: string) => React.ReactNode)
  }
  position:
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
  /** Custom classnames mapping for the toast component */
  classNames: Partial<ToastClassNames>
  /** Custom SVG icon mapping */
  icons: {
    [key: string]: React.ReactNode
  }
  /** Duration of a toasts visibility in seconds */
  duration?: number
  /** Distance of a toasts transform @default '5vh' */
  distance?: string
  /** Distance of the toast from the edge of the screen @default '5vh' */
  padding?: ResponsiveScale
  /** Distance between stacked toasts */
  gap?: ResponsiveScale
}

export interface ToastProps {
  id: string
  type: string
  icon: React.ReactNode
  component: React.ReactNode
  message: string | React.ReactElement
  dismiss: boolean | React.ReactElement
  created_at: number
  active: boolean
}

export interface ToastState extends ToastSettings {
  /** A cache of all past notification messages */
  history: ToastProps[]
}

export type Action =
  | {
      type: 'CREATE'
      value?: Partial<ToastProps>
    }
  | { type: 'INACTIVE'; value: string }
  | { type: 'CLEAR_CACHE' }
