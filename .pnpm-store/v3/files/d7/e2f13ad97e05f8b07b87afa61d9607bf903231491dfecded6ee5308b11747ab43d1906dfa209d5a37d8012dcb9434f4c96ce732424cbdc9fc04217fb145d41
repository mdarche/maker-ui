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
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const config_1 = require("./config");
const manifest_1 = require("./manifest");
const url_1 = require("./url");
const generateSitemap_1 = require("./sitemap/generateSitemap");
const array_1 = require("./array");
const path_1 = require("./path");
const robots_txt_1 = require("./robots-txt");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Get config file path
    const configFilePath = (0, path_1.getConfigFilePath)();
    // Load next-sitemap.js
    let config = (0, config_1.loadConfig)(configFilePath);
    // Get runtime paths
    const runtimePaths = (0, path_1.getRuntimePaths)(config);
    // get runtime config
    const runtimeConfig = (0, config_1.getRuntimeConfig)(runtimePaths);
    // Update config with runtime config
    config = (0, config_1.updateConfig)(config, runtimeConfig);
    // Load next.js manifest files
    const manifest = (0, manifest_1.loadManifest)(runtimePaths);
    // Create url-set based on config and manifest
    const urlSet = yield (0, url_1.createUrlSet)(config, manifest);
    // Split sitemap into multiple files
    const chunks = (0, array_1.toChunks)(urlSet, config.sitemapSize);
    const sitemapChunks = (0, path_1.resolveSitemapChunks)(runtimePaths.SITEMAP_FILE, chunks, config);
    // All sitemaps array to keep track of generated sitemap files.
    // Later to be added on robots.txt
    const allSitemaps = [];
    // Generate sitemaps from chunks
    sitemapChunks.forEach((chunk) => {
        (0, generateSitemap_1.generateSitemap)(chunk);
        allSitemaps.push((0, url_1.generateUrl)(config.siteUrl, `/${chunk.filename}`));
    });
    // Generate robots.txt
    if (config.generateRobotsTxt) {
        (0, robots_txt_1.exportRobotsTxt)(runtimePaths, config, allSitemaps);
    }
}))();
