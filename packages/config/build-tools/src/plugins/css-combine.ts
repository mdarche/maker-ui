import { promises as fs } from 'fs'
import type { Plugin } from 'esbuild'

export const PluginCSSCombine: Plugin = {
  name: 'combine-css-files',
  setup(build) {
    build.onEnd(async (args) => {
      const filePaths =
        args?.outputFiles?.filter((f) => f.path?.includes('.css')) || []

      const newCSS = filePaths
        .reduce((css: string[], p) => {
          css.push(p?.text)
          return css
        }, [])
        .join('')
        .trim()

      await fs.writeFile('dist/styles.css', newCSS)
    })
  },
}
