"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const debug_1 = __importDefault(require("debug"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const makeWebpackConfig_1 = require("./makeWebpackConfig");
const webpackDevServerFacts_1 = require("./webpackDevServerFacts");
const debug = (0, debug_1.default)('cypress:webpack-dev-server:start');
function start(_a, exitProcess = process.exit) {
    var { webpackConfig: userWebpackConfig, template, options } = _a, userOptions = __rest(_a, ["webpackConfig", "template", "options"]);
    return __awaiter(this, void 0, void 0, function* () {
        if (!userWebpackConfig) {
            debug('User did not pass in any webpack configuration');
        }
        const { projectRoot, devServerPublicPathRoute, isTextTerminal } = options.config;
        const webpackConfig = yield (0, makeWebpackConfig_1.makeWebpackConfig)(userWebpackConfig || {}, Object.assign({ files: options.specs, template,
            projectRoot,
            devServerPublicPathRoute, devServerEvents: options.devServerEvents, supportFile: options.config.supportFile, isOpenMode: !isTextTerminal }, userOptions));
        debug('compiling webpack');
        const compiler = (0, webpack_1.default)(webpackConfig);
        // When compiling in run mode
        // Stop the clock early, no need to run all the tests on a failed build
        if (isTextTerminal) {
            compiler.hooks.done.tap('cyCustomErrorBuild', function (stats) {
                if (stats.hasErrors()) {
                    exitProcess(1);
                }
            });
        }
        debug('starting webpack dev server');
        let webpackDevServerConfig = Object.assign(Object.assign({}, ((userWebpackConfig === null || userWebpackConfig === void 0 ? void 0 : userWebpackConfig.devServer) || {})), { hot: false });
        if (webpackDevServerFacts_1.webpackDevServerFacts.isV3()) {
            debug('using webpack-dev-server v3');
            webpackDevServerConfig = Object.assign(Object.assign({}, webpackDevServerConfig), { 
                // @ts-ignore ignore webpack-dev-server v3 type errors
                inline: false, publicPath: devServerPublicPathRoute, noInfo: false });
            // @ts-ignore ignore webpack-dev-server v3 type errors
            return new webpack_dev_server_1.default(compiler, webpackDevServerConfig);
        }
        if (webpackDevServerFacts_1.webpackDevServerFacts.isV4()) {
            debug('using webpack-dev-server v4');
            webpackDevServerConfig = Object.assign(Object.assign({ host: 'localhost', port: 'auto' }, userWebpackConfig === null || userWebpackConfig === void 0 ? void 0 : userWebpackConfig.devServer), { devMiddleware: {
                    publicPath: devServerPublicPathRoute,
                }, hot: false });
            // @ts-ignore Webpack types are clashing between Webpack and WebpackDevServer
            return new webpack_dev_server_1.default(webpackDevServerConfig, compiler);
        }
        throw webpackDevServerFacts_1.webpackDevServerFacts.unsupported();
    });
}
exports.start = start;
