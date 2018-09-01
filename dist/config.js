"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: cnyballk[https://github.com/cnyballk]
 * @Date: 2018-08-31 10:44:00
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-01 15:47:33
 */
const vscode = require("vscode");
let listener;
exports.config = {
    activeColor: {},
    activeDisable: false,
    tagNoActiveArr: [],
};
function getConfig() { }
function configActivate() {
    listener = vscode.workspace.onDidChangeConfiguration(getConfig);
    const wxml = vscode.workspace.getConfiguration('wxmlConfig');
    exports.config.activeColor = wxml.get('activeColor', {});
    exports.config.activeDisable = wxml.get('activeDisable', false);
    exports.config.tagNoActiveArr = wxml.get('tagNoActiveArr', []);
}
exports.configActivate = configActivate;
function configDeactivate() {
    listener.dispose();
}
exports.configDeactivate = configDeactivate;
//# sourceMappingURL=config.js.map