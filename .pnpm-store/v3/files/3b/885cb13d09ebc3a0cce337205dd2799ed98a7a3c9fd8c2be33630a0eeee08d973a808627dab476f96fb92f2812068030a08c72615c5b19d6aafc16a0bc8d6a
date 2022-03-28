// @ts-check
const debug = require('debug')('find-webpack')
const mockEnv = require('mocked-env')

/**
 * Safe loading of Webpack options
 * - sets NODE_ENV to "development"
 * - if config exports a function, calls the function
 */
const tryLoadingWebpackConfig = (webpackConfigPath) => {
  debug('trying to load webpack config from %s', webpackConfigPath)
  // Do this as the first thing so that any code reading it knows the right env.
  const envName = 'development'

  // @ts-ignore
  const restoreEnv = mockEnv({
    BABEL_ENV: envName,
    // always set env name to "test" to load test plugins
    // and environment variables
    NODE_ENV: 'test',
  })
  try {
    let webpackOptions = require(webpackConfigPath)

    if (webpackOptions.default) {
      // we probably loaded TS file
      debug('loaded webpack options has .default - taking that as the config')
      webpackOptions = webpackOptions.default
    }

    if (typeof webpackOptions === 'function') {
      debug('calling webpack function with environment "%s"', envName)
      webpackOptions = webpackOptions(envName)
    }
    debug('webpack options: %o', webpackOptions)
    return webpackOptions
  } catch (err) {
    debug('could not load react-scripts webpack')
    debug('error %s', err.message)
    debug(err)
    restoreEnv()
  }
}

module.exports = tryLoadingWebpackConfig
