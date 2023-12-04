import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

const config = buildConfig({
  minifyIdentifiers: true,
  minifyWhitespace: true,
  minifySyntax: true,
  prefix: 'accordion',
  entry: {
    index: 'src/index.ts',
  },
  banner: {
    js: `'use client'`,
  },
})

export default defineConfig(config)
