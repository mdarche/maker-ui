/// <reference types="cypress" />
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { UserWebpackDevServerOptions } from './makeWebpackConfig';
export interface StartDevServer extends UserWebpackDevServerOptions {
    options: Cypress.DevServerConfig;
    webpackConfig?: WebpackConfigurationWithDevServer;
    template?: string;
}
export interface WebpackConfigurationWithDevServer extends webpack.Configuration {
    devServer?: WebpackDevServer.Configuration;
}
export declare function start({ webpackConfig: userWebpackConfig, template, options, ...userOptions }: StartDevServer, exitProcess?: (code?: number | undefined) => never): Promise<WebpackDevServer>;
