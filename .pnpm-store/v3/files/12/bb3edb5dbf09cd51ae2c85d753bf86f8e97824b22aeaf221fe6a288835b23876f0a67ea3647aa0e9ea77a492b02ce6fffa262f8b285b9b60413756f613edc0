const through = require('through2')
const path = require('path')

const isJson = (code) => {
  try {
    JSON.parse(code)
  } catch (e) {
    return false
  }

  return true
}

// tsify doesn't have transpile-only option like ts-node or ts-loader.
// It means it should check types whenever spec file is changed
// and it slows down the test speed a lot.
// We skip this slow type-checking process by using transpileModule() api.
module.exports = function (fileName, opts) {
  const ts = opts.typescript
  const chunks = []
  const ext = path.extname(fileName)

  return through(
    (buf, enc, next) => {
      chunks.push(buf.toString())
      next()
    },
    function (next) {
      const text = chunks.join('')

      if (isJson(text)) {
        this.push(text)
      } else {
        this.push(
          ts.transpileModule(text, {
            // explicitly name the file here
            // for sourcemaps
            fileName,
            compilerOptions: {
              esModuleInterop: true,
              // inline the source maps into the file
              // https://github.com/cypress-io/cypress-browserify-preprocessor/issues/48
              inlineSourceMap: true,
              inlineSources: true,
              jsx:
                ext === '.tsx' || ext === '.jsx' || ext === '.js'
                  ? 'react'
                  : undefined,
              downlevelIteration: true,
            },
          }).outputText,
        )
      }

      next()
    },
  )
}
