"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: cnyballk[https://github.com/cnyballk]
 * @Date: 2018-08-31 10:40:17
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-03 13:15:31
 */
const vscode_1 = require("vscode");
const ActiveText_1 = require("./ActiveText");
const FormatWxml_1 = require("./FormatWxml");
const saveFormat_1 = require("./saveFormat");
const config_1 = require("./config");
function activate(context) {
    const wxml = new FormatWxml_1.default();
    config_1.getConfig();
    saveFormat_1.default(wxml);
    const activeText = new ActiveText_1.default(config_1.config);
    config_1.configActivate(activeText, () => {
        saveFormat_1.default(wxml);
    });
    context.subscriptions.push(activeText);
    vscode_1.commands.registerCommand('extension.formatwxml', () => {
        wxml.init();
    });
}
exports.activate = activate;
function deactivate() {
    config_1.configDeactivate();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map