"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('next-sitemap/array', () => {
    test('toChunks', () => {
        const inputArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const chunkSize = 3;
        const chunks = (0, index_1.toChunks)(inputArray, chunkSize);
        expect(chunks).toStrictEqual([
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [9, 10],
        ]);
    });
    test('toArray', () => {
        expect((0, index_1.toArray)('hello')).toStrictEqual(['hello']);
        expect((0, index_1.toArray)(['hello', 'world'])).toStrictEqual(['hello', 'world']);
    });
    test('removeFromArray', () => {
        expect((0, index_1.removeFromArray)([1, 2, 3], [2])).toStrictEqual([1, 3]);
        expect((0, index_1.removeFromArray)([1, 2, 3], [2, 3, 4])).toStrictEqual([1]);
    });
    test('removeIfMatchPattern', () => {
        expect((0, index_1.removeIfMatchPattern)(['/hello', '/world', '/something'], ['/hello*', '/som*'])).toStrictEqual(['/world']);
    });
});
