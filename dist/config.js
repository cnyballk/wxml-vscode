"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: cnyballk[https://github.com/cnyballk]
 * @Date: 2018-08-31 10:44:00
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-10-09 16:47:16
 */
const vscode_1 = require("vscode");
let listener;
exports.config = {
    activeColor: {},
    cache: false,
    onSaveFormat: false,
    activeDisable: false,
    tagNoActiveArr: [],
};
function getConfig(e) {
    if (e && !e.affectsConfiguration('wxmlConfig'))
        return;
    const wxml = vscode_1.workspace.getConfiguration('wxmlConfig');
    exports.config.activeColor = wxml.get('activeColor', {});
    exports.config.activeDisable = wxml.get('activeDisable', false);
    exports.config.tagNoActiveArr = wxml.get('tagNoActiveArr', []);
    exports.config.onSaveFormat = wxml.get('onSaveFormat', false);
    exports.config.cache = false;
}
exports.getConfig = getConfig;
function configActivate(activeText, saveFormat) {
    listener = vscode_1.workspace.onDidChangeConfiguration((e) => {
        getConfig(e);
        saveFormat();
        let tid = null;
        if (tid)
            clearTimeout(tid);
        tid = setTimeout(() => {
            activeText.onChange(vscode_1.window.activeTextEditor, true);
        }, 500);
    });
}
exports.configActivate = configActivate;
function configDeactivate() {
    listener.dispose();
}
exports.configDeactivate = configDeactivate;
//# sourceMappingURL=config.js.map