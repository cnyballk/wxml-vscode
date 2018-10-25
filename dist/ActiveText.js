"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: cnyballk[https://github.com/cnyballk]
 * @Date: 2018-09-01 15:45:26
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-10-25 10:08:13
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
            editors.forEach(e => this.onChange(e, !this.config.cache));
            this.updateDecorationCache();
        }), vscode_1.workspace.onDidChangeTextDocument(e => {
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
        if (this.config.activeDisable)
            return;
        const { languageId, fileName } = editor.document;
        if (languageId === 'wxml') {
            const _a = this.config.activeColor, { color } = _a, tag = __rest(_a, ["color"]);
            tag['color'] = {};
            for (let i in tag) {
                let cache = this.decorationCache[fileName + '-cnyballk-' + i];
                if (cache && !resetCache) {
                    editor.setDecorations(cache.style, cache.ranges);
                }
                else {
                    this.decorateWxml(editor);
                }
            }
        }
    }
    //更新
    updateDecorationCache() {
        let cache = this.decorationCache;
        let oldKeys = Object.keys(cache);
        let existKeys = vscode_1.workspace.textDocuments.map(doc => doc.fileName);
        oldKeys.forEach(k => {
            k = k.split('-cnyballk-')[0];
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
    decorateWxml(editor) {
        let doc = editor.document;
        let text = doc.getText();
        let comments = getRanges(text, COMMENT_REGEXP, doc, []);
        const _a = this.config.activeColor, { color } = _a, tag = __rest(_a, ["color"]);
        for (let i in tag) {
            let TAG_REGEXP_POINTER = new RegExp(`</?(${i}\\w*)`, 'g');
            let ranges = [...getRanges(text, TAG_REGEXP_POINTER, doc, comments, i)];
            let decorationType = vscode_1.window.createTextEditorDecorationType(Object.assign({}, { color: tag[i] }));
            const _cacheName = doc.fileName + '-cnyballk-' + i;
            if (this.decorationCache[_cacheName]) {
                this.decorationCache[_cacheName].style.dispose();
            }
            editor.setDecorations(decorationType, ranges);
            this.decorationCache[_cacheName] = {
                style: decorationType,
                ranges,
            };
        }
        let ranges = getRanges(text, TAG_REGEXP, doc, comments);
        let decorationType = vscode_1.window.createTextEditorDecorationType(Object.assign({}, { color }));
        const _cacheName = doc.fileName + '-cnyballk-color';
        if (this.decorationCache[_cacheName]) {
            this.decorationCache[_cacheName].style.dispose();
        }
        editor.setDecorations(decorationType, ranges);
        this.config.cache = true;
        this.decorationCache[_cacheName] = {
            style: decorationType,
            ranges,
        };
    }
}
exports.default = ActiveText;
function getRanges(content, regexp, doc, excludeRanges, tag) {
    let match;
    let ranges = [];
    // tslint:disable:no-conditional-assignment
    while ((match = regexp.exec(content))) {
        if (match[1]) {
            let { index } = match;
            let word = match[1];
            if (tag && word !== tag)
                continue;
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