import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

const config = buildConfig({
  minify: true,
  entry: {
    index: 'src/index.ts',
  },
})

export default defineConfig(config)
