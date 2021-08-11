/// <reference types="cypress" />
const findReactScriptsWebpackConfig = require('@cypress/react/plugins/react-scripts/findReactScriptsWebpackConfig')
const { startDevServer } = require('@cypress/webpack-dev-server')

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  const webpackConfig = findReactScriptsWebpackConfig(config)

  const rules = webpackConfig.module.rules.find((rule: any) => !!rule.oneOf)
    .oneOf
  const babelRule = rules.find((rule: any) => /babel-loader/.test(rule.loader))
  babelRule.options.plugins.push(require.resolve('babel-plugin-istanbul'))

  //@ts-ignore
  on('dev-server:start', options => {
    return startDevServer({ options, webpackConfig })
  })

  return config
}
