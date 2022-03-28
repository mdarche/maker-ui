"use strict";
/* eslint-env browser */
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
function init(importPromises, parent = (window.opener || window.parent)) {
    const Cypress = window.Cypress = parent.Cypress;
    if (!Cypress) {
        throw new Error('Tests cannot run without a reference to Cypress!');
    }
    Cypress.onSpecWindow(window, importPromises);
    Cypress.action('app:window:before:load', window);
}
exports.init = init;
