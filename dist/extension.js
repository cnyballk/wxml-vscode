"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: cnyballk[https://github.com/cnyballk]
 * @Date: 2018-08-31 10:40:17
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-01 15:44:27
 */
const vscode_1 = require("vscode");
const ActiveText_1 = require("./ActiveText");
const FormatWxml_1 = require("./FormatWxml");
const config_1 = require("./config");
function activate(context) {
    const wxml = new FormatWxml_1.default();
    config_1.configActivate();
    autoConfig();
    context.subscriptions.push(new ActiveText_1.default(config_1.config));
    vscode_1.commands.registerCommand('extension.formatwxml', () => {
        wxml.init();
    });
}
exports.activate = activate;
function deactivate() {
    config_1.configDeactivate();
}
exports.deactivate = deactivate;
function autoConfig() {
    let c = vscode_1.workspace.getConfiguration();
    const updates = [
        {
            key: 'files.associations',
            map: {
                '*.cjson': 'jsonc',
                '*.wxss': 'css',
                '*.wxs': 'javascript',
            },
        },
        {
            key: 'emmet.includeLanguages',
            map: {
                wxml: 'html',
            },
        },
    ];
    updates.forEach(({ key, map }) => {
        let oldMap = c.get(key, {});
        let appendMap = {};
        Object.keys(map).forEach(k => {
            if (!oldMap.hasOwnProperty(k))
                appendMap[k] = map[k];
        });
        if (Object.keys(appendMap).length) {
            c.update(key, Object.assign({}, oldMap, appendMap), true);
        }
    });
    c.update('minapp-vscode.disableAutoConfig', true, true);
}
//# sourceMappingURL=extension.js.map