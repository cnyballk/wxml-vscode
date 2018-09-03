/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-08-31 10:44:00
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-03 13:07:07
 */
import {
  workspace,
  window,
  ConfigurationChangeEvent,
  Disposable,
} from 'vscode';

let listener: Disposable;
export interface Config {
  activeColor: object;
  activeDisable: Boolean;
  onSaveFormat: Boolean;
  cache: Boolean;
  tagNoActiveArr: string[];
}
export const config: Config = {
  activeColor: {},
  cache: false,
  onSaveFormat: false,
  activeDisable: false,
  tagNoActiveArr: [],
};

export function getConfig(e?: ConfigurationChangeEvent) {
  if (e && !e.affectsConfiguration('wxmlConfig')) return;
  const wxml = workspace.getConfiguration('wxmlConfig');
  config.activeColor = wxml.get('activeColor', {});
  config.activeDisable = wxml.get('activeDisable', false);
  config.tagNoActiveArr = wxml.get('tagNoActiveArr', []);
  config.onSaveFormat = wxml.get('onSaveFormat', false);
  config.cache = false;
}

export function configActivate(activeText: any, saveFormat: any) {
  listener = workspace.onDidChangeConfiguration(
    (e: ConfigurationChangeEvent) => {
      getConfig(e);
      saveFormat();
      let tid: NodeJS.Timer = null as any;
      if (tid) clearTimeout(tid);
      tid = setTimeout(() => {
        activeText.onChange(window.activeTextEditor, true);
      }, 500);
    }
  );
}
export function configDeactivate() {
  listener.dispose();
}
