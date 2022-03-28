"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAlternateRefsXml = exports.buildSitemapXml = void 0;
const withXMLTemplate_1 = require("./withXMLTemplate");
const buildSitemapXml = (fields) => {
    const content = fields
        .map((fieldData) => {
        const field = [];
        // Iterate all object keys and key value pair to field-set
        for (const key of Object.keys(fieldData)) {
            if (fieldData[key]) {
                if (key !== 'alternateRefs') {
                    field.push(`<${key}>${fieldData[key]}</${key}>`);
                }
                else {
                    field.push((0, exports.buildAlternateRefsXml)(fieldData.alternateRefs));
                }
            }
        }
        // Append previous value and return
        return `<url>${field.join('')}</url>\n`;
    })
        .join('');
    return (0, withXMLTemplate_1.withXMLTemplate)(content);
};
exports.buildSitemapXml = buildSitemapXml;
const buildAlternateRefsXml = (alternateRefs = []) => {
    return alternateRefs
        .map((alternateRef) => {
        return `<xhtml:link rel="alternate" hreflang="${alternateRef.hreflang}" href="${alternateRef.href}"/>`;
    })
        .join('');
};
exports.buildAlternateRefsXml = buildAlternateRefsXml;
