"use strict";
/* global Cypress */
/// <reference types="cypress" />
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const path = __importStar(require("path"));
const debug = (0, debug_1.default)('cypress:webpack-dev-server:webpack');
/**
 * @param {ComponentSpec} file spec to create import string from.
 * @param {string} filename name of the spec file - this is the same as file.name
 * @param {string} chunkName webpack chunk name. eg: 'spec-0'
 * @param {string} projectRoot absolute path to the project root. eg: /Users/<username>/my-app
 */
const makeImport = (file, filename, chunkName, projectRoot) => {
    // If we want to rename the chunks, we can use this
    const magicComments = chunkName ? `/* webpackChunkName: "${chunkName}" */` : '';
    return `"${filename}": {
    shouldLoad: () => decodeURI(document.location.pathname).includes("${file.absolute}"),
    load: () => import("${file.absolute}" ${magicComments}),
    chunkName: "${chunkName}",
  }`;
};
/**
 * Creates a object maping a spec file to an object mapping
 * the spec name to the result of `makeImport`.
 *
 * @returns {Record<string, ReturnType<makeImport>}
 * {
 *   "App.spec.js": {
 *     shouldLoad: () => document.location.pathname.includes("cypress/component/App.spec.js"),
 *     load: () => {
 *       return import("/Users/projects/my-app/cypress/component/App.spec.js" \/* webpackChunkName: "spec-0" *\/)
 *     },
 *     chunkName: "spec-0"
 *   }
 * }
 */
function buildSpecs(projectRoot, files = []) {
    if (!Array.isArray(files))
        return `{}`;
    debug(`projectRoot: ${projectRoot}, files: ${files.map((f) => f.absolute).join(',')}`);
    return `{${files.map((f, i) => {
        return makeImport(f, f.name, `spec-${i}`, projectRoot);
    }).join(',')}}`;
}
// Runs the tests inside the iframe
function loader() {
    // In Webpack 5, a spec added after the dev-server is created won't
    // be included in the compilation. Disabling the caching of this loader ensures
    // we regenerate our specs and include any new ones in the compilation.
    this.cacheable(false);
    const { files, projectRoot, supportFile } = this._cypress;
    const supportFileAbsolutePath = supportFile ? JSON.stringify(path.resolve(projectRoot, supportFile)) : undefined;
    return `
  var loadSupportFile = ${supportFile ? `() => import(${supportFileAbsolutePath})` : `() => Promise.resolve()`}
  var allTheSpecs = ${buildSpecs(projectRoot, files)};

  var { init } = require(${JSON.stringify(require.resolve('./aut-runner'))})

  var scriptLoaders = Object.values(allTheSpecs).reduce(
    (accSpecLoaders, specLoader) => {
      if (specLoader.shouldLoad()) {
        accSpecLoaders.push(specLoader.load)
      }
      return accSpecLoaders
  }, [loadSupportFile])

  init(scriptLoaders)
  `;
}
exports.default = loader;
