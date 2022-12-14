// Temporary file that should be run before next dev or next build

import { promises as fs } from 'fs'
import { MakerUIOptions, Options } from '@/types'
import { defaults } from '@/defaults'
import { getHeaderStyles } from '../components/server/Header/responsive'
import { getLayoutStyles } from '../components/server/Layout/responsive'
import { merge } from '@maker-ui/utils'

interface Settings {
  topbar?: boolean
  header?: boolean
  fileName?: string
  dir?: string
}

export async function generateCSS(
  options: MakerUIOptions,
  settings: Settings = {}
) {
  const o: Options = merge(defaults, options)
  const s = merge(
    { header: true, topbar: false, fileName: '_responsive.css', dir: '.' },
    settings
  )
  const c = { header: s.header, topbar: s.topbar }

  let css = ''
  css += getHeaderStyles(o, c)
  css += getLayoutStyles(o, c)

  await fs.writeFile(`${s.dir}/${s.fileName}`, css)
}
