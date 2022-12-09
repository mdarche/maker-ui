import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

const config = buildConfig({
  global: true,
  clean: true,
  minifyIdentifiers: true,
  minifyWhitespace: true,
  minifySyntax: true,
  entry: {
    index: 'src/index.ts',
    client: 'src/components/client/index.ts',
  },
})

export default defineConfig(config)
