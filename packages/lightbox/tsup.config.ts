import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

const config = buildConfig({
  minify: false,
  banner: {
    js: `'use client'`,
  },
})

export default defineConfig(config)
