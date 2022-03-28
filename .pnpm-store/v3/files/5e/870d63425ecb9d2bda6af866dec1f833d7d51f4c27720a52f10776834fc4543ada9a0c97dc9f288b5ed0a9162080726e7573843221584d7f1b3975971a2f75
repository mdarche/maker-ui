import { generateRobotsTxt } from './index';
import { sampleConfig } from '../../fixtures/config';
describe('next-sitemap/generateRobotsTxt', () => {
    test('generateRobotsTxt: generateRobotsTxt false in config', () => {
        expect(generateRobotsTxt(Object.assign(Object.assign({}, sampleConfig), { generateRobotsTxt: false }))).toBeNull();
    });
    test('generateRobotsTxt: additionalSitemap', () => {
        expect(generateRobotsTxt(sampleConfig)).toMatchSnapshot();
    });
});
