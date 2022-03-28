"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureWebpackPerformance = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
// @ts-ignore
const speed_measure_webpack_plugin_1 = __importDefault(require("speed-measure-webpack-plugin"));
function measureWebpackPerformance(webpackConfig) {
    if (!process.env.WEBPACK_PERF_MEASURE) {
        throw new Error('Performance monitoring is possible only with WEBPACK_PERF_MEASURE env variable set');
    }
    const compareWithPrevious = process.env.WEBPACK_PERF_MEASURE_COMPARE;
    function percentageDiff(a, b) {
        return ((a - b) / a) * 100;
    }
    const compareOutput = (output) => {
        const statsPath = path_1.default.resolve(__dirname, '..', '__perf-stats', `${compareWithPrevious}.json`);
        if (!fs_1.default.existsSync(statsPath) || process.env.WEBPACK_PERF_MEASURE_UPDATE) {
            return fs_1.default.writeFileSync(statsPath, output, { encoding: 'utf-8' });
        }
        const newStats = JSON.parse(output);
        const oldStats = require(statsPath);
        const totalPercentageDiff = percentageDiff(oldStats.misc.compileTime, newStats.misc.compileTime);
        const printResult = (result) => {
            const delimiter = new Array(process.stdout.columns).fill('═').join('');
            console.log(delimiter);
            console.log(`${chalk_1.default.bold('WEBPACK_PERF_MEASURE')}`);
            console.log(`Before: ${chalk_1.default.bold(oldStats.misc.compileTime / 1000)}s`);
            console.log(`After: ${chalk_1.default.bold(newStats.misc.compileTime / 1000)}s`);
            console.log(result);
            console.log(delimiter);
        };
        if (Math.abs(totalPercentageDiff) < 5) {
            printResult('No sufficient build time difference');
        }
        else if (totalPercentageDiff > 0) {
            printResult(`New build is faster: ${chalk_1.default.green.bold(`+${Math.round(totalPercentageDiff)}%`)}`);
        }
        else {
            printResult(`New build is slower: ${chalk_1.default.red.bold(`${Math.round(totalPercentageDiff)}%`)}`);
        }
    };
    const smp = compareWithPrevious ?
        new speed_measure_webpack_plugin_1.default({
            outputFormat: 'json',
            outputTarget: compareOutput,
        })
        : new speed_measure_webpack_plugin_1.default();
    return smp.wrap(webpackConfig);
}
exports.measureWebpackPerformance = measureWebpackPerformance;
