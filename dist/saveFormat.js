"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const config_1 = require("./config");
function saveFormat(wxml) {
    let oldDocument = {
        fileName: '',
    };
    vscode_1.workspace.onWillSaveTextDocument((e) => {
        const { document: { fileName, isDirty }, } = e;
        if (!isDirty && oldDocument.fileName === fileName) {
            return false;
        }
        oldDocument = { fileName };
        if (config_1.config.onSaveFormat) {
            wxml.init();
        }
    });
}
exports.default = saveFormat;
//# sourceMappingURL=saveFormat.js.map