import { normalizePolicy, addPolicies } from '../policy';
export const generateRobotsTxt = (config) => {
    if (!config.generateRobotsTxt) {
        return null;
    }
    const { additionalSitemaps, policies } = config.robotsTxtOptions;
    const normalizedPolices = normalizePolicy(policies);
    let content = '';
    normalizedPolices.forEach((x) => {
        content += `# ${x.userAgent}\nUser-agent: ${x.userAgent}\n`;
        if (x.allow) {
            content += `${addPolicies('Allow', x.allow)}`;
        }
        if (x.disallow) {
            content += `${addPolicies('Disallow', x.disallow)}`;
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
