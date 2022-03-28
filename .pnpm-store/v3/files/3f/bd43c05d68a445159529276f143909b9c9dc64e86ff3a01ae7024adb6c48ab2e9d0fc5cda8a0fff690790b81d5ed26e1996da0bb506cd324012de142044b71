"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRobotsTxt = void 0;
const policy_1 = require("../policy");
const generateRobotsTxt = (config) => {
    if (!config.generateRobotsTxt) {
        return null;
    }
    const { additionalSitemaps, policies } = config.robotsTxtOptions;
    const normalizedPolices = (0, policy_1.normalizePolicy)(policies);
    let content = '';
    normalizedPolices.forEach((x) => {
        content += `# ${x.userAgent}\nUser-agent: ${x.userAgent}\n`;
        if (x.allow) {
            content += `${(0, policy_1.addPolicies)('Allow', x.allow)}`;
        }
        if (x.disallow) {
            content += `${(0, policy_1.addPolicies)('Disallow', x.disallow)}`;
        }
        content += '\n';
    });
    // Append host
    content += `# Host\nHost: ${config.siteUrl}\n`;
    if (additionalSitemaps && additionalSitemaps.length > 0) {
        content += `\n# Sitemaps\n`;
        additionalSitemaps.forEach((x) => {
            content += `Sitemap: ${x}\n`;
        });
    }
    return content;
};
exports.generateRobotsTxt = generateRobotsTxt;
