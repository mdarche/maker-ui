import { exportFile } from '../file';
import { buildSitemapXml } from './buildSitemapXml';
export const generateSitemap = (chunk) => {
    const sitemapXml = buildSitemapXml(chunk.fields);
    exportFile(chunk.path, sitemapXml);
};
