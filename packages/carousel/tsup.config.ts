import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  external: ['react'],
  dts: true,
  clean: true,
  injectStyle: true,
})
