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
exports.getRuntimeConfig = exports.withDefaultConfig = exports.updateConfig = exports.defaultConfig = exports.transformSitemap = exports.loadConfig = void 0;
const deepmerge_1 = require("@corex/deepmerge");
const file_1 = require("../file");
const loadConfig = (path) => {
    const baseConfig = (0, file_1.loadFile)(path);
    return (0, exports.withDefaultConfig)(baseConfig);
};
exports.loadConfig = loadConfig;
const transformSitemap = (config, url) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return {
        loc: url,
        changefreq: config === null || config === void 0 ? void 0 : config.changefreq,
        priority: config === null || config === void 0 ? void 0 : config.priority,
        lastmod: (config === null || config === void 0 ? void 0 : config.autoLastmod) ? new Date().toISOString() : undefined,
        alternateRefs: (_a = config.alternateRefs) !== null && _a !== void 0 ? _a : [],
    };
});
exports.transformSitemap = transformSitemap;
exports.defaultConfig = {
    sourceDir: '.next',
    outDir: 'public',
    priority: 0.7,
    sitemapBaseFileName: 'sitemap',
    changefreq: 'daily',
    sitemapSize: 5000,
    autoLastmod: true,
    trailingSlash: false,
    exclude: [],
    transform: exports.transformSitemap,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [],
    },
};
const updateConfig = (currConfig, newConfig) => {
    return (0, deepmerge_1.merge)([currConfig, newConfig], {
        arrayMergeType: 'overwrite',
    });
};
exports.updateConfig = updateConfig;
const withDefaultConfig = (config) => {
    return (0, exports.updateConfig)(exports.defaultConfig, config);
};
exports.withDefaultConfig = withDefaultConfig;
const getRuntimeConfig = (runtimePaths) => {
    const exportMarkerConfig = (0, file_1.loadFile)(runtimePaths.EXPORT_MARKER, false);
    return {
        trailingSlash: exportMarkerConfig
            ? exportMarkerConfig.exportTrailingSlash
            : undefined,
    };
};
exports.getRuntimeConfig = getRuntimeConfig;
