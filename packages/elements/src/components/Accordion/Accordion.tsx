import * as React from 'react'
import { Div, DivProps, mergeSelectors } from 'maker-ui'

import { AccordionContext } from './AccordionContext'
import { AccordionPanel } from './AccordionPanel'

export interface AccordionProps extends DivProps {
  icon?: boolean
  customIcon?:
    | React.ReactElement
    | {
        expand: React.ReactElement
        collapse: React.ReactElement
      }
    | ((isExpanded: boolean) => React.ReactNode)
  activeKey?: number | string
  showSingle?: boolean
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
  css,
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
      <Div
        className={mergeSelectors(['accordion-container', className])}
        css={{ ...(css as object) }}
        {...props}>
        {children}
      </Div>
    </AccordionContext>
  )
}

Accordion.displayName = 'Accordion'
Accordion.Panel = AccordionPanel
