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
const __1 = require("..");
const config_1 = require("../../../config");
const config_2 = require("../../../fixtures/config");
const manifest_1 = require("../../../fixtures/manifest");
describe('createUrlSet', () => {
    test('without exclusion', () => __awaiter(void 0, void 0, void 0, function* () {
        const urlset = yield (0, __1.createUrlSet)(config_2.sampleConfig, manifest_1.sampleManifest);
        expect(urlset).toStrictEqual([
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-0',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-1',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-2',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-3',
                alternateRefs: [],
            },
        ]);
    }));
    test('with exclusion', () => __awaiter(void 0, void 0, void 0, function* () {
        const urlset = yield (0, __1.createUrlSet)(Object.assign(Object.assign({}, config_2.sampleConfig), { exclude: ['/', '/page-0', '/page-2'] }), manifest_1.sampleManifest);
        expect(urlset).toStrictEqual([
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-1',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-3',
                alternateRefs: [],
            },
        ]);
    }));
    test('with i18n exclusion', () => __awaiter(void 0, void 0, void 0, function* () {
        const urlset = yield (0, __1.createUrlSet)(Object.assign(Object.assign({}, config_2.sampleConfig), { exclude: ['/', '/page-0', '/page-2', '/about', '/fr*'] }), manifest_1.sampleI18nManifest);
        expect(urlset).toStrictEqual([
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-1',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-3',
                alternateRefs: [],
            },
        ]);
    }));
    test('with wildcard exclusion', () => __awaiter(void 0, void 0, void 0, function* () {
        const urlset = yield (0, __1.createUrlSet)(Object.assign(Object.assign({}, config_2.sampleConfig), { exclude: ['/page*'] }), manifest_1.sampleManifest);
        expect(urlset).toStrictEqual([
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com',
                alternateRefs: [],
            },
        ]);
    }));
    test('without trailing slash', () => __awaiter(void 0, void 0, void 0, function* () {
        const urlset = yield (0, __1.createUrlSet)(Object.assign(Object.assign({}, config_2.sampleConfig), { trailingSlash: false }), manifest_1.sampleManifest);
        expect(urlset).toStrictEqual([
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-0',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-1',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-2',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-3',
                alternateRefs: [],
            },
        ]);
    }));
    test('with trailing slash', () => __awaiter(void 0, void 0, void 0, function* () {
        const urlset = yield (0, __1.createUrlSet)(Object.assign(Object.assign({}, config_2.sampleConfig), { trailingSlash: true }), manifest_1.sampleManifest);
        expect(urlset).toStrictEqual([
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-0/',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-1/',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-2/',
                alternateRefs: [],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-3/',
                alternateRefs: [],
            },
        ]);
    }));
    test('with custom transform', () => __awaiter(void 0, void 0, void 0, function* () {
        const urlset = yield (0, __1.createUrlSet)(Object.assign(Object.assign({}, config_2.sampleConfig), { trailingSlash: true, transform: (_, url) => {
                if (!['/', '/page-2'].includes(url)) {
                    return;
                }
                return {
                    loc: url,
                    changefreq: 'yearly',
                };
            } }), manifest_1.sampleManifest);
        expect(urlset).toStrictEqual([
            {
                changefreq: 'yearly',
                loc: 'https://example.com/',
                alternateRefs: [],
            },
            {
                changefreq: 'yearly',
                loc: 'https://example.com/page-2/',
                alternateRefs: [],
            },
        ]);
    }));
    test('with alternateRefs', () => __awaiter(void 0, void 0, void 0, function* () {
        const urlset = yield (0, __1.createUrlSet)(Object.assign(Object.assign({}, config_2.sampleConfig), { siteUrl: 'https://example.com/', alternateRefs: [
                { href: 'https://en.example.com/', hreflang: 'en' },
                { href: 'https://fr.example.com/', hreflang: 'fr' },
            ] }), manifest_1.sampleManifest);
        expect(urlset).toStrictEqual([
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com',
                alternateRefs: [
                    { href: 'https://en.example.com', hreflang: 'en' },
                    { href: 'https://fr.example.com', hreflang: 'fr' },
                ],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-0',
                alternateRefs: [
                    { href: 'https://en.example.com/page-0', hreflang: 'en' },
                    { href: 'https://fr.example.com/page-0', hreflang: 'fr' },
                ],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-1',
                alternateRefs: [
                    { href: 'https://en.example.com/page-1', hreflang: 'en' },
                    { href: 'https://fr.example.com/page-1', hreflang: 'fr' },
                ],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-2',
                alternateRefs: [
                    { href: 'https://en.example.com/page-2', hreflang: 'en' },
                    { href: 'https://fr.example.com/page-2', hreflang: 'fr' },
                ],
            },
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-3',
                alternateRefs: [
                    { href: 'https://en.example.com/page-3', hreflang: 'en' },
                    { href: 'https://fr.example.com/page-3', hreflang: 'fr' },
                ],
            },
        ]);
    }));
    test('with additionalPaths', () => __awaiter(void 0, void 0, void 0, function* () {
        const transform = (config, url) => __awaiter(void 0, void 0, void 0, function* () {
            if (['/', '/page-0', '/page-1'].includes(url)) {
                return;
            }
            if (url === '/additional-page-3') {
                return {
                    loc: url,
                    changefreq: 'yearly',
                    priority: 0.8,
                };
            }
            return (0, config_1.transformSitemap)(config, url);
        });
        const mockTransform = jest.fn(transform);
        const config = Object.assign(Object.assign({}, config_2.sampleConfig), { siteUrl: 'https://example.com/', transform: mockTransform, additionalPaths: (config) => __awaiter(void 0, void 0, void 0, function* () {
                return [
                    { loc: '/page-1', priority: 1, changefreq: 'yearly' },
                    { loc: '/page-3', priority: 0.9, changefreq: 'yearly' },
                    { loc: '/additional-page-1' },
                    { loc: '/additional-page-2', priority: 1, changefreq: 'yearly' },
                    yield config.transform(config, '/additional-page-3'),
                ];
            }) });
        const urlset = yield (0, __1.createUrlSet)(config, manifest_1.sampleManifest);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expect(mockTransform.mock.calls.map(([_, url]) => url)).toEqual([
            '/',
            '/page-0',
            '/page-1',
            '/page-2',
            '/page-3',
            '/additional-page-3',
        ]);
        expect(urlset).toStrictEqual([
            {
                changefreq: 'daily',
                lastmod: expect.any(String),
                priority: 0.7,
                loc: 'https://example.com/page-2',
                alternateRefs: [],
            },
            {
                changefreq: 'yearly',
                lastmod: expect.any(String),
                priority: 0.9,
                loc: 'https://example.com/page-3',
                alternateRefs: [],
            },
            {
                changefreq: 'yearly',
                priority: 1,
                loc: 'https://example.com/page-1',
                alternateRefs: [],
            },
            {
                loc: 'https://example.com/additional-page-1',
                alternateRefs: [],
            },
            {
                changefreq: 'yearly',
                priority: 1,
                loc: 'https://example.com/additional-page-2',
                alternateRefs: [],
            },
            {
                changefreq: 'yearly',
                priority: 0.8,
                loc: 'https://example.com/additional-page-3',
                alternateRefs: [],
            },
        ]);
    }));
    test('with next i18n enabled', () => __awaiter(void 0, void 0, void 0, function* () {
        const urlset = yield (0, __1.createUrlSet)(config_2.sampleConfig, manifest_1.sampleI18nManifest);
        expect(urlset).toStrictEqual([
            expect.objectContaining({
                loc: 'https://example.com',
            }),
            expect.objectContaining({
                loc: 'https://example.com/about',
            }),
            expect.objectContaining({
                loc: 'https://example.com/fr',
            }),
            expect.objectContaining({
                loc: 'https://example.com/fr/about',
            }),
            expect.objectContaining({
                loc: 'https://example.com/page-0',
            }),
            expect.objectContaining({
                loc: 'https://example.com/page-1',
            }),
            expect.objectContaining({
                loc: 'https://example.com/page-2',
            }),
            expect.objectContaining({
                loc: 'https://example.com/fr/page-2',
            }),
            expect.objectContaining({
                loc: 'https://example.com/page-3',
            }),
        ]);
    }));
});
