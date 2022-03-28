"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('next-sitemap', () => {
    test('isURL : Valid', () => {
        expect((0, index_1.isURL)('https://example.com')).toBeTruthy();
    });
    test('isURL : Invalid', () => {
        expect((0, index_1.isURL)('/someone-relative/path/item.jpg')).toBeFalsy();
    });
    test('cleanPath : Relative Path', () => {
        expect((0, index_1.cleanPath)('./epic///awesome///path')).toBe('./epic/awesome/path');
    });
    test('cleanPath: Public Url', () => {
        expect((0, index_1.cleanPath)('https://www.example.com//epic///awesome///path')).toBe('https://www.example.com/epic/awesome/path');
    });
    test('generateUrl: with relative slug', () => {
        const url = (0, index_1.generateUrl)('https://base.example.com', '//awesome/path');
        expect(url).toBe('https://base.example.com/awesome/path');
    });
    test('generateUrl: with external slug', () => {
        const url = (0, index_1.generateUrl)('https://base.example.com', 'https://cdn.another.site/new//path');
        expect(url).toBe('https://cdn.another.site/new/path');
    });
    test('isNextInternalUrl', () => {
        expect((0, index_1.isNextInternalUrl)('/_app')).toBeTruthy();
        expect((0, index_1.isNextInternalUrl)('/404')).toBeTruthy();
        expect((0, index_1.isNextInternalUrl)('/_random')).toBeTruthy();
        expect((0, index_1.isNextInternalUrl)('/_middleware')).toBeTruthy();
        expect((0, index_1.isNextInternalUrl)('/about/_middleware')).toBeTruthy();
        expect((0, index_1.isNextInternalUrl)('/some_url/about/_middleware')).toBeTruthy();
        expect((0, index_1.isNextInternalUrl)('/projects/[id]/_middleware')).toBeTruthy();
    });
    test('isNextInternalUrl: url params', () => {
        expect((0, index_1.isNextInternalUrl)('/[id]')).toBeTruthy();
        expect((0, index_1.isNextInternalUrl)('/blog/[id]')).toBeTruthy();
    });
    test('isNextInternalUrl: allow urls with underscore`', () => {
        expect((0, index_1.isNextInternalUrl)('/_some_url')).toBeTruthy();
        expect((0, index_1.isNextInternalUrl)('/some_url/[param]')).toBeTruthy();
        expect((0, index_1.isNextInternalUrl)('/some_url')).toBeFalsy();
        expect((0, index_1.isNextInternalUrl)('/some-404')).toBeFalsy();
    });
    test('createDefaultLocaleReplace: replaces default locale within path`', () => {
        const replaceDefaultLocale = (0, index_1.createDefaultLocaleReplace)('en-US');
        expect(replaceDefaultLocale('/')).toBe('/');
        expect(replaceDefaultLocale('/en-US')).toBe('/');
        expect(replaceDefaultLocale('/en-US/')).toBe('/');
        expect(replaceDefaultLocale('/en-US/home')).toBe('/home');
        expect(replaceDefaultLocale('/en-US/home/')).toBe('/home/');
        expect(replaceDefaultLocale('/en-US-home')).toBe('/en-US-home');
        expect(replaceDefaultLocale('/en-USA/home')).toBe('/en-USA/home');
        expect(replaceDefaultLocale('/fr')).toBe('/fr');
        expect(replaceDefaultLocale('/fr/about')).toBe('/fr/about');
    });
});
