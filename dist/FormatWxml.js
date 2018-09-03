"use strict";
/*
 * @Author: cnyballk[https://github.com/cnyballk]
 * @Date: 2018-08-31 10:43:17
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-03 12:52:47
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const cny_js_beautify_1 = require("cny_js_beautify");
class FormatWxml {
    init() {
        this.editor = vscode_1.window.activeTextEditor;
        if (!this.editor)
            throw new Error('no active editor');
        if (this.editor.document.languageId === 'wxml') {
            const doc = this.editor.document;
            const text = this.beauty(doc.getText());
            this.lineNumber = doc.lineCount;
            this.writeToFile(text);
        }
    }
    getConfig() {
        let wxmlFormatConf = vscode_1.workspace
            .getConfiguration('wxmlConfig')
            .get('format', {});
        if (!wxmlFormatConf) {
            return;
        }
        return wxmlFormatConf;
    }
    beauty(text) {
        let str = cny_js_beautify_1.html(text, {
            html: this.getConfig(),
        });
        return `${str}\n\n`;
    }
    writeToFile(str) {
        let start = new vscode_1.Position(0, 0);
        let end = new vscode_1.Position(this.lineNumber + 1, 0);
        let range = new vscode_1.Range(start, end);
        this.editor.edit((editBuilder, error) => {
            error && vscode_1.window.showErrorMessage(error);
            editBuilder.replace(range, str);
        });
    }
}
exports.default = FormatWxml;
//# sourceMappingURL=FormatWxml.js.map