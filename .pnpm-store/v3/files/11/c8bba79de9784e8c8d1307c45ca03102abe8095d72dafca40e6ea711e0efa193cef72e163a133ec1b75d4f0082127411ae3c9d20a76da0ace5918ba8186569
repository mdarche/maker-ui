"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportFile = exports.loadFile = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loadFile = (path, throwError = true) => {
    if (fs_1.default.existsSync(path)) {
        return require(path);
    }
    if (throwError) {
        new Error(`${path} does not exist.`);
    }
};
exports.loadFile = loadFile;
const exportFile = (filePath, content) => {
    const folder = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder);
    }
    fs_1.default.writeFileSync(filePath, content);
};
exports.exportFile = exportFile;
