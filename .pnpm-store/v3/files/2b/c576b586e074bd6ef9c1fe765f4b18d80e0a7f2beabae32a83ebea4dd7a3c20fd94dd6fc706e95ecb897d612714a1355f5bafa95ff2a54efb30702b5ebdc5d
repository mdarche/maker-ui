import { loadFile } from '../file';
export const loadManifest = (runtimePaths) => {
    const build = loadFile(runtimePaths.BUILD_MANIFEST);
    const preRender = loadFile(runtimePaths.PRERENDER_MANIFEST, false);
    const routes = loadFile(runtimePaths.ROUTES_MANIFEST, false);
    return {
        build,
        preRender,
        routes,
    };
};
