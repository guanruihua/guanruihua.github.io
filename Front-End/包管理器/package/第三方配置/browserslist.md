# [`browserslist`]()

> - 设置项目的浏览器兼容情况
> - `babel` 和 `autoprefixer` 等工具会使用该配置对代码进行转换。当然你也可以使用 `.browserslistrc` 单文件配置

```json
{
 "browserslist": [
   "> 1%",
   "last 2 versions"
 ]
}
```

```json
{
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
