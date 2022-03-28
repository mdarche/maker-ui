"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSWC = void 0;
function checkSWC(webpackConfig, cypressConfig) {
    var _a;
    var hasSWCLoader = (_a = webpackConfig.module) === null || _a === void 0 ? void 0 : _a.rules.some(function (rule) {
        var _a;
        return (_a = rule.oneOf) === null || _a === void 0 ? void 0 : _a.some(function (oneOf) { var _a; return ((_a = oneOf.use) === null || _a === void 0 ? void 0 : _a.loader) === 'next-swc-loader'; });
    });
    // "resolvedNodePath" is only set when using the user's Node.js, which is required to compile Next.js with SWC optimizations
    // If it is not set, they have either explicitly set "nodeVersion" to "bundled" or are are using Cypress < 9.0.0 where it was set to "bundled" by default
    if (hasSWCLoader && !cypressConfig.resolvedNodePath) {
        throw new Error("Cannot compile Next.js application with configured Node.js.\nIf you are on Cypress version >= `9.0.0`, remove the \"nodeVersion\" property from your Cypress config. Otherwise, please add \"nodeVersion\": \"system\" to your Cypress config and try again.");
    }
    return false;
}
exports.checkSWC = checkSWC;
