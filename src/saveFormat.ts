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
      return false;
    }
    oldDocument = { fileName };
    if (config.onSaveFormat) {
      wxml.init();
    }
  });
}
