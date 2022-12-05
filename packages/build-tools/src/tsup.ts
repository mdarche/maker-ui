import { type Options } from 'tsup'
import { promises as fs } from 'fs'
import path from 'path'
import postcss from 'postcss'
import postcssModules from 'postcss-modules'
import postcssNested from 'postcss-nested'

export interface BuildSettings {
  /** - If true, all `.module.css` files will include scoped hashes at the end of the selector
   *  - If false, the `.module.css` classes will not include a unique trailing hash
   * @default false
   */
  global?: boolean
  /** An array of entry points for the bundler
   * @default ['src/index.ts']
   */
  entry?: string[]
  /** Cleans the dist directory on each build (including watch mode)
   * @default false
   */
  clean?: boolean
}

export const buildConfig = ({
  global = false,
  entry = ['src/index.ts'],
  clean = false,
}: BuildSettings): Options => {
  return {
    entry,
    format: ['esm'],
    external: ['react'],
    dts: true,
    clean,
    esbuildPlugins: [
      {
        name: 'css-module',
        setup(build: any): void {
          build.onResolve(
            { filter: /\.module\.css$/, namespace: 'file' },
            (args: any) => ({
              path: `${args.path}#css-module`,
              namespace: 'css-module',
              pluginData: {
                pathDir: path.join(args.resolveDir, args.path),
              },
            })
          )
          build.onLoad(
            { filter: /#css-module$/, namespace: 'css-module' },
            async (args: any) => {
              const { pluginData } = args as {
                pluginData: { pathDir: string }
              }

              const source = await fs.readFile(pluginData.pathDir, 'utf8')

              let cssModule = {}
              const result = await postcss([
                postcssNested(),
                postcssModules({
                  getJSON(_, json) {
                    cssModule = json
                  },
                  exportGlobals: true,
                  generateScopedName: global
                    ? 'mkr_[local]'
                    : 'mkr_[local]_[hash:base64:5]',
                }),
              ]).process(source, { from: pluginData.pathDir })

              return {
                pluginData: { css: result.css },
                contents: `import "${
                  pluginData.pathDir
                }"; export default ${JSON.stringify(cssModule)}`,
              }
            }
          )
          build.onResolve(
            { filter: /\.module\.css$/, namespace: 'css-module' },
            (args: any) => ({
              path: path.join(args.resolveDir, args.path, '#css-module-data'),
              namespace: 'css-module',
              pluginData: args.pluginData as { css: string },
            })
          )
          build.onLoad(
            { filter: /#css-module-data$/, namespace: 'css-module' },
            (args: any) => ({
              contents: (args.pluginData as { css: string }).css,
              loader: 'css',
            })
          )
        },
      },
    ],
  }
}
