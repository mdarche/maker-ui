import type { Options } from 'tsup'
import { PluginCSSModule } from './plugins'

export interface BuildSettings extends Options {
  /** - If true, all `.module.css` files will include scoped hashes at the end of the selector
   *  - If false, the `.module.css` classes will not include a unique trailing hash
   * @default false
   */
  global?: boolean
}

const defaults: BuildSettings = {
  entry: ['src/index.ts'],
  format: ['esm'],
  external: ['react'],
  dts: true,
  clean: false,
}

/**
 * A simple wrapper around tsup to provide some default settings.
 *
 * @param settings {BuildSettings} - The settings to use when building the project
 * @returns {Options} - Build options for tsup
 */
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
