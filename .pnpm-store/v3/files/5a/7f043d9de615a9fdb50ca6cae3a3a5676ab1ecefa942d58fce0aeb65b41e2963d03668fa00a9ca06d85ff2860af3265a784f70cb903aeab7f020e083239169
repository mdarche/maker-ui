var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { loadConfig, getRuntimeConfig, updateConfig } from './config';
import { loadManifest } from './manifest';
import { createUrlSet, generateUrl } from './url';
import { generateSitemap } from './sitemap/generateSitemap';
import { toChunks } from './array';
import { resolveSitemapChunks, getRuntimePaths, getConfigFilePath, } from './path';
import { exportRobotsTxt } from './robots-txt';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Get config file path
    const configFilePath = getConfigFilePath();
    // Load next-sitemap.js
    let config = loadConfig(configFilePath);
    // Get runtime paths
    const runtimePaths = getRuntimePaths(config);
    // get runtime config
    const runtimeConfig = getRuntimeConfig(runtimePaths);
    // Update config with runtime config
    config = updateConfig(config, runtimeConfig);
    // Load next.js manifest files
    const manifest = loadManifest(runtimePaths);
    // Create url-set based on config and manifest
    const urlSet = yield createUrlSet(config, manifest);
    // Split sitemap into multiple files
    const chunks = toChunks(urlSet, config.sitemapSize);
    const sitemapChunks = resolveSitemapChunks(runtimePaths.SITEMAP_FILE, chunks, config);
    // All sitemaps array to keep track of generated sitemap files.
    // Later to be added on robots.txt
    const allSitemaps = [];
    // Generate sitemaps from chunks
    sitemapChunks.forEach((chunk) => {
        generateSitemap(chunk);
        allSitemaps.push(generateUrl(config.siteUrl, `/${chunk.filename}`));
    });
    // Generate robots.txt
    if (config.generateRobotsTxt) {
        exportRobotsTxt(runtimePaths, config, allSitemaps);
    }
}))();
