"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe('absoluteUrl', () => {
    test('absoluteUrl: without trailing slash', () => {
        expect((0, __1.absoluteUrl)('https://example.com', '/', false)).toBe('https://example.com');
        expect((0, __1.absoluteUrl)('https://example.com/hello/', '/', false)).toBe('https://example.com/hello');
    });
    test('absoluteUrl: with trailing slash', () => {
        expect((0, __1.absoluteUrl)('https://example.com', '/', true)).toBe('https://example.com/');
        expect((0, __1.absoluteUrl)('https://example.com/hello/', '/', true)).toBe('https://example.com/hello/');
    });
    test('absoluteUrl: with uri encoding', () => {
        expect((0, __1.absoluteUrl)(`https://example.com/&/'/"/>/<`, '/', true)).toMatchInlineSnapshot(`"https://example.com/&amp;/&apos;/&quot;/&gt;/&lt;/"`);
    });
});
