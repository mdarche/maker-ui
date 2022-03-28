# mocked-env

> Easy way to mock process.env during BDD testing

[![NPM][npm-icon]][npm-url]

[![Build status][ci-image]][ci-url]
[![semantic-release][semantic-image]][semantic-url]
[![standard][standard-image]][standard-url]
[![renovate-app badge][renovate-badge]][renovate-app]

Read [Mocking process.env](https://glebbahmutov.com/blog/mocking-process-env/) blog post.

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save-dev mocked-env
```

## Use

### Change values

```js
const mockedEnv = require('mocked-env')
// before the test
let restore = mockedEnv({
  FOO: 'fake foo value',
  BAR: '42',
})
// use process.env.FOO and process.env.BAR during testing
// process.env.FOO = "fake foo value"
// process.env.BAR = "42"
// after the test
restore()
// any previous values of FOO and BAR restored
```

### Delete values

If you want to temporarily delete environment variable, pass `undefined` value

```js
let restore = mockedEnv({
  FOO: 'fake foo value',
  PWD: undefined, // will be deleted from process.env
})
```

### Clear entire object

If you want to remove all existing properties and just set some, use option `clear: true`

```js
let restore = mockedEnv(
  {
    FOO: 'foo',
    BAR: 'bar',
  },
  { clear: true }
)
// process.env = {FOO: 'foo', BAR: 'bar'}
```

Again, calling `restore()` will restore the original full `process.env` object.

### Restore environment without clearing

If you want to maintain the current environment and restore it to the original state after restore() is called, pass the 'restore' option.

```js
let restore = mockedEnv(
  {
    FOO: 'foo',
    BAR: 'bar',
  },
  { restore: true }
)
// process.env = {...process.env, FOO: 'foo', BAR: 'bar'}
```

These options are mutually exclusive and specifying them both will result in an error.

### Options as first argument

The options array can be passed as the first argument to the `mockedEnv` function as long as it contains either a 'restore' or 'clear' key, not both.

```js
let restore = mockedEnv(
  { clear: true }
)
// process.env = {}
```


**⚠️ Note:** `process.env` values should always be strings ([Stackoverflow][1]), any call to `mockedEnv` that attempts to use values other than strings (or `undefined` to signify that a property should be deleted) will raise an error.

## Example

```js
const mockedEnv = require('mocked-env')
describe('changes variables', () => {
  let restore // to restore old values

  beforeEach(() => {
    restore = mockedEnv({
      PWD: '/foo/bar',
      USER: undefined, // will be deleted from process.env
    })
  })

  it('has changed process.env', () => {
    // process.env.PWD = '/foo/bar'
  })

  afterEach(() => restore())
})
```

See [src/example-spec.js](src/example-spec.js)

You can also nest `process.env` reset and setting individual values in inner suites, see [src/nested-spec.js](src/nested-spec.js). Great for tests that need to control `process.env` and would like to reset the entire thing, but then mock individual properties.

## Debugging

Run with `DEBUG=mocked-env` environment variable.

## More information

This package was inspired by [burl/mock-env](https://github.com/burl/mock-env)

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2018

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/mocked-env/issues) on Github

## MIT License

Copyright (c) 2018 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/mocked-env.svg?downloads=true
[npm-url]: https://npmjs.org/package/mocked-env
[ci-image]: https://travis-ci.org/bahmutov/mocked-env.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/mocked-env
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
[1]: https://stackoverflow.com/questions/10265208/node-js-process-env-assigning-process-env-property-to-undefined-results-in-stri/10265271#10265271
