"use strict";
/* eslint-disable no-useless-escape */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultLocaleReplace = exports.isNextInternalUrl = exports.generateUrl = exports.isURL = exports.cleanPath = void 0;
const cleanPath = (text) => {
    return text.replace(/([^:])(\/\/+)/g, '$1/');
};
exports.cleanPath = cleanPath;
const isURL = (text) => {
    // old: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    return /^https?:\/\//i.test(text);
};
exports.isURL = isURL;
const generateUrl = (baseUrl, slug) => {
    return (0, exports.isURL)(slug) ? (0, exports.cleanPath)(slug) : (0, exports.cleanPath)(`${baseUrl}/${slug}`);
};
exports.generateUrl = generateUrl;
/**
 * Checks whether a url is next.js specific or not
 * @param path path check
 */
const isNextInternalUrl = (path) => {
    return new RegExp(/[^\/]*^.[_]|^\/404$|\/_middleware$|(?:\[)/g).test(path);
};
exports.isNextInternalUrl = isNextInternalUrl;
/**
 * Creates a replace function to replace the default locale
 * Avoids creating the same RegExp within each replace
 *
 * Replaces only if the path does not contain the locale as an actual valid path
 *
 * Given a default locale of en-US it replaces:
 * /en-US -> /
 * /en-US/home -> /home
 * /en-US/home/ -> /home/
 *
 * Does not replace if its actual page
 * /en-USA -> /en-USA
 * /en-USA/home -> /en-USA/home
 * /en-US-home -> /en-US-home
 *
 * @param defaultLocale defaultLocale as provided by i18n within next config
 */
const createDefaultLocaleReplace = (defaultLocale) => {
    const defaultLocaleRegExp = new RegExp(`^/${defaultLocale}($|/)`);
    return (path) => path.replace(defaultLocaleRegExp, '/');
};
exports.createDefaultLocaleReplace = createDefaultLocaleReplace;
