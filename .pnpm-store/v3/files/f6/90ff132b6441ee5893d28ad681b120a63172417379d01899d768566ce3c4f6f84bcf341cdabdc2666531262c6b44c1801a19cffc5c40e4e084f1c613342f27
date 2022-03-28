import { generateRobotsTxt } from '../generate';
import { exportFile } from '../../file';
import { merge } from '@corex/deepmerge';
export const exportRobotsTxt = (runtimePaths, config, allSitemaps) => {
    // combine-merge allSitemaps with user-provided additionalSitemaps
    const newConfig = merge([
        {
            robotsTxtOptions: {
                additionalSitemaps: allSitemaps,
            },
        },
        config,
    ]);
    // generate robots text
    const robotsTxt = generateRobotsTxt(newConfig);
    // create file
    if (robotsTxt) {
        exportFile(runtimePaths.ROBOTS_TXT_FILE, robotsTxt);
    }
};
