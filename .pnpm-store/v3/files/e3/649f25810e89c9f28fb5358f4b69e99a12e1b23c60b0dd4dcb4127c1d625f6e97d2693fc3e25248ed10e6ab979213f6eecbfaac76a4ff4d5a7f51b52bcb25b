// @ts-check
const debug = require('debug')('find-webpack')
const path = require('path')
const fs = require('fs')
const findYarnWorkspaceRoot = require('find-yarn-workspace-root')
const tryLoadingWebpackConfig = require('./load-webpack-config')

const tryVueCLIScripts = () => {
  const webpackConfigPath = path.resolve(
    findYarnWorkspaceRoot() || process.cwd(),
    'node_modules',
    '@vue',
    'cli-service',
    'webpack.config.js',
  )

  debug('path to Vue CLI resolved webpack.config.js: %s', webpackConfigPath)
  return tryLoadingWebpackConfig(webpackConfigPath)
}

const tryRootProjectWebpack = () => {
  const webpackConfigPath = path.resolve(
    findYarnWorkspaceRoot() || process.cwd(),
    'webpack.config.js',
  )

  debug('path to root webpack.config.js: %s', webpackConfigPath)
  return tryLoadingWebpackConfig(webpackConfigPath)
}

const tryReactScripts = () => {
  // try requiring the file or, if it does not work, try parent folders
  // maybe it is a monorepo situation
  const root = findYarnWorkspaceRoot() || process.cwd()
  debug('trying filename for react scripts from root %s', root)

  let filename = path.resolve(
    root,
    'node_modules',
    'react-scripts',
    'config',
    'webpack.config.js',
  )
  let found = tryLoadingWebpackConfig(filename)
  if (found) {
    return found
  }

  debug('trying .. folder')
  filename = path.resolve(
    root,
    '..',
    'node_modules',
    'react-scripts',
    'config',
    'webpack.config.js',
  )
  found = tryLoadingWebpackConfig(filename)
  if (found) {
    return found
  }

  debug('trying ../.. folder')
  filename = path.resolve(
    root,
    '..',
    '..',
    'node_modules',
    'react-scripts',
    'config',
    'webpack.config.js',
  )
  return tryLoadingWebpackConfig(filename)
}

const tryEjectedReactScripts = () => {
  const webpackConfigPath = path.resolve(
    process.cwd(),
    'config',
    'webpack.config.js',
  )
  return tryLoadingWebpackConfig(webpackConfigPath)
}

/**
 * Try loading React scripts webpack config using "require" - because maybe
 * the `react-scripts` were installed in a parent folder (but without using Yarn workspace)
 */
const tryWebpackInReactScriptsModule = () => {
  const webpackConfigModuleName = 'react-scripts/config/webpack.config.js'
  debug(
    'trying to require webpack config via path: %s',
    webpackConfigModuleName,
  )
  debug('in current directory %s', process.cwd())

  const found = tryLoadingWebpackConfig(webpackConfigModuleName)
  if (!found) {
    debug('Could not find react-scripts webpack config')
    const packageJsonExists = fs.existsSync(
      path.join(process.cwd(), 'package.json'),
    )
    if (!packageJsonExists) {
      debug('⚠️ react-scripts requires package.json file')
      debug('We could not find it in % s', process.cwd())
    }
  }
  return found
}

/**
 * Tries really hard to find Webpack config file
 * and load it using development environment name.
 */
const getWebpackOptions = () => {
  debug('get webpack starting from cwd: %s', process.cwd())
  const webpackOptions =
    tryReactScripts() ||
    tryEjectedReactScripts() ||
    tryVueCLIScripts() ||
    tryRootProjectWebpack() ||
    tryWebpackInReactScriptsModule()

  if (!webpackOptions) {
    // TODO: nice user error message if we can't find
    // any of the normal webpack configurations
    debug('could not find webpack options')
  }
  return webpackOptions
}

module.exports = getWebpackOptions
