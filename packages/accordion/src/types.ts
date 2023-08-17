interface AccordionClasses {
  /** Root Accordion component container */
  group?: string
  /** Accordion panel outer wrapper. This class handles the collapsing functionality. */
  panel?: string
  /** Accordion panel inner wrapper. This wraps your `Accordion.Panel` child content. */
  panelContent?: string
  /** The outermost wrapper for the `Accordion.Panel` component. */
  panelGroup?: string
  /** The `Accordion.Panel` button. */
  button?: string
}

interface AccordionStyles {
  button?: {
    color?: string
    colorActive?: string
    background?: string
    backgroundActive?: string
    border?: string
    borderActive?: string
    padding?: string | number
    fontSize?: string | number
    fontFamily?: string
  }
  panel?: {
    padding?: string | number
    background?: string
    fontSize?: string | number
  }
  icon?: {
    fill?: string
    fillActive?: string
    height?: string | number
  }
}

export interface AccordionProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  /** If true, the Accordion button will render an icon that shows expand / collapse status.
   * @default true
   */
  icon?: boolean
  /** An optional icon, set of icons, or callback function that can be used to supply a custom
   * accordion toggle icon.
   */
  customIcon?:
    | React.ReactElement
    | {
        expand: React.ReactElement
        collapse: React.ReactElement
      }
    | ((isExpanded: boolean) => React.ReactNode)
  /** A custom class name to apply to the accordion button when it is active.
   * @default 'expanded'
   */
  activeClass?: string
  /** The currently active accordion panel key if controlled by an external or parent component.
   * Make sure the key exists as an `eventKey` prop on a nested `<Accordion.Panel>`.
   */
  activeKey?: number | string
  /** If true, the accordion will only display one open panel at a time.
   * @default false
   */
  showSingle?: boolean
  /** If true or if you supply a string, the accordion will add a
   * CSS transition to the accordion panel's height. NOTE: Animating height will force a repaint
   * that may affect your app's performance.
   * @default false
   */
  animate?: boolean | string
  /** Custom styles for all accordion HTML elements. */
  styles?: AccordionStyles
  /** Custom class selectors for all accordion HTML elements. */
  classNames?: AccordionClasses
  /** Nested AccordionPanel children. */
  children?: React.ReactElement[] | React.ReactNode
}
