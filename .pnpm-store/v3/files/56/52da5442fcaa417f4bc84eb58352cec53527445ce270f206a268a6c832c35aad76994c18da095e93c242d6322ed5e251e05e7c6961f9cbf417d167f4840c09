import { withXMLTemplate } from './withXMLTemplate';
export const buildSitemapXml = (fields) => {
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
                    field.push(buildAlternateRefsXml(fieldData.alternateRefs));
                }
            }
        }
        // Append previous value and return
        return `<url>${field.join('')}</url>\n`;
    })
        .join('');
    return withXMLTemplate(content);
};
export const buildAlternateRefsXml = (alternateRefs = []) => {
    return alternateRefs
        .map((alternateRef) => {
        return `<xhtml:link rel="alternate" hreflang="${alternateRef.hreflang}" href="${alternateRef.href}"/>`;
    })
        .join('');
};
