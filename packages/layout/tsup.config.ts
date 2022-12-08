import { defineConfig } from 'tsup'
import { buildConfig } from '@maker-ui/build-tools'

const config = buildConfig({
  global: true,
  clean: true,
  minifyIdentifiers: true,
  minifyWhitespace: false,
  minifySyntax: true,
  entry: {
    Layout: 'src/components/Layout.tsx',
    ColorButton: 'src/components/ColorButton.tsx',
    MenuButton: 'src/components/MenuButton.tsx',
    NavMenu: 'src/components/Header/NavMenu.tsx',
    CollapseMenu: 'src/components/Menu/CollapseMenu.tsx',
    provider: 'src/components/Provider.tsx',
  },
})

export default defineConfig(config)
