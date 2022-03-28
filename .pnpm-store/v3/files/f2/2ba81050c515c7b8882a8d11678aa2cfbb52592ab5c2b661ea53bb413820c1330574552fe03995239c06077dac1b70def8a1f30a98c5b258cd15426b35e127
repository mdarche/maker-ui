"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildSitemapXml_1 = require("../buildSitemapXml");
describe('buildSitemapXml', () => {
    test('snapshot test to exclude undefined values from final sitemap', () => {
        // Sample fields
        const fields = [
            {
                loc: 'https://example.com',
                lastmod: undefined,
            },
            {
                loc: 'https://example.com',
                lastmod: 'some-value',
                alternateRefs: [
                    {
                        href: 'https://example.com/en',
                        hreflang: 'en',
                    },
                    {
                        href: 'https://example.com/fr',
                        hreflang: 'fr',
                    },
                ],
            },
        ];
        // Generate sitemap
        const sitemap = (0, buildSitemapXml_1.buildSitemapXml)(fields);
        // Expect the generated sitemap to match snapshot.
        expect(sitemap).toMatchSnapshot();
    });
});
