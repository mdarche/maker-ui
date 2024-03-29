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
    data: 'src/data.ts',
    forms: 'src/forms.ts',
    hooks: 'src/hooks.ts',
    index: 'src/index.ts',
    layout: 'src/layout.ts',
    scroll: 'src/scroll.ts',
    lightbox: 'src/lightbox.ts',
    modal: 'src/modal.ts',
    notifications: 'src/notifications.ts',
    popovers: 'src/popovers.ts',
    social: 'src/social.ts',
    spinners: 'src/spinners.ts',
    tabs: 'src/tabs.ts',
    transition: 'src/transition.ts',
    utils: 'src/utils.ts',
  },
})

export default defineConfig(config)
