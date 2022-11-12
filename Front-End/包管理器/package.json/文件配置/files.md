# files

- 项目在进行 `npm` 发布时，可以通过 `files` 指定需要跟随一起发布的内容来控制 `npm` 包的大小，避免安装时间太长
- 发布时默认会包括 `package.json`，`license`，`README` 和`main` 字段里指定的文件。忽略 `node_modules`，`lockfile` 等文件
- 在此基础上，我们可以指定更多需要一起发布的内容。可以是单独的文件，整个文件夹，或者使用通配符匹配到的文件
- 一般情况下，`files` 里会指定构建出来的产物以及类型文件，而 `src`，`test` 等目录下的文件不需要跟随发布

```json
{
"files": [
  "filename.js",
  "directory/",
  "glob/*.{js,json}"
 ]
}
```
