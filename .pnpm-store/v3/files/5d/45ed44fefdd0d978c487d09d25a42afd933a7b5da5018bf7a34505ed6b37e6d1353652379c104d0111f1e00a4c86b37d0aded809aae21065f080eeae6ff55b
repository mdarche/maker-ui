"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPolicies = exports.normalizePolicy = void 0;
const array_1 = require("../../array");
const normalizePolicy = (policies) => {
    return policies.map((x) => (Object.assign(Object.assign({}, x), { allow: (0, array_1.toArray)(x.allow), disallow: (0, array_1.toArray)(x.disallow) })));
};
exports.normalizePolicy = normalizePolicy;
const addPolicies = (key, rules) => {
    return rules.reduce((prev, curr) => `${prev}${key}: ${curr}\n`, '');
};
exports.addPolicies = addPolicies;
