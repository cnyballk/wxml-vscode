# wxml-vscode

[wxml-vscode 仓库](https://github.com/cnyballk/wxml-vscode)

[提问题](https://github.com/cnyballk/wxml-vscode/issues)

## 安装

通过 F1 或者 CMD + Shift + P 输入 install. 选择: Install Extension.

## 特性

- 格式化功能
- 高亮组件功能

###  如何使用格式化功能

格式化 支持 通过 F1 或者 CMD + Shift + P 输入 format wxml 命令 或者右键菜单，也可以开启保存后自动格式化

###   目前可配置项

wxmlConfig.format 可配置的属性可以[这里看](https://github.com/beautify-web/js-beautify)

```json
// 高亮的颜色，emm暂时只支持这样写
"wxmlConfig.activeColor": {
    "color": "#e5c07b"
  },

  // 是否禁用高亮组件
  "wxmlConfig.activeDisable": false,
  // 是否开启保存自动格式化
  "wxmlConfig.onSaveFormat": false,

  "wxmlConfig.format": {
    "brace_style": "collapse",
    "end_with_newline": false,
    "indent_char": "",
    "indent_handlebars": false,
    "indent_inner_html": false,
    "indent_scripts": "keep",
    "indent_size": 2,
    "indent_with_tabs": true,
    "max_preserve_newlines": 1,
    "preserve_newlines": true,
    "wrap_attributes": "force-expand-multiline"
  },

  // 高亮所忽略的组件数组
  "wxmlConfig.tagNoActiveArr": [
    "view",
    "button",
    "text",
    "icon",
    "image",
    "navigator",
    "block",
    "input",
    "template",
    "form",
    "camera",
    "textarea"
  ]
```
