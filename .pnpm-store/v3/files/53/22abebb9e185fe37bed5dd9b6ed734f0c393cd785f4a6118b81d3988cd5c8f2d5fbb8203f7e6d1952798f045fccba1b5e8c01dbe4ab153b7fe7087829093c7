# Cypress Browserify Preprocessor [![CircleCI](https://circleci.com/gh/cypress-io/cypress-browserify-preprocessor/tree/master.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-browserify-preprocessor/tree/master)

Cypress preprocessor for bundling JavaScript via browserify.

Modifying the default options allows you to add support for things like:

- TypeScript
- Babel Plugins
- ES Presets

## Installation

Requires [Node](https://nodejs.org/en/) version 6.5.0 or above.

```sh
npm install --save-dev @cypress/browserify-preprocessor
```

## Usage

In your project's [plugins file](https://on.cypress.io/plugins-guide):

```javascript
const browserify = require('@cypress/browserify-preprocessor')

module.exports = (on) => {
  on('file:preprocessor', browserify())
}
```

## Options

Pass in options as the second argument to `browserify`:

```javascript
module.exports = (on) => {
  const options = {
    // options here
  }

  on('file:preprocessor', browserify(options))
}
```

### browserifyOptions

Object of options passed to [browserify](https://github.com/browserify/browserify#browserifyfiles--opts).

```javascript
// example
browserify({
  browserifyOptions: {
    extensions: ['.js', '.ts'],
    plugin: [
      ['tsify']
    ]
  }
})
```

If you pass one of the top-level options in (`extensions`, `transform`, etc), it will override the default. In the above example, browserify will process `.js` and `.ts` files, but not `.jsx` or `.coffee`. If you wish to add to or modify existing options, read about [modifying the default options](#modifying-default-options).

[watchify](https://github.com/browserify/watchify) is automatically configured as a plugin (as needed), so it's not necessary to manually specify it.

Source maps are always enabled unless explicitly disabled by specifying `debug: false`.

**Default**:

```javascript
{
  extensions: ['.js', '.jsx', '.coffee'],
  transform: [
    [
      'coffeeify',
      {}
    ],
    [
      'babelify',
      {
        ast: false,
        babelrc: false,
        plugins: [
          '@babel/plugin-transform-modules-commonjs', 
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-transform-runtime',
          ],
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
        ]
      },
    ]
  ],
  debug: true,
  plugin: [],
  cache: {},
  packageCache: {}
}
```

*Note*: `cache` and `packageCache` are always set to `{}` and cannot be overridden. Otherwise, file watching would not function correctly.

### watchifyOptions

Object of options passed to [watchify](https://github.com/browserify/watchify#options)

```javascript
// example
browserify({
  watchifyOptions: {
    delay: 500
  }
})
```

**Default**:

```javascript
{
  ignoreWatch: [
    '**/.git/**',
    '**/.nyc_output/**',
    '**/.sass-cache/**',
    '**/bower_components/**',
    '**/coverage/**',
    '**/node_modules/**'
  ],
}
```

### onBundle

A function that is called with the [browserify instance](https://github.com/browserify/browserify#browserifyfiles--opts). This allows you to specify external files and plugins. See the [browserify docs](https://github.com/browserify/browserify#baddfile-opts) for methods available.

```javascript
// example
browserify({
  onBundle (bundle) {
    bundle.external('react')
    bundle.plugin('some-plugin')
    bundle.ignore('pg-native')
  }
})
```

### typescript

When the path to the TypeScript package is given, Cypress will automatically transpile `.ts` spec, plugin, support files. Note that this **DOES NOT** check types.

```javascript
browserify({
  typescript: require.resolve('typescript')
})
```

**Default**: `undefined`

## Modifying default options

The default options are provided as `browserify.defaultOptions` so they can be more easily modified.

If, for example, you want to update the options for the `babelify` transform to turn on `babelrc` loading, you could do the following:

```javascript
const browserify = require('@cypress/browserify-preprocessor')

module.exports = (on) => {
  const options = browserify.defaultOptions
  options.browserifyOptions.transform[1][1].babelrc = true

  on('file:preprocessor', browserify(options))
}
```

## Debugging

Execute code with `DEBUG=cypress:browserify` environment variable.

## Contributing

Run all tests once:

```shell
npm test
```

Run tests in watch mode:

```shell
npm run test-watch
```

## License

This project is licensed under the terms of the [MIT license](/LICENSE.md).
