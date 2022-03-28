"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportRobotsTxt = void 0;
const generate_1 = require("../generate");
const file_1 = require("../../file");
const deepmerge_1 = require("@corex/deepmerge");
const exportRobotsTxt = (runtimePaths, config, allSitemaps) => {
    // combine-merge allSitemaps with user-provided additionalSitemaps
    const newConfig = (0, deepmerge_1.merge)([
        {
            robotsTxtOptions: {
                additionalSitemaps: allSitemaps,
            },
        },
        config,
    ]);
    // generate robots text
    const robotsTxt = (0, generate_1.generateRobotsTxt)(newConfig);
    // create file
    if (robotsTxt) {
        (0, file_1.exportFile)(runtimePaths.ROBOTS_TXT_FILE, robotsTxt);
    }
};
exports.exportRobotsTxt = exportRobotsTxt;
