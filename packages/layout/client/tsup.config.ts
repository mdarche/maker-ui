import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

const config = buildConfig({
  global: true,
  clean: false,
  minifyIdentifiers: true,
  minifyWhitespace: true,
  minifySyntax: true,
  entry: {
    index: 'src/index.ts',
  },
  banner: {
    js: `'use client'`,
  },
})

export default defineConfig(config)
