/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-08-31 10:40:17 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-03 13:15:31
 */
import { commands, ExtensionContext } from 'vscode';

import ActiveText from './ActiveText';
import FormatWxml from './FormatWxml';
import saveFormat from './saveFormat';
import { config, getConfig, configActivate, configDeactivate } from './config';

export function activate(context: ExtensionContext) {
  const wxml = new FormatWxml();
  getConfig();
  saveFormat(wxml);
  const activeText = new ActiveText(config);
  configActivate(activeText, () => {
    saveFormat(wxml);
  });
  context.subscriptions.push(activeText);
  commands.registerCommand('extension.formatwxml', () => {
    wxml.init();
  });
}

export function deactivate() {
  configDeactivate();
}
