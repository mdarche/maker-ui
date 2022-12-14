import type { PluginBuild, Plugin } from 'esbuild'
import { promises as fs } from 'fs'
import path from 'path'
import postcss from 'postcss'
import postcssModules from 'postcss-modules'
import postcssNested from 'postcss-nested'

export const PluginCSSModule: (global: boolean) => Plugin = (g) => {
  return {
    name: 'css-module',
    setup(build: PluginBuild) {
      build.onResolve(
        { filter: /\.module\.css$/, namespace: 'file' },
        (args) => ({
          path: `${args.path}#css-module`,
          namespace: 'css-module',
          pluginData: {
            pathDir: path.join(args.resolveDir, args.path),
          },
        })
      )
      build.onLoad(
        { filter: /#css-module$/, namespace: 'css-module' },
        async (args) => {
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
              generateScopedName: g
                ? 'mkui_[local]'
                : 'mkui_[local]_[hash:base64:5]',
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
        (args) => ({
          path: path.join(args.resolveDir, args.path, '#css-module-data'),
          namespace: 'css-module',
          pluginData: args.pluginData as { css: string },
        })
      )
      build.onLoad(
        { filter: /#css-module-data$/, namespace: 'css-module' },
        (args) => ({
          contents: (args.pluginData as { css: string }).css,
          loader: 'css',
        })
      )
    },
  }
}
