"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_object_1 = require("../is-object");
const get_merge_fn_1 = require("../get-merge-fn");
const withDefaultOptions = (options) => {
    return Object.assign({ arrayMergeType: 'combine', arrayMerge: get_merge_fn_1.getMergeFn(options ? options.arrayMergeType : 'combine') }, options);
};
const merge = (objects, options) => {
    const opts = withDefaultOptions(options);
    return objects.reduce((prev, curr) => {
        Object.keys(curr).forEach((key) => {
            if (Array.isArray(prev[key]) && Array.isArray(curr[key])) {
                if (opts && opts.arrayMerge) {
                    prev[key] = opts.arrayMerge(prev[key], curr[key]);
                }
            }
            else if (is_object_1.isObject(prev[key]) && is_object_1.isObject(curr[key])) {
                prev[key] = merge([prev[key], curr[key]], opts);
            }
            else {
                prev[key] = curr[key];
            }
        });
        return prev;
    }, {});
};
exports.default = merge;
