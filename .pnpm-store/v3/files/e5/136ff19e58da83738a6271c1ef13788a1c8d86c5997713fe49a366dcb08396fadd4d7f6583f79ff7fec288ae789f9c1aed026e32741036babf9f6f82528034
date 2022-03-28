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
exports.createUrlSet = exports.absoluteUrl = exports.entityEscapedUrl = void 0;
const util_1 = require("../util");
const array_1 = require("../../array");
const config_1 = require("../../config");
/**
 * Return UTF-8 encoded urls
 * @param path
 * @returns
 * @link https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap#general-guidelines
 */
const entityEscapedUrl = (path) => path
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;');
exports.entityEscapedUrl = entityEscapedUrl;
const absoluteUrl = (siteUrl, path, trailingSlash) => {
    const url = (0, util_1.generateUrl)(siteUrl, trailingSlash ? `${path}/` : path);
    if (!trailingSlash && url.endsWith('/')) {
        return url.slice(0, url.length - 1);
    }
    return (0, exports.entityEscapedUrl)(url);
};
exports.absoluteUrl = absoluteUrl;
/**
 * Create a unique url set
 * @param config
 * @param manifest
 */
const createUrlSet = (config, manifest) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const i18n = (_a = manifest.routes) === null || _a === void 0 ? void 0 : _a.i18n;
    const allKeys = [
        ...Object.keys(manifest.build.pages),
        ...(manifest.preRender ? Object.keys(manifest.preRender.routes) : []),
    ];
    // Filter out next.js internal urls and generate urls based on sitemap
    let urlSet = allKeys.filter((x) => !(0, util_1.isNextInternalUrl)(x));
    // Remove default locale if i18n is enabled
    if (i18n) {
        const { defaultLocale } = i18n;
        const replaceDefaultLocale = (0, util_1.createDefaultLocaleReplace)(defaultLocale);
        urlSet = urlSet.map(replaceDefaultLocale);
    }
    // Remove the urls based on config.exclude array
    if (config.exclude && config.exclude.length > 0) {
        urlSet = (0, array_1.removeIfMatchPattern)(urlSet, config.exclude);
    }
    urlSet = [...new Set(urlSet)];
    // Create sitemap fields based on transformation
    const sitemapFields = []; // transform using relative urls
    // Create a map of fields by loc to quickly find collisions
    const mapFieldsByLoc = {};
    for (const url of urlSet) {
        const sitemapField = yield config.transform(config, url);
        if (!(sitemapField === null || sitemapField === void 0 ? void 0 : sitemapField.loc))
            continue;
        sitemapFields.push(sitemapField);
        // Add link on field to map by loc
        if (config.additionalPaths) {
            mapFieldsByLoc[sitemapField.loc] = sitemapField;
        }
    }
    if (config.additionalPaths) {
        const additions = (_c = (yield config.additionalPaths(Object.assign(Object.assign({}, config), { transform: (_b = config.transform) !== null && _b !== void 0 ? _b : config_1.transformSitemap })))) !== null && _c !== void 0 ? _c : [];
        for (const field of additions) {
            if (!(field === null || field === void 0 ? void 0 : field.loc))
                continue;
            const collision = mapFieldsByLoc[field.loc];
            // Update first entry
            if (collision) {
                // Mutate common entry between sitemapFields and mapFieldsByLoc (spread operator don't work)
                Object.entries(field).forEach(([key, value]) => (collision[key] = value));
                continue;
            }
            sitemapFields.push(field);
        }
    }
    return sitemapFields.map((x) => {
        var _a;
        return (Object.assign(Object.assign({}, x), { loc: (0, exports.absoluteUrl)(config.siteUrl, x.loc, config.trailingSlash), alternateRefs: ((_a = x.alternateRefs) !== null && _a !== void 0 ? _a : []).map((alternateRef) => ({
                href: (0, exports.absoluteUrl)(alternateRef.href, x.loc, config.trailingSlash),
                hreflang: alternateRef.hreflang,
            })) }));
    });
});
exports.createUrlSet = createUrlSet;
