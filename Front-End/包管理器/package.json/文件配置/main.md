# main

- 项目发布时，默认会包括 `package.json`，`license`，`README` 和`main` 字段里指定的文件，因为 main 字段里- 指定的是项目的入口文件，在 browser 和 Node 环境中都可以使用
- 如果不设置 main 字段，那么入口文件就是根目录下的 `index.js`

- 比如 packageA 的 main 字段指定为 `index.js`

```json
{
 "main": "./index.js"
}
```

> 引入 packageA 时，实际上引入的就是 node_modules/packageA/index.js。
这是早期只有 CommonJS 模块规范时，指定项目入口的唯一属性。
