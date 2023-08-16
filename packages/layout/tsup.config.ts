import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

export default defineConfig((options) =>
  buildConfig({
    global: true,
    clean: false,
    minify: !options.watch,
    entry: {
      index: 'src/index.ts',
    },
  })
)
