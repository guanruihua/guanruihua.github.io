# 0fs

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/file-manage-system.svg?style=flat)](https://www.npmjs.com/package/file-manage-system)

- `node`的`fs(file system)`包的二级封装
- 拓展一些对文件的操作
- 舍弃对xlsx 文件的读取, 添加通过添加自定义规则来指定读取特殊文件

## read

- 读取文件目录中文件全部数据
- `param`  `path` `string` 路径
- `param`  `ignore` `?string|string[]`
