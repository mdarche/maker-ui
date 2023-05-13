import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

const config = buildConfig({
  minifyIdentifiers: false,
  minifyWhitespace: false,
  minifySyntax: false,
  entry: {
    index: 'src/index.ts',
  },
  banner: {
    js: `'use client'`,
  },
})

export default defineConfig(config)
