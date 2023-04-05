import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1280,
  viewportHeight: 800,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
