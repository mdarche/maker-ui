import * as React from 'react'
import { Div, DivProps, setClassName } from 'maker-ui'

import { AccordionContext } from './AccordionContext'
import { AccordionPanel } from './AccordionPanel'
import { SpringConfig } from 'react-spring'

export interface AccordionProps extends DivProps {
  icon?: boolean
  customIcons?: {
    expand?: React.ReactElement
    collapse?: React.ReactElement
  }
  activeKey?: number | string
  showSingle?: boolean
  springConfig?: SpringConfig
}

/**
 * The `Accordion` shows collapsible panel content that can be toggled via
 * `activeKey` prop or the panel title buttle.
 *
 * @see https://maker-ui.com/docs/components/accordion
 */

export const Accordion = ({
  icon = true,
  customIcons,
  activeKey = 0,
  showSingle = false,
  className,
  css,
  children,
  ...props
}: AccordionProps) => {
  return (
    <AccordionContext
      icon={icon}
      customIcons={customIcons}
      activeKey={activeKey}
      showSingle={showSingle}>
      <Div
        className={setClassName('accordion-container', className)}
        css={{ ...(css as object) }}
        {...props}>
        {children}
      </Div>
    </AccordionContext>
  )
}

Accordion.displayName = 'Accordion'
Accordion.Panel = AccordionPanel
