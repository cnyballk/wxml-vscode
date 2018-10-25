/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-09-01 15:45:26 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-10-25 10:08:13
 */
import { Config, config } from './config';
import {
  TextEditor,
  window,
  Disposable,
  workspace,
  TextDocument,
  Range,
  TextEditorDecorationType,
} from 'vscode';

const COMMENT_REGEXP = /<!--([\s\S]*?)-->/g;
// const TAG_REGEXP = /<\/?([A-Z]+\w+)/g
const TAG_REGEXP = /<\/?((\w+-*)+)/g;

export default class ActiveText {
  private decorationCache: {
    [key: string]: { ranges: Range[]; style: TextEditorDecorationType };
  } = {};
  disposables: Disposable[] = [];

  constructor(public config: Config) {
    // 首次立即更新，文件变化延迟更新
    if (window.activeTextEditor) this.onChange(window.activeTextEditor);

    let tid: NodeJS.Timer;
    let update = (editor: TextEditor, resetCache?: boolean) => {
      if (!editor) return;
      if (tid) clearTimeout(tid);
      tid = setTimeout(() => this.onChange(editor, resetCache), 500);
    };

    this.disposables.push(
      window.onDidChangeVisibleTextEditors(editors => {
        editors.forEach(e => this.onChange(e, !this.config.cache as any));
        this.updateDecorationCache();
      }),
      workspace.onDidChangeTextDocument(e => {
        if (
          e &&
          window.activeTextEditor &&
          e.document === window.activeTextEditor.document
        ) {
          update(window.activeTextEditor, true);
        }
      })
    );
  }

  onChange(editor: TextEditor | undefined, resetCache?: boolean) {
    if (!editor) return;
    if (this.config.activeDisable) return;
    const { languageId, fileName } = editor.document;
    if (languageId === 'wxml') {
      const { color, ...tag } = this.config.activeColor as any;
      tag['color'] = {};
      for (let i in tag) {
        let cache = this.decorationCache[fileName + '-cnyballk-' + i];
        if (cache && !resetCache) {
          editor.setDecorations(cache.style, cache.ranges);
        } else {
          this.decorateWxml(editor);
        }
      }
    }
  }
  //更新
  updateDecorationCache() {
    let cache = this.decorationCache;
    let oldKeys = Object.keys(cache);
    let existKeys = workspace.textDocuments.map(doc => doc.fileName);
    oldKeys.forEach(k => {
      k = k.split('-cnyballk-')[0];
      if (existKeys.indexOf(k) < 0 && cache[k]) {
        cache[k].style.dispose();
        delete cache[k];
      }
    });
  }
  dispose() {
    Object.keys(this.decorationCache).forEach(k =>
      this.decorationCache[k].style.dispose()
    );
    this.decorationCache = {};
    this.disposables.forEach(d => d.dispose());
  }
  decorateWxml(editor: TextEditor) {
    let doc = editor.document;
    let text = doc.getText();
    let comments = getRanges(text, COMMENT_REGEXP, doc, []);
    const { color, ...tag } = this.config.activeColor as any;
    for (let i in tag) {
      let TAG_REGEXP_POINTER = new RegExp(`</?(${i}\\w*)`, 'g');
      let ranges = [...getRanges(text, TAG_REGEXP_POINTER, doc, comments, i)];
      let decorationType = window.createTextEditorDecorationType(
        Object.assign({}, { color: tag[i] })
      );
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
    let decorationType = window.createTextEditorDecorationType(
      Object.assign({}, { color })
    );
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
function getRanges(
  content: string,
  regexp: RegExp,
  doc: TextDocument,
  excludeRanges: Range[],
  tag?: string
) {
  let match: RegExpExecArray | null;
  let ranges: Range[] = [];
  // tslint:disable:no-conditional-assignment
  while ((match = regexp.exec(content))) {
    if (match[1]) {
      let { index } = match;
      let word = match[1];
      if (tag && word !== tag) continue;
      let createRange = true;
      if (regexp === COMMENT_REGEXP) {
        word = match[0];
      } else {
        if (config.tagNoActiveArr.indexOf(word) !== -1) continue;
        index += match[0].indexOf(word);
        createRange = shouldCreateRange(word);
      }

      if (createRange) {
        let start = doc.positionAt(index);
        let end = doc.positionAt(index + word.length);
        let range = new Range(start, end);
        if (excludeRanges.every(r => !r.contains(range))) {
          ranges.push(range);
        }
      }
    }
  }

  return ranges;
}

function shouldCreateRange(word: string) {
  let key = word.trim();
  if (!key) return false;

  let firstChar = key[0];
  let lastChar = key[key.length - 1];
  return (
    ['true', 'false'].indexOf(key) < 0 &&
    !(
      ['"', "'"].indexOf(firstChar) >= 0 &&
      firstChar === lastChar &&
      !key.substr(1, key.length - 2).includes(firstChar)
    ) &&
    !key.startsWith('{{') &&
    !/\d/.test(firstChar)
  );
}
