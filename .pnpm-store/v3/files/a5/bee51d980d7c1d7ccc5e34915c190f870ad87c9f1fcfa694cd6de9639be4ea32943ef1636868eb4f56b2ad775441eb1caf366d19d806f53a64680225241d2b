'use strict'

const path = require('path')
const Promise = require('bluebird')
const fs = require('fs-extra')

const cloneDeep = require('lodash.clonedeep')
const browserify = require('browserify')
const watchify = require('watchify')

const debug = require('debug')('cypress:browserify')

const typescriptExtensionRegex = /\.tsx?$/
const errorTypes = {
  TYPESCRIPT_AND_TSIFY: 'TYPESCRIPT_AND_TSIFY',
  TYPESCRIPT_NONEXISTENT: 'TYPESCRIPT_NONEXISTENT',
  TYPESCRIPT_NOT_CONFIGURED: 'TYPESCRIPT_NOT_CONFIGURED',
  TYPESCRIPT_NOT_STRING: 'TYPESCRIPT_NOT_STRING',
}

const bundles = {}

// by default, we transform JavaScript (including some proposal features),
// JSX, & CoffeeScript
const defaultOptions = {
  browserifyOptions: {
    extensions: ['.js', '.jsx', '.coffee'],
    transform: [
      [
        require.resolve('coffeeify'),
        {},
      ],
      [
        require.resolve('babelify'),
        {
          ast: false,
          babelrc: false,
          plugins: [
            ...[
              'babel-plugin-add-module-exports',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ].map(require.resolve),
            [require.resolve('@babel/plugin-transform-runtime'), {
              absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package')),
            }],
          ],
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ].map(require.resolve),
        },
      ],
    ],
    plugin: [],
  },
  watchifyOptions: {
    // ignore watching the following or the user's system can get bogged down
    // by watchers
    ignoreWatch: [
      '**/.git/**',
      '**/.nyc_output/**',
      '**/.sass-cache/**',
      '**/bower_components/**',
      '**/coverage/**',
      '**/node_modules/**',
    ],
  },
}

const throwError = ({ message, type }) => {
  const prefix = 'Error running @cypress/browserify-preprocessor:\n\n'

  const err = new Error(`${prefix}${message}`)

  if (type) err.type = type

  throw err
}

const getBrowserifyOptions = async (entry, userBrowserifyOptions = {}, typescriptPath = null) => {
  let browserifyOptions = cloneDeep(defaultOptions.browserifyOptions)

  // allow user to override default options
  browserifyOptions = Object.assign(browserifyOptions, userBrowserifyOptions, {
    // these must always be new objects or 'update' events will not fire
    cache: {},
    packageCache: {},
  })

  // unless user has explicitly turned off source map support, always enable it
  // so we can use it to point user to the source code
  if (userBrowserifyOptions.debug !== false) {
    browserifyOptions.debug = true
  }

  // we need to override and control entries
  Object.assign(browserifyOptions, {
    entries: [entry],
  })

  if (typescriptPath) {
    if (typeof typescriptPath !== 'string') {
      throwError({
        type: errorTypes.TYPESCRIPT_NOT_STRING,
        message: `The 'typescript' option must be a string. You passed: ${typescriptPath}`,
      })
    }

    const pathExists = await fs.pathExists(typescriptPath)

    if (!pathExists) {
      throwError({
        type: errorTypes.TYPESCRIPT_NONEXISTENT,
        message: `The 'typescript' option must be a valid path to your TypeScript installation. We could not find anything at the following path: ${typescriptPath}`,
      })
    }

    const transform = browserifyOptions.transform
    const hasTsifyTransform = transform.some((stage) => Array.isArray(stage) && stage[0].includes('tsify'))
    const hastsifyPlugin = browserifyOptions.plugin.includes('tsify')

    if (hasTsifyTransform || hastsifyPlugin) {
      const type = hasTsifyTransform ? 'transform' : 'plugin'

      throwError({
        type: errorTypes.TYPESCRIPT_AND_TSIFY,
        message: `It looks like you passed the 'typescript' option and also specified a browserify ${type} for TypeScript. This may cause conflicts.

Please do one of the following:

1) Pass in the 'typescript' option and omit the browserify ${type} (Recommmended)
2) Omit the 'typescript' option and continue to use your own browserify ${type}`,
      })
    }

    browserifyOptions.extensions.push('.ts', '.tsx')
    // remove babelify setting
    browserifyOptions.transform = transform.filter((stage) => !Array.isArray(stage) || !stage[0].includes('babelify'))
    // add typescript compiler
    browserifyOptions.transform.push([
      path.join(__dirname, './lib/simple_tsify'), {
        typescript: require(typescriptPath),
      },
    ])
  }

  debug('browserifyOptions: %o', browserifyOptions)

  return browserifyOptions
}

