import { defineConfig } from 'tsup'
import { buildConfig } from 'build-tools'

const config = buildConfig()

export default defineConfig(config)
