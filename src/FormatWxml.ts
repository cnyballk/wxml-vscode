/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-08-31 10:43:17 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-03 11:31:58
 */

import { window, workspace, Position, Range } from 'vscode';
import { html as htmlBeautify } from 'js-beautify';

export default class FormatWxml {
  editor: any;
  lineNumber: any;
  public init() {
    this.editor = window.activeTextEditor;
    if (!this.editor) throw new Error('no active editor');

    if (this.editor.document.languageId === 'wxml') {
      const doc = this.editor.document;
      const text = this.beauty(doc.getText());
      this.lineNumber = doc.lineCount;
      this.writeToFile(text);
    }
  }
  getConfig() {
    let wxmlFormatConf = workspace
      .getConfiguration('wxmlConfig')
      .get('format', {});
    if (!wxmlFormatConf) {
      return;
    }
    return wxmlFormatConf;
  }
  private beauty(text: string) {
    let str = htmlBeautify(text, {
      html: this.getConfig(),
    } as any);
    return `${str}\n\n`;
  }
  private writeToFile(str: string) {
    let start = new Position(0, 0);
    let end = new Position(this.lineNumber + 1, 0);
    let range = new Range(start, end);
    this.editor.edit((editBuilder: any, error: any) => {
      error && window.showErrorMessage(error);
      editBuilder.replace(range, str);
    });
  }
}
