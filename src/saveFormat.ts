import { workspace, TextDocumentWillSaveEvent } from 'vscode';
import { config } from './config';

export default function saveFormat(wxml: any) {
  let oldDocument = {
    fileName: '',
  };
  workspace.onWillSaveTextDocument((e: TextDocumentWillSaveEvent) => {
    const {
      document: { fileName, isDirty },
    } = e;
    if (!isDirty && oldDocument.fileName === fileName) {
      // console.log('取消格式化');
      return false;
    }
    // console.log('格式化');
    oldDocument = { fileName };
    if (config.onSaveFormat) {
      wxml.init();
    }
  });
}
