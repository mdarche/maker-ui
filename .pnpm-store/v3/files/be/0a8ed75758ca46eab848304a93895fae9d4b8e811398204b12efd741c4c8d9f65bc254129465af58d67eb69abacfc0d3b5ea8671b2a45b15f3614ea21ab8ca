"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReactScripts5 = exports.reactScriptsFiveModifications = void 0;
var debug_1 = __importDefault(require("debug"));
var package_json_1 = __importDefault(require("react-scripts/package.json"));
var debug = (0, debug_1.default)('@cypress/react:react-scripts');
function reactScriptsFiveModifications(webpackConfig) {
    var _a, _b, _c;
    // React-Scripts sets the webpack target to ["browserslist"] which tells
    // webpack to target the browsers found within the browserslist config
    // depending on the environment (process.env.NODE_ENV). Since we set
    // process.env.NODE_ENV = "test", webpack is unable to find any browsers and errors.
    // We set BROWSERSLIST_ENV = "development" to override the default NODE_ENV search of browsers.
    if (!process.env.BROWSERSLIST_ENV) {
        process.env.BROWSERSLIST_ENV = 'development';
    }
    // We use the "development" configuration of the react-scripts webpack config.
    // There is a conflict when settings process.env.NODE_ENV = "test" since DefinePlugin
    // uses the "development" configuration and expects process.env.NODE_ENV = "development".
    var definePlugin = (_a = webpackConfig.plugins) === null || _a === void 0 ? void 0 : _a.find(function (plugin) { return plugin.constructor.name === 'DefinePlugin'; });
    if (definePlugin) {
        var processEnv = definePlugin.definitions['process.env'];
        processEnv.NODE_ENV = JSON.stringify('development');
        debug('Found "DefinePlugin", modified "process.env" definition %o', processEnv);
    }
    // React-Scripts v5 no longers uses a loader to configure eslint, so we add globals
    // to the plugin.
    var eslintPlugin = (_b = webpackConfig.plugins) === null || _b === void 0 ? void 0 : _b.find(function (plugin) { return plugin.constructor.name === 'ESLintWebpackPlugin'; });
    if (eslintPlugin) {
        var cypressGlobals = ['cy', 'Cypress', 'before', 'after', 'context']
            .reduce(function (acc, global) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[global] = 'writable', _a)));
        }, {});
        eslintPlugin.options.baseConfig = __assign(__assign({}, eslintPlugin.options.baseConfig), { globals: __assign(__assign({}, (_c = eslintPlugin.options.baseConfig) === null || _c === void 0 ? void 0 : _c.globals), cypressGlobals) });
        debug('Found ESLintWebpackPlugin, modified eslint config %o', eslintPlugin.options.baseConfig);
    }
}
exports.reactScriptsFiveModifications = reactScriptsFiveModifications;
exports.isReactScripts5 = Number(package_json_1.default.version[0]) >= 5;
