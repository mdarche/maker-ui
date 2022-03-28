"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const overwrite_merge_1 = require("../overwrite-merge");
const combine_merge_1 = require("../combine-merge");
const getMergeFn = (type) => {
    switch (type) {
        case 'overwrite':
            return overwrite_merge_1.overwriteMerge;
        case 'combine':
        default:
            return combine_merge_1.combineMerge;
    }
};
exports.default = getMergeFn;
