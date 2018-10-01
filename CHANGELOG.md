# Change Log

All notable changes to the "wxml-vscode" extension will be documented in this file.

## [0.0.1]

- 格式化功能
- 高亮组件功能

## [0.0.2]

- 增加保存自动格式化功能
- 增加右键菜单使用 fromat wxml 命令

## [0.0.3]

- 增加 wxmlConfig.format.wrap_attributes_count 配置属性
- 让格式化看起来更漂亮

## [0.0.4]

- 修复 wxmlConfig.onSaveFormat 修改配置 true => false 后依然自动格式化的问题
- 修复 wxmlConfig.format.wrap_attributes_count 因为 node 依赖无法生效的问题

## [0.0.5]

- 无子元素则闭合标签
- 修复一些已知的格式化问题

## [0.0.6]

- wxmlConfig.format 新增 disable_automatic_closing_labels 属性
  是用来禁用自动闭合标签的
