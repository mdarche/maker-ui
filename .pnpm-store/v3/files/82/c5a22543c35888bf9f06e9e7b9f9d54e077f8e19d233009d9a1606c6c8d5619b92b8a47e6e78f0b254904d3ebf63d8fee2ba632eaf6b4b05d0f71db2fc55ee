# find-webpack [![semantic-release][semantic-image] ][semantic-url] [![Build status][ci-image] ][ci-url]

> Utility to find webpack settings in react-scripts and other situations

## Use

```shell
npm i -S find-webpack
```

```js
const fw = require('find-webpack')
const config = fw.getWebpackOptions()
// if config is an object, we found it!
```

Works with `react-scripts` and ejected `react-scripts`. Uses `development` environment.

**Note:** `react-scripts` assumes there is `package.json` file in the current working directory, otherwise it won't load.

### tryLoadingWebpackConfig

Loading Webpack config from `webpack.config.js` might need `NODE_ENV` set, and other tricks.

```js
const fw = require('find-webpack')
const config = fw.tryLoadingWebpackConfig('path/to/webpack.config.js')
```

Returns `undefined` if cannot load the config object.

**Note:** when loading the config object, this module sets `process.env.BABEL_ENV` and `process.env.NODE_ENV` to `development` and keeps it.

### Cypress

There is a utility method for cleaning up the found Webpack config for using with Cypress webpack preprocessor: removing optimization plugins, etc.

```js
const fw = require('find-webpack')
const config = fw.getWebpackOptions()
if (config) {
  // config is modified in place
  const opts = {
    reactScripts: true, // cleaning for react-scripts?
    coverage: true, // adds babel-plugin-istanbul
  }
  fw.cleanForCypress(opts, config)
}
```

If you are using `opts.reactScripts = true`, you can also add the component test folder to be transpiled using the same options as `src` folder.

```js
const componentTestFolder = ... // from Cypress config
// config is modified in place
const opts = {
  reactScripts: true, // cleaning for react-scripts?
  addFolderToTranspile: componentTestFolder,
  coverage: true // adds babel-plugin-istanbul
}
fw.cleanForCypress(opts, config)
```

and you can add option `looseModules: true` to insert Babel plugin [@babel/plugin-transform-modules-commonjs](https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs) to allow mocking named imports.

### addFolderToTranspile

This setting could be an individual folder or a list of folders. For example, you might want to transpile component test folder and fixture folder to allow requiring fixture files from tests.

```js
const componentTestFolder = ... // from Cypress config
const fixtureFolder = ... // from Cypress config
// config is modified in place
const opts = {
  reactScripts: true, // cleaning for react-scripts?
  addFolderToTranspile: [componentTestFolder, fixtureFolder],
  coverage: true // adds babel-plugin-istanbul
}
fw.cleanForCypress(opts, config)
```

## Debugging

Run with environment variable `DEBUG=find-webpack` to see verbose logs

## About

### Author

Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)

### License

[MIT](LICENSE) - do anything with the code, but don't blame me if it does not work.

[ci-image]: https://github.com/bahmutov/find-webpack/workflows/ci/badge.svg?branch=master
[ci-url]: https://github.com/bahmutov/find-webpack/actions
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
