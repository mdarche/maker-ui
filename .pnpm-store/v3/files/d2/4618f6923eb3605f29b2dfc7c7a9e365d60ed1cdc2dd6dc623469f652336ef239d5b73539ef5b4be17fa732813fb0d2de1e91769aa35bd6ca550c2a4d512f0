"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadManifest = void 0;
const file_1 = require("../file");
const loadManifest = (runtimePaths) => {
    const build = (0, file_1.loadFile)(runtimePaths.BUILD_MANIFEST);
    const preRender = (0, file_1.loadFile)(runtimePaths.PRERENDER_MANIFEST, false);
    const routes = (0, file_1.loadFile)(runtimePaths.ROUTES_MANIFEST, false);
    return {
        build,
        preRender,
        routes,
    };
};
exports.loadManifest = loadManifest;
