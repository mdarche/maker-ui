import { defineConfig } from 'tsup'
import { buildConfig } from 'build-tools'

const config = buildConfig({ global: true })

export default defineConfig(config)
