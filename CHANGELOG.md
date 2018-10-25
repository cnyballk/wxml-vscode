# Change Log

All notable changes to the "wxml-vscode" extension will be documented in this file.

## [0.1.2]

- fix: [#9](https://github.com/cnyballk/wxml-vscode/issues/9)
- fix: [#10](https://github.com/cnyballk/wxml-vscode/issues/10)
- fix: [#11](https://github.com/cnyballk/wxml-vscode/issues/11)

## [0.1.1]

- fix: [#8](https://github.com/cnyballk/wxml-vscode/issues/7)

## [0.1.0]

- wxmlConfig.activeColor 可设置每个组件的自定义颜色
  color 是不指定时的默认颜色
  自定为 [tagName]:color
- fix: [#7](https://github.com/cnyballk/wxml-vscode/issues/7)

## [0.0.6]

- wxmlConfig.format 新增 disable_automatic_closing_labels 属性
  是用来禁用自动闭合标签的

## [0.0.5]

- 无子元素则闭合标签
- 修复一些已知的格式化问题

## [0.0.4]

- 修复 wxmlConfig.onSaveFormat 修改配置 true => false 后依然自动格式化的问题
- 修复 wxmlConfig.format.wrap_attributes_count 因为 node 依赖无法生效的问题

## [0.0.3]

- 增加 wxmlConfig.format.wrap_attributes_count 配置属性
- 让格式化看起来更漂亮

## [0.0.2]

- 增加保存自动格式化功能
- 增加右键菜单使用 fromat wxml 命令

## [0.0.1]

- 格式化功能
- 高亮组件功能
