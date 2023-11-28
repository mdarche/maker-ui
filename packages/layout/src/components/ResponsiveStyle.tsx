import * as React from 'react'
import { merge } from '@maker-ui/utils'
import {
  type Options,
  defaultSettings,
  MakerUIOptions,
} from '@maker-ui/layout-server'

import { getHeaderStyles } from '../styles/header'
import { getLayoutStyles } from '../styles/layout'

interface ResponsiveStyleProps {
  options: MakerUIOptions
  topbar?: boolean
  header?: boolean
}

function minifyString(templateString: string) {
  return templateString.replace(/\n/g, '').replace(/\s+/g, ' ').trim()
}

export const ResponsiveStyle = ({
  options,
  topbar = false,
  header = true,
}: ResponsiveStyleProps) => {
  const o = merge(defaultSettings, options || {}) as Options

  let css = ''
  css += getHeaderStyles(o, { topbar, header })
  css += getLayoutStyles(o, { topbar, header })

  return (
    <style
      id="mkui-responsive"
      dangerouslySetInnerHTML={{ __html: minifyString(css) }}
    />
  )
}
