import type { Options } from 'tsup'
import { clientPlugin, PluginCSSCombine, PluginCSSModule } from './plugins'

export interface BuildSettings extends Options {
  /** - If true, all `.module.css` files will include scoped hashes at the end of the selector
   *  - If false, the `.module.css` classes will not include a unique trailing hash
   * @default false
   */
  global?: boolean
}

const defaults: BuildSettings = {
  entry: ['src/index.ts'],
  format: ['cjs'],
  external: ['react'],
  dts: true,
  clean: true,
}

export const buildConfig = (p?: BuildSettings): Options => {
  const { global, ...props } = p || {}
  const settings: Options = { ...defaults, ...props }

  return {
    ...settings,
    esbuildPlugins: [
      PluginCSSModule(global || false),
      // PluginCSSCombine,
      // clientPlugin([]),
    ],
  }
}
