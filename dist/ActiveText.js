"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: cnyballk[https://github.com/cnyballk]
 * @Date: 2018-09-01 15:45:26
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-01 15:44:53
 */
const config_1 = require("./config");
const vscode_1 = require("vscode");
const COMMENT_REGEXP = /<!--([\s\S]*?)-->/g;
// const TAG_REGEXP = /<\/?([A-Z]+\w+)/g
const TAG_REGEXP = /<\/?((\w+-*)+)/g;
class ActiveText {
    constructor(config) {
        this.config = config;
        this.decorationCache = {};
        this.disposables = [];
        // 首次立即更新，文件变化延迟更新
        if (vscode_1.window.activeTextEditor)
            this.onChange(vscode_1.window.activeTextEditor);
        let tid;
        let update = (editor, resetCache) => {
            if (!editor)
                return;
            if (tid)
                clearTimeout(tid);
            tid = setTimeout(() => this.onChange(editor, resetCache), 500);
        };
        this.disposables.push(vscode_1.window.onDidChangeVisibleTextEditors(editors => {
            editors.forEach(e => this.onChange(e));
            this.updateDecorationCache();
        }), 
        // window.onDidChangeActiveTextEditor(editor => {
        //   this.onChange(editor, true)
        // }),
        vscode_1.workspace.onDidChangeTextDocument(e => {
            if (e &&
                vscode_1.window.activeTextEditor &&
                e.document === vscode_1.window.activeTextEditor.document) {
                update(vscode_1.window.activeTextEditor, true);
            }
        }));
    }
    onChange(editor, resetCache) {
        if (!editor)
            return;
        let doc = editor.document;
        if (this.config.activeDisable)
            return;
        if (doc.languageId === 'wxml') {
            let cache = this.decorationCache[doc.fileName];
            if (cache && !resetCache) {
                editor.setDecorations(cache.style, cache.ranges);
            }
            else {
                this.decorateWxml(editor);
            }
        }
    }
    decorateWxml(editor) {
        let doc = editor.document;
        let text = doc.getText();
        let comments = getRanges(text, COMMENT_REGEXP, doc, []);
        let ranges = [...getRanges(text, TAG_REGEXP, doc, comments)];
        let decorationType = vscode_1.window.createTextEditorDecorationType(Object.assign({}, this.config.activeColor));
        if (this.decorationCache[doc.fileName])
            this.decorationCache[doc.fileName].style.dispose();
        editor.setDecorations(decorationType, ranges);
        this.decorationCache[doc.fileName] = { style: decorationType, ranges };
    }
    updateDecorationCache() {
        let cache = this.decorationCache;
        let oldKeys = Object.keys(cache);
        let existKeys = vscode_1.workspace.textDocuments.map(doc => doc.fileName);
        oldKeys.forEach(k => {
            if (existKeys.indexOf(k) < 0 && cache[k]) {
                cache[k].style.dispose();
                delete cache[k];
            }
        });
    }
    dispose() {
        Object.keys(this.decorationCache).forEach(k => this.decorationCache[k].style.dispose());
        this.decorationCache = {};
        this.disposables.forEach(d => d.dispose());
    }
}
exports.default = ActiveText;
function getRanges(content, regexp, doc, excludeRanges) {
    let match;
    let ranges = [];
    // tslint:disable:no-conditional-assignment
    while ((match = regexp.exec(content))) {
        if (match[1]) {
            let { index } = match;
            let word = match[1];
            let createRange = true;
            if (regexp === COMMENT_REGEXP) {
                word = match[0];
            }
            else {
                if (config_1.config.tagNoActiveArr.indexOf(word) !== -1)
                    continue;
                index += match[0].indexOf(word);
                createRange = shouldCreateRange(word);
            }
            if (createRange) {
                let start = doc.positionAt(index);
                let end = doc.positionAt(index + word.length);
                let range = new vscode_1.Range(start, end);
                if (excludeRanges.every(r => !r.contains(range))) {
                    ranges.push(range);
                }
            }
        }
    }
    return ranges;
}
function shouldCreateRange(word) {
    let key = word.trim();
    if (!key)
        return false;
    let firstChar = key[0];
    let lastChar = key[key.length - 1];
    return (['true', 'false'].indexOf(key) < 0 &&
        !(['"', "'"].indexOf(firstChar) >= 0 &&
            firstChar === lastChar &&
            !key.substr(1, key.length - 2).includes(firstChar)) &&
        !key.startsWith('{{') &&
        !/\d/.test(firstChar));
}
//# sourceMappingURL=ActiveText.js.map