import * as React from 'react'
import { Global } from '@emotion/react'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { LayoutProvider } from '../context/LayoutContext'
import { Skiplinks, LinkItem } from './Skiplinks'
import { ErrorBoundary } from './Errors'
import { MakerOptions } from '../types'

import { globalStyles } from '../utils/styles'
import { colorVars, themeVars } from '../utils/css-builder'

interface LayoutProps {
  children: React.ReactNode
  options: Partial<MakerOptions>
  styles?: object
  skiplinks?: LinkItem[]
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 * @TODO - support responsive arrays for global styles
 * @see https://maker-ui.com/docs/layout/layout
 */

export const Layout = ({
  options = {},
  styles = {},
  skiplinks,
  children,
}: LayoutProps) => {
  return (
    <OptionProvider options={options}>
      <LayoutProvider>
        <ActionProvider>
          <Global styles={colorVars(options.colors)} />
          <Global styles={themeVars(options)} />
          <Global styles={globalStyles} />
          <Global styles={{ ...(styles as object) }} />
          <Skiplinks links={skiplinks} />
          <ErrorBoundary errorKey="layout">{children}</ErrorBoundary>
        </ActionProvider>
      </LayoutProvider>
    </OptionProvider>
  )
}

Layout.displayName = 'MakerUI_Layout'