// export a function that returns another function, making it easy for users
// to configure like so:
//
// on('file:preprocessor', browserify(options))
//
const preprocessor = (options = {}) => {
  debug('received user options: %o', options)

  // we return function that accepts the arguments provided by
  // the event 'file:preprocessor'
  //
  // this function will get called for the support file when a project is loaded
  // (if the support file is not disabled)
  // it will also get called for a spec file when that spec is requested by
  // the Cypress runner
  //
  // when running in the GUI, it will likely get called multiple times
  // with the same filePath, as the user could re-run the tests, causing
  // the supported file and spec file to be requested again
  return async (file) => {
    const filePath = file.filePath

    debug('get:', filePath)

    // since this function can get called multiple times with the same
    // filePath, we return the cached bundle promise if we already have one
    // since we don't want or need to re-initiate browserify/watchify for it
    if (bundles[filePath]) {
      debug('already have bundle for:', filePath)

      return bundles[filePath]
    }

    // we're provided a default output path that lives alongside Cypress's
    // app data files so we don't have to worry about where to put the bundled
    // file on disk
    const outputPath = file.outputPath

    debug('input:', filePath)
    debug('output:', outputPath)

    const browserifyOptions = await getBrowserifyOptions(filePath, options.browserifyOptions, options.typescript)
    const watchifyOptions = Object.assign({}, defaultOptions.watchifyOptions, options.watchifyOptions)

    if (!options.typescript && typescriptExtensionRegex.test(filePath)) {
      throwError({
        type: errorTypes.TYPESCRIPT_NOT_CONFIGURED,
        message: `You are attempting to preprocess a TypeScript file, but do not have TypeScript configured. Pass the 'typescript' option to enable TypeScript support.

The file: ${filePath}`,
      })
    }

    const bundler = browserify(browserifyOptions)

    if (file.shouldWatch) {
      debug('watching')
      bundler.plugin(watchify, watchifyOptions)
    }

    // yield the bundle if onBundle is specified so the user can modify it
    // as need via `bundle.external()`, `bundle.plugin()`, etc
    const onBundle = options.onBundle

    if (typeof onBundle === 'function') {
      onBundle(bundler)
    }

    // this kicks off the bundling and wraps it up in a promise. the promise
    // is what is ultimately returned from this function
    // it resolves with the outputPath so Cypress knows where to serve
    // the file from
    const bundle = () => {
      return new Promise((resolve, reject) => {
        debug(`making bundle ${outputPath}`)

        const onError = (err) => {
          err.filePath = filePath
          // backup the original stack before its
          // potentially modified from bluebird
          err.originalStack = err.stack
          debug(`errored bundling: ${outputPath}`, err)
          reject(err)
        }

        const ws = fs.createWriteStream(outputPath)

        ws.on('finish', () => {
          debug('finished bundling:', outputPath)
          resolve(outputPath)
        })

        ws.on('error', onError)

        bundler
        .bundle()
        .on('error', onError)
        .pipe(ws)
      })
    }

    // when we're notified of an update via watchify, signal for Cypress to
    // rerun the spec
    bundler.on('update', () => {
      debug('update:', filePath)
      // we overwrite the cached bundle promise, so on subsequent invocations
      // it gets the latest bundle
      const bundlePromise = bundle().finally(() => {
        debug('- update finished for:', filePath)
        file.emit('rerun')
      })

      bundles[filePath] = bundlePromise
      // we suppress unhandled rejections so they don't bubble up to the
      // unhandledRejection handler and crash the app. Cypress will eventually
      // take care of the rejection when the file is requested
      bundlePromise.suppressUnhandledRejections()
    })

    const bundlePromise = fs
    .ensureDir(path.dirname(outputPath))
    .then(bundle)

    // cache the bundle promise, so it can be returned if this function
    // is invoked again with the same filePath
    bundles[filePath] = bundlePromise

    // when the spec or project is closed, we need to clean up the cached
    // bundle promise and stop the watcher via `bundler.close()`
    file.on('close', () => {
      debug('close:', filePath)
      delete bundles[filePath]
      if (file.shouldWatch) {
        bundler.close()
      }
    })

    // return the promise, which will resolve with the outputPath or reject
    // with any error encountered
    return bundlePromise
  }
}

// provide a clone of the default options
preprocessor.defaultOptions = JSON.parse(JSON.stringify(defaultOptions))

preprocessor.errorTypes = errorTypes

if (process.env.__TESTING__) {
  preprocessor.reset = () => {
    for (let filePath in bundles) {
      delete bundles[filePath]
    }
  }
}

module.exports = preprocessor
