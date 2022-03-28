"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSitemap = void 0;
const file_1 = require("../file");
const buildSitemapXml_1 = require("./buildSitemapXml");
const generateSitemap = (chunk) => {
    const sitemapXml = (0, buildSitemapXml_1.buildSitemapXml)(chunk.fields);
    (0, file_1.exportFile)(chunk.path, sitemapXml);
};
exports.generateSitemap = generateSitemap;
