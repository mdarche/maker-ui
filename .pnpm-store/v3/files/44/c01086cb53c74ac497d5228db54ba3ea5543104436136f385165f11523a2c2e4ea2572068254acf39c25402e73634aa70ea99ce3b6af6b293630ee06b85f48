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
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineDevServerConfig = exports.devServer = exports.startDevServer = void 0;
const debug_1 = require("debug");
const startServer_1 = require("./startServer");
const webpackDevServerFacts_1 = require("./webpackDevServerFacts");
const debug = (0, debug_1.debug)('cypress:webpack-dev-server:webpack');
function startDevServer(startDevServerArgs, exitProcess = process.exit) {
    return __awaiter(this, void 0, void 0, function* () {
        const webpackDevServer = yield (0, startServer_1.start)(startDevServerArgs, exitProcess);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (webpackDevServerFacts_1.webpackDevServerFacts.isV3()) {
                // @ts-ignore
                const server = webpackDevServer.listen(0, '127.0.0.1', () => {
                    // FIXME: handle address returning a string
                    const port = server.address().port;
                    debug('Component testing webpack server started on port', port);
                    resolve({
                        port,
                        close: (done) => {
                            server.close();
                            done === null || done === void 0 ? void 0 : done();
                        },
                    });
                });
                return;
            }
            if (webpackDevServerFacts_1.webpackDevServerFacts.isV4()) {
                yield webpackDevServer.start();
                resolve({
                    // @ts-expect-error @types do not yet support v4
                    port: webpackDevServer.options.port,
                    close: (done) => {
                        webpackDevServer.stop();
                        done === null || done === void 0 ? void 0 : done();
                    },
                });
                return;
            }
            reject(webpackDevServerFacts_1.webpackDevServerFacts.unsupported());
        }));
    });
}
exports.startDevServer = startDevServer;
function devServer(cypressDevServerConfig, devServerConfig) {
    return startDevServer({
        options: cypressDevServerConfig,
        webpackConfig: devServerConfig === null || devServerConfig === void 0 ? void 0 : devServerConfig.webpackConfig,
        template: devServerConfig === null || devServerConfig === void 0 ? void 0 : devServerConfig.template,
    });
}
exports.devServer = devServer;
function defineDevServerConfig(devServerConfig) {
    return devServerConfig;
}
exports.defineDevServerConfig = defineDevServerConfig;
