import { workspace } from 'vscode';
import { Config } from './config';

export const saveFormat = (config: Config, wxml: any) => {
  let oldDocument = {
    fileName: '',
  };
  config.onSaveFormat &&
    workspace.onWillSaveTextDocument((e: any) => {
      const {
        document: { fileName, isDirty },
      } = e;
      if (!isDirty && oldDocument.fileName === fileName) {
        return false;
      }
      oldDocument = { fileName };
      wxml.init();
    });
};
