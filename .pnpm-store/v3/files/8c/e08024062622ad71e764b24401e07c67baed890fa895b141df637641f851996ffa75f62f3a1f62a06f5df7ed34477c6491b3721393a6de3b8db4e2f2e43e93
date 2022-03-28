import { toArray } from '../../array';
export const normalizePolicy = (policies) => {
    return policies.map((x) => (Object.assign(Object.assign({}, x), { allow: toArray(x.allow), disallow: toArray(x.disallow) })));
};
export const addPolicies = (key, rules) => {
    return rules.reduce((prev, curr) => `${prev}${key}: ${curr}\n`, '');
};
