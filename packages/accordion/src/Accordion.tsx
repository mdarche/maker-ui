import * as React from 'react'
import { cn } from '@maker-ui/utils'

import { AccordionContext } from './AccordionContext'
import { AccordionPanel } from './AccordionPanel'

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
  /** The currently active accordion panel key if controlled by an external or parent component.
   * Make sure the key exists as an `eventKey` prop on a nested `<Accordion.Panel>`.
   */
  activeKey?: number | string
  /** If true, the accordion will only display one open panel at a time.
   * @default false
   */
  showSingle?: boolean
  /** If true or if you supply a configuration object, the accordion will add a
   * CSS transition to the accordion panel's height. NOTE: Animating height will force a repaint
   * that may affect your app's performance.
   * @default false
   */
  animate?: boolean | { transition: string }
}

/**
 * The `Accordion` shows collapsible panel content that can be toggled via
 * `activeKey` prop or the panel title buttle.
 *
 * @link https://maker-ui.com/docs/elements/accordion
 */

export const Accordion = ({
  icon = true,
  customIcon,
  activeKey = 0,
  showSingle = false,
  className,
  // css,
  animate = false,
  children,
  ...props
}: AccordionProps) => {
  return (
    <AccordionContext
      icon={icon}
      customIcon={customIcon}
      activeKey={activeKey}
      showSingle={showSingle}
      animate={animate}>
      <div className={cn(['mk_accordion', className])} {...props}>
        {children}
      </div>
    </AccordionContext>
  )
}

Accordion.displayName = 'Accordion'
Accordion.Panel = AccordionPanel
