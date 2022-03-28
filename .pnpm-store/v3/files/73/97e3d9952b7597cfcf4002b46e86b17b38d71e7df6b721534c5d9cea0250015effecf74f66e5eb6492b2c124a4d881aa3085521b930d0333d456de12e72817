"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigFilePath = exports.KNOWN_PATHS = exports.getRuntimePaths = exports.resolveSitemapChunks = exports.getPath = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const path_1 = __importDefault(require("path"));
const minimist_1 = __importDefault(require("minimist"));
const fs_1 = __importDefault(require("fs"));
const getPath = (...pathSegment) => {
    return path_1.default.resolve(process.cwd(), ...pathSegment);
};
exports.getPath = getPath;
const resolveSitemapChunks = (baseSitemapPath, chunks, config) => {
    const folder = path_1.default.dirname(baseSitemapPath);
    return chunks.map((chunk, index) => {
        const filename = `${config.sitemapBaseFileName}${index > 0 ? `-${index}` : ''}.xml`;
        return {
            path: `${folder}/${filename}`,
            fields: chunk,
            filename,
        };
    });
};
exports.resolveSitemapChunks = resolveSitemapChunks;
const getRuntimePaths = (config) => {
    return {
        BUILD_MANIFEST: (0, exports.getPath)(config.sourceDir, 'build-manifest.json'),
        PRERENDER_MANIFEST: (0, exports.getPath)(config.sourceDir, 'prerender-manifest.json'),
        ROUTES_MANIFEST: (0, exports.getPath)(config.sourceDir, 'routes-manifest.json'),
        EXPORT_MARKER: (0, exports.getPath)(config.sourceDir, 'export-marker.json'),
        SITEMAP_FILE: (0, exports.getPath)(config.outDir, `${config.sitemapBaseFileName}.xml`),
        ROBOTS_TXT_FILE: (0, exports.getPath)(config.outDir, 'robots.txt'),
    };
};
exports.getRuntimePaths = getRuntimePaths;
/**
 * @deprecated Use getConfigFilePath instead
 */
exports.KNOWN_PATHS = {
    CONFIG_FILE: (0, exports.getPath)('next-sitemap.js'),
};
const getConfigFilePath = () => {
    const args = (0, minimist_1.default)(process.argv.slice(2));
    const configPath = (0, exports.getPath)(args.config || 'next-sitemap.js');
    if (!fs_1.default.existsSync(configPath)) {
        throw new Error(`${configPath} does not exist.`);
    }
    return configPath;
};
exports.getConfigFilePath = getConfigFilePath;
