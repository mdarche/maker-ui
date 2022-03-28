"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeError = void 0;
const webpack_1 = __importDefault(require("webpack"));
const lodash_1 = __importDefault(require("lodash"));
const semver_1 = __importDefault(require("semver"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const normalizeError = (error) => {
    return typeof error === 'string' ? error : error.message;
};
exports.normalizeError = normalizeError;
class CypressCTOptionsPlugin {
    constructor(options) {
        this.files = [];
        this.errorEmitted = false;
        this.pluginFunc = (context) => {
            context._cypress = {
                files: this.files,
                projectRoot: this.projectRoot,
                supportFile: this.supportFile,
            };
        };
        this.setupCustomHMR = (compiler) => {
            compiler.hooks.afterCompile.tap('CypressCTOptionsPlugin', (compilation) => {
                const stats = compilation.getStats();
                if (stats.hasErrors()) {
                    this.errorEmitted = true;
                    // webpack 4: string[]
                    // webpack 5: Error[]
                    const errors = stats.toJson().errors;
                    if (!errors || !errors.length) {
                        return;
                    }
                    this.devServerEvents.emit('dev-server:compile:error', (0, exports.normalizeError)(errors[0]));
                }
                else if (this.errorEmitted) {
                    // compilation succeed but assets haven't emitted to the output yet
                    this.devServerEvents.emit('dev-server:compile:error', null);
                }
            });
            compiler.hooks.afterEmit.tap('CypressCTOptionsPlugin', (compilation) => {
                if (!compilation.getStats().hasErrors()) {
                    this.devServerEvents.emit('dev-server:compile:success');
                }
            });
        };
        /**
         *
         * @param compilation webpack 4 `compilation.Compilation`, webpack 5
         *   `Compilation`
         */
        this.plugin = (compilation) => {
            this.devServerEvents.on('dev-server:specs:changed', (specs) => {
                if (lodash_1.default.isEqual(specs, this.files))
                    return;
                this.files = specs;
                const inputFileSystem = compilation.inputFileSystem;
                const utimesSync = semver_1.default.gt('4.0.0', webpack_1.default.version) ? inputFileSystem.fileSystem.utimesSync : fs_1.default.utimesSync;
                utimesSync(path_1.default.resolve(__dirname, 'browser.js'), new Date(), new Date());
            });
            // Webpack 5
            /* istanbul ignore next */
            if ('NormalModule' in webpack_1.default) {
                webpack_1.default.NormalModule.getCompilationHooks(compilation).loader.tap('CypressCTOptionsPlugin', (context) => this.pluginFunc(context));
                return;
            }
            // Webpack 4
            compilation.hooks.normalModuleLoader.tap('CypressCTOptionsPlugin', (context) => this.pluginFunc(context));
        };
        this.files = options.files;
        this.supportFile = options.supportFile;
        this.projectRoot = options.projectRoot;
        this.devServerEvents = options.devServerEvents;
    }
    apply(compiler) {
        this.setupCustomHMR(compiler);
        compiler.hooks.compilation.tap('CypressCTOptionsPlugin', (compilation) => this.plugin(compilation));
    }
}
exports.default = CypressCTOptionsPlugin;
