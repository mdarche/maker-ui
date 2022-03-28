import * as webpack from 'webpack';
import { CypressCTOptionsPluginOptionsWithEmitter } from './plugin';
export interface UserWebpackDevServerOptions {
    /**
     * if `true` will compile all the specs together when the first one is request and can slow up initial build time.
     * @default false
    */
    disableLazyCompilation?: boolean;
}
interface MakeWebpackConfigOptions extends CypressCTOptionsPluginOptionsWithEmitter, UserWebpackDevServerOptions {
    devServerPublicPathRoute: string;
    isOpenMode: boolean;
    template?: string;
}
export declare function makeWebpackConfig(userWebpackConfig: webpack.Configuration, options: MakeWebpackConfigOptions): Promise<webpack.Configuration>;
export {};
