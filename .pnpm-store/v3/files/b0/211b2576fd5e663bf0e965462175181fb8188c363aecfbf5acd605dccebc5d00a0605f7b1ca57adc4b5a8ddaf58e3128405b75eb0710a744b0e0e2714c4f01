"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackDevServerFacts = void 0;
const package_json_1 = __importDefault(require("webpack-dev-server/package.json"));
exports.webpackDevServerFacts = {
    version: package_json_1.default.version,
    isV3(version = package_json_1.default.version) {
        return /^3\./.test(version);
    },
    isV4(version = package_json_1.default.version) {
        return /^4\./.test(version);
    },
    unsupported() {
        return Error(`@cypress/webpack-dev-server only supports webpack-dev-server v3 and v4. Found: ${exports.webpackDevServerFacts.version}.`);
    },
};
