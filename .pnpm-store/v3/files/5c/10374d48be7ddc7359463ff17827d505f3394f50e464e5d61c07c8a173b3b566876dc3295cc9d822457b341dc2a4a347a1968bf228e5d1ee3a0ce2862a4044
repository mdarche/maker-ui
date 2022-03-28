var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { merge } from '@corex/deepmerge';
import { loadFile } from '../file';
export const loadConfig = (path) => {
    const baseConfig = loadFile(path);
    return withDefaultConfig(baseConfig);
};
export const transformSitemap = (config, url) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return {
        loc: url,
        changefreq: config === null || config === void 0 ? void 0 : config.changefreq,
        priority: config === null || config === void 0 ? void 0 : config.priority,
        lastmod: (config === null || config === void 0 ? void 0 : config.autoLastmod) ? new Date().toISOString() : undefined,
        alternateRefs: (_a = config.alternateRefs) !== null && _a !== void 0 ? _a : [],
    };
});
export const defaultConfig = {
    sourceDir: '.next',
    outDir: 'public',
    priority: 0.7,
    sitemapBaseFileName: 'sitemap',
    changefreq: 'daily',
    sitemapSize: 5000,
    autoLastmod: true,
    trailingSlash: false,
    exclude: [],
    transform: transformSitemap,
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
export const updateConfig = (currConfig, newConfig) => {
    return merge([currConfig, newConfig], {
        arrayMergeType: 'overwrite',
    });
};
export const withDefaultConfig = (config) => {
    return updateConfig(defaultConfig, config);
};
export const getRuntimeConfig = (runtimePaths) => {
    const exportMarkerConfig = loadFile(runtimePaths.EXPORT_MARKER, false);
    return {
        trailingSlash: exportMarkerConfig
            ? exportMarkerConfig.exportTrailingSlash
            : undefined,
    };
};
