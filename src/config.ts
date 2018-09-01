/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-08-31 10:44:00
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-01 21:17:37
 */
import * as vscode from 'vscode';

let listener: vscode.Disposable;
export interface Config {
  activeColor: object;
  activeDisable: Boolean;
  onSaveFormat: Boolean;
  tagNoActiveArr: string[];
}
export const config: Config = {
  activeColor: {},
  onSaveFormat: true,
  activeDisable: false,
  tagNoActiveArr: [],
};

function getConfig() {}

export function configActivate() {
  listener = vscode.workspace.onDidChangeConfiguration(getConfig);
  const wxml = vscode.workspace.getConfiguration('wxmlConfig');
  config.activeColor = wxml.get('activeColor', {});
  config.activeDisable = wxml.get('activeDisable', false);
  config.tagNoActiveArr = wxml.get('tagNoActiveArr', []);
  config.onSaveFormat = wxml.get('onSaveFormat', true);
}
export function configDeactivate() {
  listener.dispose();
}
