/*
 * @Author: cnyballk[https://github.com/cnyballk] 
 * @Date: 2018-08-31 10:40:17 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-01 15:44:27
 */
import { commands, workspace, ExtensionContext } from 'vscode';

import ActiveText from './ActiveText';
import FormatWxml from './FormatWxml';
import { config, configActivate, configDeactivate } from './config';

export function activate(context: ExtensionContext) {
  const wxml = new FormatWxml();
  configActivate();

  autoConfig();
  context.subscriptions.push(new ActiveText(config));
  commands.registerCommand('extension.formatwxml', () => {
    wxml.init();
  });
}

export function deactivate() {
  configDeactivate();
}

function autoConfig() {
  let c = workspace.getConfiguration();
  const updates: Array<{ key: string; map: any }> = [
    {
      key: 'files.associations',
      map: {
        '*.cjson': 'jsonc',
        '*.wxss': 'css',
        '*.wxs': 'javascript',
      },
    },
    {
      key: 'emmet.includeLanguages',
      map: {
        wxml: 'html',
      },
    },
  ];

  updates.forEach(({ key, map }) => {
    let oldMap = c.get(key, {}) as any;
    let appendMap: any = {};
    Object.keys(map).forEach(k => {
      if (!oldMap.hasOwnProperty(k)) appendMap[k] = map[k];
    });
    if (Object.keys(appendMap).length) {
      c.update(key, { ...oldMap, ...appendMap }, true);
    }
  });

  c.update('minapp-vscode.disableAutoConfig', true, true);
}
