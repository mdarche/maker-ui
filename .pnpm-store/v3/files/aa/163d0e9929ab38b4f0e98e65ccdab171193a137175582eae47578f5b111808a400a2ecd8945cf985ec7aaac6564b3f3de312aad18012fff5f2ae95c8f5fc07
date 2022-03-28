"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const config_1 = require("../../fixtures/config");
describe('next-sitemap/generateRobotsTxt', () => {
    test('generateRobotsTxt: generateRobotsTxt false in config', () => {
        expect((0, index_1.generateRobotsTxt)(Object.assign(Object.assign({}, config_1.sampleConfig), { generateRobotsTxt: false }))).toBeNull();
    });
    test('generateRobotsTxt: additionalSitemap', () => {
        expect((0, index_1.generateRobotsTxt)(config_1.sampleConfig)).toMatchSnapshot();
    });
});
