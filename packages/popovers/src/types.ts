import type { MakerCSS } from '@maker-ui/style'
import { TransitionState } from '@maker-ui/transition'

export interface Position {
  x: 'left' | 'center' | 'right' | 'origin'
  y: 'top' | 'center' | 'bottom'
}

export type TransitionType =
  | 'fade'
  | 'fade-down'
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'none'

export type Offset = { x: number; y: number } | number

interface Styles {
  background?: string
  border?: string
  color?: string
  fontSize?: number | string
  fontFamily?: string
  padding?: number | string
}

interface ButtonStyles extends Styles {
  backgroundHover?: string
  colorHover?: string
}

export interface PopoverStyles {
  popover?: Styles
  tooltip?: Styles
  dropdown?: Styles
  button?: ButtonStyles
}

export interface PopoverProps
  extends MakerCSS,
    React.HTMLAttributes<HTMLDivElement> {
  /** A boolean that indicates if the popover is active. */
  show: boolean
  /** A setter for the show boolean that lets the popover close itself. */
  set?: React.Dispatch<React.SetStateAction<boolean>>
  /** A React ref that is used to anchor the position of the Popover. */
  anchorRef: React.RefObject<HTMLElement>
  /** If true, the Popover will match the width of the anchorRef element. Useful for
   * dropdown menus.
   */
  matchWidth?: boolean
  /** The {x, y} position of the popover.
   * @default { x: "origin", y: "bottom" }
   */
  position?: Position
  /** The amount of space (in pixels) between the popover and its anchor element.
   * @default 0
   */
  offset?: Offset
  /** An optional ID selector or React ref that the popover will attach to. Defaults to
   * the document body.
   * @default 0
   */
  appendTo?: string | Element | null
  /** If true, the Popover will prevent keyboard focus from exiting the component.*/
  trapFocus?: boolean
  /** If true, the Popover will close when keyboard focus leaves the component.
   * @default true
   */
  closeOnBlur?: boolean
  /** Predefined transition styles that you can use to toggle the Popover.
   * @default "fade"
   */
  transition?: TransitionType
  /** Lets you customize the different states of the mount / unmount transition instead of using
   * the `transition` prop.
   * @example
   * const transitions: {
   *   start: { opacity: 0 },
   *   entering: { opacity: 1 },
   *   entered: { opacity: 1 },
   *   exiting: { opacity: 0 },
   *   exited: { opacity: 0 },
   * }
   */
  transitionState?: TransitionState
  /** Animation duration in milliseconds
   * @default 200
   */
  duration?: number
  /** CSS variable access for the popover and its trigger button (if Dropdown or Tooltip) */
  styles?: PopoverStyles
  /** @internal */
  /** The child component of the Popover */
  children: React.ReactNode
}
