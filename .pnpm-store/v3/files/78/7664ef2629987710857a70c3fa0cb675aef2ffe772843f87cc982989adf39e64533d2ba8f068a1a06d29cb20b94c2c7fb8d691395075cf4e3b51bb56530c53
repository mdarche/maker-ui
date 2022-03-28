var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { buildSitemapXml } from '../sitemap/buildSitemapXml';
export const getServerSideSitemap = (context, fields) => __awaiter(void 0, void 0, void 0, function* () {
    const sitemapContent = buildSitemapXml(fields);
    if (context && context.res) {
        const { res } = context;
        // Set header
        res.setHeader('Content-Type', 'text/xml');
        // Write the sitemap context to resonse
        res.write(sitemapContent);
        // End response
        res.end();
    }
    // Empty props
    return {
        props: {},
    };
});
