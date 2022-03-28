/// <reference types="cypress" />
import { StartDevServer, WebpackConfigurationWithDevServer } from './startServer';
declare type DoneCallback = () => unknown;
export interface ResolvedDevServerConfig {
    port: number;
    close: (done?: DoneCallback) => void;
}
export { StartDevServer };
export declare function startDevServer(startDevServerArgs: StartDevServer, exitProcess?: (code?: number | undefined) => never): Promise<ResolvedDevServerConfig>;
export interface CypressWebpackDevServerConfig {
    webpackConfig?: WebpackConfigurationWithDevServer;
    template?: string;
}
export declare function devServer(cypressDevServerConfig: Cypress.DevServerConfig, devServerConfig?: CypressWebpackDevServerConfig): Promise<ResolvedDevServerConfig>;
export declare function defineDevServerConfig(devServerConfig: CypressWebpackDevServerConfig): CypressWebpackDevServerConfig;
