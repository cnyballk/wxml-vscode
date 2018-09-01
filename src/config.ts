/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-08-31 10:44:00
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-01 15:47:33
 */
import * as vscode from 'vscode';

let listener: vscode.Disposable;
export interface Config {
  activeColor: object;
  activeDisable: Boolean;
  tagNoActiveArr: string[];
}
export const config: Config = {
  activeColor: {},
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
}

export function configDeactivate() {
  listener.dispose();
}
