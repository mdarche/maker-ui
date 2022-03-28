"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeWebpackConfig = void 0;
const debug_1 = require("debug");
const path = __importStar(require("path"));
const webpack_merge_1 = require("webpack-merge");
const webpack_config_1 = __importDefault(require("./webpack.config"));
const plugin_1 = __importDefault(require("./plugin"));
const debug = (0, debug_1.debug)('cypress:webpack-dev-server:makeWebpackConfig');
const removeList = ['HtmlWebpackPlugin', 'PreloadPlugin', 'HtmlPwaPlugin'];
const OsSeparatorRE = RegExp(`\\${path.sep}`, 'g');
const posixSeparator = '/';
function makeWebpackConfig(userWebpackConfig, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { projectRoot, devServerPublicPathRoute, files, supportFile, devServerEvents, template } = options;
        debug(`User passed in webpack config with values %o`, userWebpackConfig);
        debug(`New webpack entries %o`, files);
        debug(`Project root`, projectRoot);
        debug(`Support file`, supportFile);
        const entry = path.resolve(__dirname, './browser.js');
        const publicPath = (path.sep === posixSeparator)
            ? path.join(devServerPublicPathRoute, posixSeparator)
            // The second line here replaces backslashes on windows with posix compatible slash
            // See https://github.com/cypress-io/cypress/issues/16097
            : path.join(devServerPublicPathRoute, posixSeparator)
                .replace(OsSeparatorRE, posixSeparator);
        const dynamicWebpackConfig = {
            output: {
                publicPath,
            },
            plugins: [
                new plugin_1.default({
                    files,
                    projectRoot,
                    devServerEvents,
                    supportFile,
                }),
            ],
        };
        // certain plugins conflict with HtmlWebpackPlugin and cause
        // problems for some setups.
        // most of these are application optimizations that are not relevant in a
        // testing environment.
        // remove those plugins to ensure a smooth configuration experience.
        // we provide a webpack-html-plugin config pinned to a specific version (4.x)
        // that we have tested and are confident works with all common configurations.
        // https://github.com/cypress-io/cypress/issues/15865
        if (userWebpackConfig === null || userWebpackConfig === void 0 ? void 0 : userWebpackConfig.plugins) {
            userWebpackConfig.plugins = userWebpackConfig.plugins.filter((plugin) => {
                if (removeList.includes(plugin.constructor.name)) {
                    /* eslint-disable no-console */
                    console.warn(`[@cypress/webpack-dev-server]: removing ${plugin.constructor.name} from configuration.`);
                    return false;
                }
                return true;
            });
        }
        if (typeof ((_a = userWebpackConfig === null || userWebpackConfig === void 0 ? void 0 : userWebpackConfig.module) === null || _a === void 0 ? void 0 : _a.unsafeCache) === 'function') {
            const originalCachePredicate = userWebpackConfig.module.unsafeCache;
            userWebpackConfig.module.unsafeCache = (module) => {
                return originalCachePredicate(module) && !/[\\/]webpack-dev-server[\\/]dist[\\/]browser\.js/.test(module.resource);
            };
        }
        const mergedConfig = (0, webpack_merge_1.merge)(userWebpackConfig, (0, webpack_config_1.default)(template), dynamicWebpackConfig);
        mergedConfig.entry = entry;
        debug('Merged webpack config %o', mergedConfig);
        if (process.env.WEBPACK_PERF_MEASURE) {
            // only for debugging
            const { measureWebpackPerformance } = require('./measureWebpackPerformance');
            return measureWebpackPerformance(mergedConfig);
        }
        return mergedConfig;
    });
}
exports.makeWebpackConfig = makeWebpackConfig;
