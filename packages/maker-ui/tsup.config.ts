import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

const config = buildConfig({
  global: true,
  clean: false,
  minifyIdentifiers: true,
  minifyWhitespace: true,
  minifySyntax: true,
  entry: {
    accordion: 'src/accordion.ts',
    carousel: 'src/carousel.ts',
    hooks: 'src/hooks.ts',
    index: 'src/index.ts',
    layout: 'src/layout.ts',
    modal: 'src/modal.ts',
    notifications: 'src/notifications.ts',
    popovers: 'src/popovers.ts',
    spinners: 'src/spinners.ts',
    tabs: 'src/tabs.ts',
    transition: 'src/transition.ts',
    utils: 'src/utils.ts',
  },
})

export default defineConfig(config)
