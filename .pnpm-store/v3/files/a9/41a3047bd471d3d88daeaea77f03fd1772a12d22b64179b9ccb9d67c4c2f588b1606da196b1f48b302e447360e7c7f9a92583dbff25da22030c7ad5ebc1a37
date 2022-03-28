/// <reference types="cypress" />
/// <reference types="node" />
import { Compiler } from 'webpack';
import { EventEmitter } from 'events';
import { PathLike } from 'fs';
import type { Compilation } from 'webpack';
declare type UtimesSync = (path: PathLike, atime: string | number | Date, mtime: string | number | Date) => void;
export interface CypressCTOptionsPluginOptions {
    files: Cypress.Cypress['spec'][];
    projectRoot: string;
    supportFile: string;
    devServerEvents?: EventEmitter;
}
export declare type CypressCTOptionsPluginOptionsWithEmitter = CypressCTOptionsPluginOptions & {
    devServerEvents: EventEmitter;
};
export interface CypressCTWebpackContext {
    _cypress: CypressCTOptionsPluginOptions;
}
export declare type Webpack45Compilation = Compilation & {
    inputFileSystem: {
        fileSystem: {
            utimesSync: UtimesSync;
        };
    };
};
export declare const normalizeError: (error: Error | string) => string;
export default class CypressCTOptionsPlugin {
    private files;
    private supportFile;
    private errorEmitted;
    private readonly projectRoot;
    private readonly devServerEvents;
    constructor(options: CypressCTOptionsPluginOptionsWithEmitter);
    private pluginFunc;
    private setupCustomHMR;
    /**
     *
     * @param compilation webpack 4 `compilation.Compilation`, webpack 5
     *   `Compilation`
     */
    private plugin;
    apply(compiler: Compiler): void;
}
export {};
