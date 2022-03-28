"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeIfMatchPattern = exports.removeFromArray = exports.toArray = exports.toChunks = void 0;
const matcher_1 = require("../matcher");
const toChunks = (arr, chunkSize) => {
    return arr.reduce((prev, _, i) => i % chunkSize ? prev : [...prev, arr.slice(i, i + chunkSize)], []);
};
exports.toChunks = toChunks;
/**
 * simple method to normalize any string to array
 * @param inp
 */
const toArray = (inp) => {
    return typeof inp === 'string' ? [inp] : inp;
};
exports.toArray = toArray;
/**
 * Returns the difference between two arrays
 * @param inputArr input array
 * @param toRemoveArr array of elements to be removed
 */
const removeFromArray = (inputArr, toRemoveArr) => {
    return inputArr.filter((x) => !toRemoveArr.includes(x));
};
exports.removeFromArray = removeFromArray;
/**
 * Returns the difference between two arrays, which match input array pattern
 * @param inputArr input array
 * @param toRemoveArr array of elements to be removed
 */
const removeIfMatchPattern = (inputArr, toRemoveArr) => {
    const matchedArr = (0, matcher_1.matcher)(inputArr, toRemoveArr);
    return (0, exports.removeFromArray)(inputArr, matchedArr);
};
exports.removeIfMatchPattern = removeIfMatchPattern;
